<template>
	<div id="app">
  	<mt-header fixed title="学生信息管理系统"></mt-header>
  	<router-view></router-view>
	</div>
  
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    	
    }
  },
  created(){
    // this.$ajax({
    //   method:'post',
    //   url:'http://localhost:8080/StudentInfo/user/login.do',
    //   data:{
    //   	userName:"admin",
    //   	password:"123456"
    //   }
    // })
    // .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

}
</script>

<style lang="scss">

</style>
