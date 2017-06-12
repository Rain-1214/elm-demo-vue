<template>
	<div id="Student">
		<div class="student">
			<el-table
		    ref="multipleTable"
		    :data="tableData"
		    border
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    <el-table-column
		      label="姓名"
		      prop="name"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="age"
		      label="年龄"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="grade"
		      label="年级"
		      show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column
		      label="操作"
		      width="150"
		      fixed="right"
		      column-key="1">
		      <template scope="scope">
		      	<el-button 
		      		type="primary"
		      		size='small'
		      		@click="showAlertStudent(scope)">修改</el-button>
		      	<el-button 
		      		type="danger"
		      		size='small'
		      		@click="daleteStudent(scope)">删除</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		  <div style="margin-top: 20px">
		    <el-button type="success" @click="showAdd()">添加</el-button>
		    <el-button @click="toggleSelection(tableData)">反选</el-button>
		    <el-button @click="toggleSelection()">取消选择</el-button>
		    <el-button v-if="multipleSelection.length != 0" type="danger" @click="daleteStudent('all')">删除勾选的学生</el-button>
		  </div>	
		  <div v-show="formList.length != 0" style="margin-top: 20px">
				<transition-group
					name='list'
					tag="div"
					enter-active-class = 'animated fadeInRight'
					leave-active-class = 'animated fadeOutLeft'>
			  	<div v-for="(e,i) in formList" class="border" :key="e">
				  	<el-form  label-position="left" label-width="80px" :model="e">
						  <el-form-item label="姓名">
						    <el-input v-model="e.name"></el-input>
						  </el-form-item>
						  <el-form-item label="年龄">
						    <el-input v-model="e.age"></el-input>
						  </el-form-item>
						  <el-form-item label="年级">
						    <el-select v-model="e.grade" placeholder="请选择">
							    <el-option
							      v-for="item in gradeList"
							      :key="item.id"
							      :label="item.gradeName"
							      :value="item.gradeName">
							    </el-option>
							  </el-select>
						  </el-form-item>
						  <div>
						  	<el-button type="success" @click="addStudents(e,i)">仅添加此人</el-button>
						  	<el-button type="danger" @click="formList.splice(i,1)">删除此条</el-button>
						  </div>
						</el-form>	
			  	</div>
		  	</transition-group>

		  </div>

		  <div style="margin-top:20px" v-show="formList.length != 0">
		  	<el-button type="success" @click="addStudents('all')">添加所有学生</el-button>
				<el-button type="danger" @click="formList.splice(0,formList.length)">删除所有要添加的学生</el-button>
		  </div>

		  <el-dialog size="large" title="修改" :visible.sync="alertStudentState">
			  <el-form :model="alertStudent" ref="alertStudent">
			    <el-form-item 
			    	label="姓名" 
			    	label-width="80px" 
			    	prop="name"
			    	:rules="[
			    		{required:true,message:'姓名不能为空'}
			    	]">
			      <el-input v-model="alertStudent.name" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item 
			    	label="年龄" 
			    	label-width="80px" 
			    	prop="age"
			    	:rules="[
			    		{required:true,message:'年龄不能为空'},
			    		{type:'number',message:'年龄必须为数字'}
			    	]">
			      <el-input v-model.number="alertStudent.age" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="年级" label-width="80px">
				    <el-select v-model="alertStudent.grade" placeholder="请选择">
					    <el-option
					      v-for="item in gradeList"
					      :key="item.id"
					      :label="item.gradeName"
					      :value="item.id">
					    </el-option>
					  </el-select>
				  </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="alertStudentState = false">取 消</el-button>
			    <el-button type="primary" @click="alertStudentMethod()">确 定</el-button>
			  </div>
			</el-dialog>

		</div>
		
	</div>
</template>
<script>
	import { Indicator,Toast,MessageBox } from 'mint-ui';
	export default {
    data() {
      return {
      	alertStudentState:false,
        tableData: [],
        multipleSelection: [],
        gradeList:[],
        gradeData:{},
        alertStudentIndex:"",
        alertStudent:{
        	id:"",
        	name:"",
        	region:"",
        	grade:""
        },
        form:{
        	name:"",
        	region:"",
        	grade:""
        },
        formList:[]
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
      	console.log(this.multipleSelection)
        this.multipleSelection = val;
      },
      showAdd(){
      	let temp = Object.assign({},this.form);
      	this.formList.push(temp);
      },
      alertStudentMethod(){
				this.alertStudentState = false;
      	Indicator.open('Loading...');
      	const {id,name,age} = this.alertStudent;
      	const _this = this;
      	let grade = {};
      	this.gradeList.forEach((e) => {
      		if (e.gradeName == _this.alertStudent.grade) {
      			const {id,gradeName} = e; 
      			grade = {id,gradeName}
      		}
      	});
      	let data = {id,name,age,grade};
      	console.log(data)
      	this.$ajax
      			.post('/StudentInfo/student/updateStudent.do',data)
      			.then((response) => {
      				Indicator.close();
      				Toast({
							  message: '修改成功',
							  iconClass: 'el-icon-check'
							});
      				console.log("修改后返回的数据：");
      				console.log(response);
      				const {id,name,age,grade:{gradeName:grade}} = response.data.data;
      				const afterAlertStudent = {id,age,name,grade};
      				console.log("修改后返回的学生：");
      				console.log(afterAlertStudent);
      				Object.assign(_this.tableData[_this.alertStudentIndex],afterAlertStudent);
      			})
      			.catch((error) => {
      				Indicator.close();
      				console.log(error)
      			})
      },
      showAlertStudent(scope){
      	let temp = Object.assign({},scope.row);
      	this.alertStudentState = true;
      	this.alertStudent = temp;
      	this.alertStudentIndex = scope.$index;
      },
      daleteStudent(scope){
      	const _this = this;
      	if (scope != "all") {
	      	MessageBox.confirm('确定删除?').then(action => {
						let deleteStudents = [];
		      	const {id} = scope.row;
		      	deleteStudents.push(id);
		      	const data = {ids:deleteStudents};
		      	_this.$ajax
		      			.post("/StudentInfo/student/deleteStudent.do",data)
		      			.then((response) => {
		      				Toast({
									  message: '删除成功',
									  iconClass: 'el-icon-check'
									});
		      				_this.loadStudent();
		      			})
		      			.catch((error) => {
		      				console.log(error)
		      			})  
					});	
      	}else{
      		MessageBox.confirm('确定删除所有勾选?').then(action => {
						let deleteStudents = [];
						_this.multipleSelection.forEach((e) => {
							const {id} = e;
							deleteStudents.push(id);
						})
		      	const data = {ids:deleteStudents};
		      	_this.$ajax
		      			.post("/StudentInfo/student/deleteStudent.do",data)
		      			.then((response) => {
		      				Toast({
									  message: '删除成功',
									  iconClass: 'el-icon-check'
									});
		      				_this.loadStudent();
		      			})
		      			.catch((error) => {
		      				console.log(error)
		      			})  
					});	
      	}
      },
      addStudents(student,index){
      	console.log(student)
      	const _this = this;
      	let studentList = [];
      	let data ={};
      	if(student != "all"){
	      	let {name,age,grade:gradeName} = student;
	      	if(name == "" || age == "" || gradeName == ""){
	      		Toast("必须填写好完整信息才能添加");
	      		return false;
	      	}
	      	age = parseInt(age);
	      	if(age <= 0 || Object.is(age,NaN)){
	      		Toast("年龄必须为大于零的数字");
	      		return false;
	      	}	
	      	const gradeId= this.gradeData[gradeName];    	
      		let grade = {id:gradeId,gradeName};

      		let addStudent = {name,age,grade} 
      		studentList.push(addStudent);
      		data = {students:studentList};
      	}else{
      		for (var i = 0; i < this.formList.length; i++) {
      			let {name,age,grade:gradeName} = this.formList[i];
		      	if(name == "" || age == "" || gradeName == ""){
		      		Toast("必须填写好完整信息才能添加");
		      		return;
		      	}
		      	age = parseInt(age);
		      	if(age <= 0 || Object.is(age,NaN)){
		      		Toast("年龄必须为大于零的数字");
		      		return;
		      	}	
		      	this.formList[i].age = parseInt(age);
		      	let gradeId = _this.gradeData[gradeName];
		      	let grade = {id:gradeId,gradeName};
		      	this.formList[i].grade = grade;
      		}

      		if(flag){
      			data = {students:this.formList};
      		}else{
      			return false;
      		}
      	}
      	console.log(data)
      	this.$ajax
      			.post('/StudentInfo/student/addStudents.do',data)
      			.then((response) => {
      				console.log(response)
      				Toast({
							  message: '添加成功',
							  iconClass: 'el-icon-check'
							});
							if(student != "all"){
								_this.formList.splice(index,1)
								_this.loadStudent();	
							}else{
								_this.formList.splice(0,_this.formList.length);
								_this.loadStudent();	
							}
							
      			})
      			.catch((error) => {
      				console.log(error)
      			})

      },
      loadStudent(){
    		const _this = this;
      	this.$ajax
    			.post("/StudentInfo/student/findStudent.do")
					.then((response) => {
						let StudentList = [];
						response.data.data.forEach((e) => {
							const {id,name,age,grade:{gradeName:grade}} = e;
							let student = {id,name,age,grade};
							StudentList.push(student);
						})
						_this.tableData = StudentList;
					})
					.catch((error) => {
						console.log(error)
					})
      }
    },
    created(){
    	const _this = this;
    	this.$ajax
    			.post("/StudentInfo/grade/findGrade.do")
					.then((response) => {
						_this.gradeList = response.data.data;
						_this.gradeList.forEach((e) => {
							_this.gradeData[e.gradeName] = e.id;
						})
					})
					.catch((error) => {
						console.log(error)
					});
			this.loadStudent();		
    }
  }
</script>	
<style lang='scss'>
	.move{
		position: absolute;
	}
</style>