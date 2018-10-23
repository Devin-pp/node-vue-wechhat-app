import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
// import Login from './views/Login'
// import Register from './views/Register'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children:[
          {
            path:'',
            redirect:'/chats'
          },
          {
            path:'/chats',
            name:'chats',
            component: () => import('./views/Chats.vue')
          },
          {
            path:'/contacts',
            name:'contacts',
            component: () => import('./views/Contacts.vue')
          },
          {
            path:'/discover',
            name:'discover',
            component: () => import('./views/Discover.vue')
          },
          {
           path:'/me',
           name:'me',
           component: () => import('./views/Me.vue')
          },
        ]
    },
      {
        path: '/login',
        name: 'login',
        component: () => import('./views/Login.vue')//懒加载
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('./views/Register.vue')
    },
      {
        path:'/moments',
        name:'moments',
        component:() => import('./views/Moments.vue')
      },
      {
        path:'/publish',
        name:'publish',
        component:() => import('./views/Publish.vue')
      }
  ]
})

// 路由守卫
router.beforeEach((to,from,next) => {
    const isLogin = localStorage.wxToken ? true : false
    if(to.path == "/login" || to.path == '/register'){
        next()
    }else{
        isLogin ? next() : next('/login')
    }
})
export default  router