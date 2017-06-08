import Vue from 'vue'

import { Button, Select, Form, FormItem, Input } from 'element-ui'
import App from './App.vue'
// Vue.component(Button.name, Button)
// Vue.component(Select.name, Select)
// Vue.component(Form.name, Form)
// Vue.component(FormItem.name, FormItem)
// Vue.component(Button.Input, Input)

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

import { Table,tableColumn,Option,Dialog,Icon } from 'element-ui'

Vue.use(Table);
Vue.use(tableColumn)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Icon)