
<template>
  <div>
    <BaseWhitespace/>
    <BaseHeading :level="1">Anmelden</BaseHeading>
    <form id='login-form' class='login-form'  @submit.prevent='login()'>
      <BaseInput
      :label="'Nutzername'"
      v-model='username' 
      @focus='inputIsFocused = true' 
      type='text' 
      placeholder='Peter Pan'/>
      
      <BaseInput
      :label="'Password'"
      v-model='password' 
      @focus='inputIsFocused = true' 
      type='password'/>
     
      <BaseButton type='submit' form='login-form'>Anmelden</BaseButton>
    </form>
          <!-- <div class='login-show-button' v-show='inputIsFocused' @click='inputIsFocused = false'><i  class='sl-icon icon-arrow-up login-show-question-icon'></i></div> -->
  </div>
</template>

<script>

// GraphQL
import GET_TOKEN from '../graphql/auth/getToken.gql'

export default {
  name: 'login-screen',
  components: {

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
          this.$router.push('/')
        }
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.username = theUsername
        this.password = thePassword
      })
    }
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

</style>
