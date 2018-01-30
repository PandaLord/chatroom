import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/register'
import Home from "@/components/home"
import Emoji from "@/components/emoji"
import rankingList from "@/components/rankingList"
import Daily from "@/components/daily"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
     path: '/home/:id/',
     name: 'Home',
     component: Home,
     children: [
       {
         path:'/home/:id/rank',
         component:rankingList,
       },
       {
         path:'/home/:id/daily',
         component:Daily,
       }
     ]
    },
  ]
})
