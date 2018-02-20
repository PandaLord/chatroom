import Vue from 'vue'
import Router from 'vue-router'


const Register = r => require.ensure([], () => r(require('../components/register')), 'Register')
const Home = r => require.ensure([], () => r(require('../components/home')), 'Home')
const Emoji = r => require.ensure([], () => r(require('../components/emoji')), 'Emoji')
const rankingList = r => require.ensure([], () => r(require('../components/rankingList')), 'rankingList')
const Daily = r => require.ensure([], () => r(require('../components/daily')), 'Daily')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Register
    },
    {
     path: '/home',
     component: Home,
     children: [
       {
         path:'/home/rank',
         component:rankingList,
       },
       {
         path:'/home/daily',
         component:Daily,
       }
     ]
    },
  ]
})
