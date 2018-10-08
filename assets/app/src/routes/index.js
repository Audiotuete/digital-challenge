import Vue from 'vue'
import VueRouter from 'vue-router'

import { apolloProvider } from '../main'


import SwiperScreen from '../screens/SwiperScreen'

import TheHeader from '../components/header/TheHeader'
import TheFooter from '../components/footer/TheFooter'

import CURRENT_USER from '../graphql/users/currentUser.gql'


Vue.use(VueRouter)

export const router = new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/', 
      components: { default: SwiperScreen, header: TheHeader}, 
    },
  
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
