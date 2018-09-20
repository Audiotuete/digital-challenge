
<template>
  <div
    id="app"
    @click='enterFullscreen()'
  >
    <!-- <router-view name='navbar'></router-view> -->
    <router-view></router-view>
    <router-view name='footer'></router-view>
    <!-- <div v-for='user in allUsers' :key=user.id>
      {{user.username}}
    </div> -->
  </div>
</template>

<script>
import screenfull from 'screenfull'

import ALL_USERS from './graphql/users/allUsers.gql'

export default {

  name: 'app',
  components: {},
  data () {
    return {
      users: []
    }
  },
  apollo: {
    allUsers: {
      query: ALL_USERS
    } 
  },
  methods: {
    enterFullscreen () {
      // if (screenfull.enabled && screenfull.isFullscreen == false ) {
      //   screenfull.request()
      // }
    }
  }

}

</script>

<style lang="scss">

body {
  background-color: #ffffff;
  margin: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  font-family: 'Open Sans';
  font-size: 2rem;

  a {
  color: transparent;
  cursor: default;
  text-decoration: none;
  } 

  button {
    background: transparent;
    border: none;
    outline: none;
  }

  input, textarea {
    outline: none;
    border: none;
    resize: none;
  }
}

iframe {
  position: absolute;
  pointer-events:none;
  width: calc(95% * 1);
  height: calc(97% * 1);
  .ytp-button {
    display: none;
  }
}
</style>
