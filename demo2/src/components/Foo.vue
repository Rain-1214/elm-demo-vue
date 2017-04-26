<template>
	<div id="Foo">
		<h1>Foo</h1>
		<p>{{ count }}</p>
		<button @click = 'incrementAsync'>add</button>
	</div>
</template>
<script type="text/javascript">
	import {mapState,mapMutations,mapActions} from 'vuex'
	export default{
		data(){
			return {

			}
		},
		computed:{
			...mapState({
				count : state => state.count
			})
		},
		methods:{
			...mapActions(['incrementAsync'])
		}
	}
</script>