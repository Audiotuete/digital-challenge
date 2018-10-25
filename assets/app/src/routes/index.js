import Vue from 'vue'
import VueRouter from 'vue-router'

import RegisterUserScreen from '../screens/RegisterUserScreen'
import EnterChallengeScreen from '../screens/EnterChallengeScreen'
import ChallengeInfoScreen from '../screens/ChallengeInfoScreen'

import LoginScreen from '../screens/LoginScreen'
import RegisterProjectScreen from '../screens/RegisterProjectScreen'
import TaskFeedScreen from '../screens/TaskFeedScreen'
import TaskScreen from '../screens/TaskScreen'


// import TheNavbar from '../components/layout/navbar/TheNavbar'
// import TheFooter from '../components/layout/footer/TheFooter'


// const RegisterUserScreen = () => import('../screens/RegisterUserScreen')
// const EnterChallengeScreen = () => import('../screens/EnterChallengeScreen')
// const LoginScreen = () => import('../screens/LoginScreen')
// const RegisterProjectScreen = () => import('../screens/RegisterProjectScreen')

// const TaskFeedScreen = () => import(/* webpackChunkName: "tasks-group" */ '../screens/TaskFeedScreen')
// const TaskScreen = () => import(/* webpackChunkName: "tasks-group" */ '../screens/TaskScreen')

// const ChallengeInfoScreen = () => import( '../screens/ChallengeInfoScreen')

// const TheNavbar = () => import('../components/navbar/TheNavbar')
// const TheFooter = () => import('../components/footer/TheFooter')

// GraphQL imports for router guards
import { apolloProvider } from '../main'
import CURRENT_USER from '../graphql/users/currentUser.gql'

Vue.use(VueRouter)

export const router = new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/', 
      components: { default: TaskFeedScreen}, 
      meta: { requiresAuth: true, requiresProject: true }},

    { path: '/task/:id', 
      name: 'task', 
      components: { default: TaskScreen },
      props: true,
      meta: { requiresAuth: true, requiresProject: true }},

    { path: '/challengeinfo', 
      components: { default: ChallengeInfoScreen}, 
      meta: { requiresAuth: true, requiresProject: true }},

      { path: '/registerproject', 
      components: { default: RegisterProjectScreen}, 
      meta: { requiresAuth: true }},

      { path: '/enterchallenge', components: { default: EnterChallengeScreen} },
      { path: '/login', components: { default: LoginScreen}}, 
      { path: '/registeruser', components: { default: RegisterUserScreen }},
  
    // { path: '/projectsettings', components: {default: ProjectSettingsScreen, footer: TheFooter}}, 
    // { path: '/usersettings', components: {default: UserSettingsScreen, footer: TheFooter}}, 
  ]
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth && record.meta.requiresProject)) {
    getUser().then((data) => {
      if(!data.currentProject) {
        next('/registerproject')
      } else {
        next()
      }
    })
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!localStorage.getItem('/<Sj4z9X(Bf,{W')) {
      next('/enterchallenge')
    } else {
      next()
    }    
  } else {
    next()
  }
})
  
async function getUser() {
  let user = await apolloProvider.defaultClient.query({
    query: CURRENT_USER,
    fetchPolicy: 'network-only'
  }).then((data) => {
      return data.data.currentUser
  }).catch((error) => {
      return false
  })
  return user
}
