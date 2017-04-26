export default{
	state:{
		count:0,
		userList:[
			{id:1,text:'aabb',done:true},
			{id:2,text:'aabb2',done:true},
			{id:3,text:'ccdd',done:false}
		]
	},
	mutations:{
		increment: state => state.count ++,
		incrementTwo: state => state.count +=2,
	},
	actions:{
		incrementAsync(context){
			setTimeout(() => {
				context.state.count += 5
			},1000)
		}
	},
	getters:{
		userHasDone:State => {
			return State.userList.filter(e => e.done);
		}
	}	
}