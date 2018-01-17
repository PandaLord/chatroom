import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/register'
import Home from "@/components/home"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
     path: '/home/:id',
     name: 'Home',
     component: Home
    }
  ]
})
