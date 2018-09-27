
<template>
  <div>
    <Whitespace/>
    <Heading :level="1">Anmelden</Heading>
    <form id='login-form' class='login-form'  @submit.prevent='login()'>
      <FormLabel>Nutzername</FormLabel>
      <input name='username' v-model='username' @focus='inputIsFocused = true' type='text' class='login-input' placeholder='Peter Pan'/>
      
      <FormLabel>Passwort</FormLabel>      
      <input name='password' v-model='password' @focus='inputIsFocused = true' type='password' class='login-input'/>
     
      <button type='submit' form='login-form' class='login-button-send'>Anmelden</button>
    </form>
          <!-- <div class='login-show-button' v-show='inputIsFocused' @click='inputIsFocused = false'><i  class='sl-icon icon-arrow-up login-show-question-icon'></i></div> -->
  </div>
</template>

<script>
import Heading from '../components/atoms/Heading'
import FormLabel from '../components/atoms/FormLabel'
import Whitespace from '../components/layout/Whitespace'

// GraphQL
import GET_TOKEN from '../graphql/auth/getToken.gql'
import CURRENT_USER from '../graphql/users/currentUser.gql'

export default {
  name: 'login-screen',
  components: {
    Heading,
    FormLabel,
    Whitespace
  },
  data () {
    return {
      inputIsFocused: false,
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      const theUsername = this.username
      const thePassword = this.password

      this.username = ''
      this.password = ''
      
      this.$apollo.mutate({
        mutation: GET_TOKEN,
        variables: {
          username: theUsername,
          password: thePassword
        }
      }).then((data) => {
        // Result
        const token = data.data.tokenAuth.token
        localStorage.setItem('/<Sj4z9X(Bf,{W', token)
        
        if (localStorage.getItem('/<Sj4z9X(Bf,{W')) {
          this.$router.push('/taskfeed')
        }
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.username = theUsername
        this.password = thePassword
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$apollo.query({
      query: CURRENT_USER,
      // fetchPolicy: 'network-only'
    }).then((data) => {
      if(data.data.currentUser.currentProject) {
        vm.$router.push('/taskfeed')
      }
    }).catch((error) => {
      console.log(error)
    })
    })   
  }
}
</script>

<style scoped lang='scss'>

  .login-show-button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 7vh;
    right: 3vw;
    height: 10vw;
    width: 10vw;
    background: #fff;
    color: $colorPrimary;
    border-radius: 50%;
    border: 1px solid $colorPrimary;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
  }

  .login-form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vw;
  }

  .login-input {
    pointer-events: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 2.5rem;
    margin-top: 0.1rem;
    font-size: 0.9rem;
    font-weight: 300;
    padding-left: 0.75rem;
    font-family: 'Open Sans';
    box-sizing: border-box;
    background: #FEFEFE;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.25);
    border-radius: 0.75vw;

    &::placeholder {
      color: #DDDDDD;
    }
  }

  .login-button-send {
    background: $colorPrimary;
    border: none;
    outline: none;
    width: 60vw;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 1rem;
    border-radius: 1vh;
    margin-top: 1rem;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.25);
  }

</style>
