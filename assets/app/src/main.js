import Vue from 'vue'
import VueRouter from 'vue-router'
import VueYoutube from 'vue-youtube'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { withClientState } from 'apollo-link-state';

import VueApollo from 'vue-apollo'

import App from './App.vue'

import { routes } from './routes'


// Setup the apollo state management
const app_cache = new InMemoryCache()

// const stateLink = withClientState({
//   app_cache,
//   resolvers: {
//   },
//   defaults: {
//     Challenge: {
//       __typename: 'Challenge',
//       id: 0,
//     },
//     Project: {
//       __typename: 'Project',
//       id: 0,
//     }
//   }
// })

// Send JWT from local storage with every request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('/<Sj4z9X(Bf,{W')
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    }
  }
})

// Create the apollo client 
const apolloClient = new ApolloClient({
  cache: app_cache, 
  link: ApolloLink.from([
    authLink,
    new HttpLink({uri: 'http://localhost:8000/graphql'})]
  ),
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
  // mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})








