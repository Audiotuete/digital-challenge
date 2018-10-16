
<template>
  <div
    id='app'
    @click='enterFullscreen()'
  >
    <!-- <router-view name='navbar'></router-view> -->
    <router-view class='main-container'></router-view>
    <!-- <router-view name='footer'></router-view> -->
    <!-- <div v-for='user in allUsers' :key=user.id>
      {{user.username}}
    </div> -->
  </div>
</template>

<script>
import { dictionary } from './validation.conf.js'
// import screenfull from 'screenfull'
// import ALL_USERS from './graphql/users/allUsers.gql'

export default {

  name: 'app',
  components: {},
  data () {
    return {
      allUsers: []
    }
  },
  // apollo: {
  //   allUsers: {
  //     query: ALL_USERS,
  //   }
  // },
  methods: {
    enterFullscreen () {
      // if (screenfull.enabled && screenfull.isFullscreen == false ) {
      //   screenfull.request()
      // }
    }
  },
  created() {
    this.$validator.localize('de', dictionary.de) 
  }
}

</script>

<style lang='scss'>

.main-container{
  font-size: 1rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  box-sizing: border-box;
  padding: 0 3vw  5vh 3vw;
}

.form-error-text {
  font-size: 0.7rem;
  color: #E94F35;
  text-align: center;
}

.form-error-field {
  border: 1px solid #E94F35;
}

body {
  background-color: #ffffff;
  margin: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  font-family: 'Open Sans';
  font-size: 2rem;

  a {
  color: #323232;
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
