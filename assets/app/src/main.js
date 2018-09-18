import Vue from 'vue'
import VueRouter from 'vue-router'
import VueYoutube from 'vue-youtube'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

import App from './App.vue'

import { routes } from './routes'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  // uri: 'https://fakerql.com/graphql'
  uri: 'http://localhost:8000/graphql'
// 
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

// Install the vue plugin
Vue.use(VueApollo)
Vue.use(VueRouter)
Vue.use(VueYoutube)

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  apolloProvider,
  // store,
  template: '<App/>',
  components: { App }
})








