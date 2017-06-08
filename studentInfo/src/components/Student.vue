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
		  </div>	
		  <div v-if="formList.length != 0" style="margin-top: 20px">

		  	<div v-for="(e,i) in formList" class="border">
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
						      :value="item.id">
						    </el-option>
						  </el-select>
					  </el-form-item>
					  <div>
					  	<el-button type="danger" @click="formList.splice(i,1)">删除此条</el-button>
					  	<el-button type="success" @click="addStudents(e,i)">仅添加此人</el-button>
					  </div>
					</el-form>	
		  	</div>

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
	import { Indicator,Toast } from 'mint-ui';
	export default {
    data() {
      return {
      	alertStudentState:false,
        tableData: [],
        multipleSelection: [],
        gradeList:[],
        gradeListBack:[],
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
      	this.gradeListBack.forEach((e) => {
      		if (e.gradeName == _this.alertStudent.grade) {
      			const {id,gradeName} = e; 
      			grade = {id,gradeName}
      		}
      	});
      	let data = {id,name,age,grade};
      	console.log(data)
      	this.$ajax
      			.post('http://localhost:8080/StudentInfo/student/updateStudent.do',data)
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
      	let deleteStudents = [];
      	const {id} = scope.row;
      	deleteStudents.push(id);
      	const data = {ids:deleteStudents};
      	this.$ajax
      			.post("http://localhost:8080/StudentInfo/student/deleteStudent.do",data)
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
      },
      addStudents(student,index){
      	console.log(student)
      	const _this = this;
      	let {name,age,grade:gradeId} = student;
      	if(name == "" || age == "" || gradeId == ""){
      		Toast("必须填写好完整信息才能添加");
      		return false;
      	}
      	age = parseInt(age);
      	if(age <= 0 || Object.is(age,NaN)){
      		Toast("年龄必须为大于零的数字");
      		return false;
      	}

      	let studentList = [];
      	let grade = {};
      	this.gradeListBack.forEach((e) => {
      		if (e.id == gradeId) {
      			const {id,gradeName} = e; 
      			grade = {id,gradeName}
      		}
      	});
      	let addStudent = {name,age,grade} 
      	studentList.push(addStudent);
      	const data = {students:studentList};
      	this.$ajax
      			.post('http://localhost:8080/StudentInfo/student/addStudents.do',data)
      			.then((response) => {
      				console.log(response)
      				Toast({
							  message: '添加成功',
							  iconClass: 'el-icon-check'
							});
							_this.loadStudent();
      			})
      			.catch((error) => {
      				console.log(error)
      			})

      },
      loadStudent(){
    		const _this = this;
      	this.$ajax
    			.post("http://localhost:8080/StudentInfo/student/findStudent.do")
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
    	// this.formList.push(this.form);

    	this.$ajax
    			.post("http://localhost:8080/StudentInfo/grade/findGrade.do")
					.then((response) => {
						_this.gradeListBack = response.data.data;
						let gradeList = [];
						response.data.data.forEach((e) => {
							console.log(e)
							const {id,gradeName} = e;
							let grade = {id,gradeName};
							gradeList.push(grade);
						})
						_this.gradeList = gradeList;
						_this.gradeListBack = gradeList;

					})
					.catch((error) => {
						console.log(error)
					});
			this.loadStudent();		
    }
  }
</script>	