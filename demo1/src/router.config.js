import One from './components/one.vue'
import Animate from './components/transform-animate.vue'
import Velocity from './components/velocity.vue'
import Transform from './components/transformstyle.vue'
import List from './components/List.vue'
import ListTwo from './components/listTwo.vue'
import listInput from './components/listInput.vue'


export default{
	routes:[
		{path:'/one/:id',component:One,
			children:[
				{path:'detail',component:List},
				{path:'job',component:ListTwo,meta: { requiresAuth: true }}
			]	

		},
		{path:'/animate',component:Animate},
		{path:'/velocity/:id',redirect:to => {
			return "/one/:id"
		}}

		// router with regexp
		//    { path: '/' },
		//    // params are denoted with a colon ":"
		//    { path: '/params/:foo/:bar' },
		//    // a param can be made optional by adding "?"
		//    { path: '/optional-params/:foo?' },
		//    // a param can be followed by a regex pattern in parens
		//    // this route will only be matched if :id is all numbers
		//    { path: '/params-with-regex/:id(\\d+)' },
		//    // asterisk can match anything
		//    { path: '/asterisk/*' },
		//    // make part of th path optional by wrapping with parens and add "?"
		//    { path: '/optional-group/(foo/)?bar' }
	]
}