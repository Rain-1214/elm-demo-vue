<template>
	<div id="home">
		<h1>home</h1>
		<p>{{ count }}</p>
		<p>{{ a }} , {{ b }}</p>
		<p> {{ userHasDone }} </p>
		<p v-for = '(v,i) in userHasDone'>
			{{v.text}}
		</p>
		<button @click = "change">add</button>
		<button @click = "changeDoubel">addDoubel</button>
	</div>
</template>
<script type="text/javascript">
	import {mapState,mapGetters,mapMutations} from 'vuex'

	export default{
		name:'home',
		data(){
			return {
				a:1
			}
		},
		computed:{
			b(){
				return this.a + 1 
			},
			...mapState({
				count:State => State.count
			}),
			...mapGetters([
				'userHasDone'
			])
		},
		methods:{
			...mapMutations({
				change:'increment',
				changeDoubel:'incrementTwo'
			})
		}
	}
</script>