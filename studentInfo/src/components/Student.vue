<template>
	<div id="Student">
		<div class="student">
			<el-table
		    ref="multipleTable"
		    :data="tableData3"
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
		  </el-table>
		  <div style="margin-top: 20px">
		    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
		    <el-button @click="toggleSelection()">取消选择</el-button>
		  </div>	
		</div>
		
	</div>
</template>
<script>
	export default {
    data() {
      return {
        tableData3: [],
        multipleSelection: []
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
      }
    },
    created(){
    	const _this = this;
    	this.$ajax.post("http://localhost:8080/StudentInfo/student/findStudent.do",{id:1})
    						.then((responsive) => {
    							console.log(responsive)
    							let StudentList = [];
    							responsive.data.data.forEach((e) => {
    								let student = {};
    								student.name = e.name;
    								student.age = e.age;
    								student.grade = e.grade.gradeName;
    								StudentList.push(student);
    							})
    							_this.tableData3 = StudentList;
    						})
    						.catch((error) => {
    							console.log(error)
    						})
    }
  }
</script>	