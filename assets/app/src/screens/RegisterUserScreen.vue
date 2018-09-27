
<template>
  <div>
    <Whitespace/>
    <Heading :level="1" v-show='!inputIsFocused'>
      Deine Kontaktdaten für die Challenge
    </Heading>
    <Paragraph v-show='!inputIsFocused'>Deine Daten werden nicht an Dritte weitergegeben und nach der Challenge automatisch gelöscht!</Paragraph>
    <form class='register-user-form'  @submit.prevent='register()'>
      <label class='register-user-label' for='username'>Nutzername</label>
      <input name='username' v-model='username' @focus='inputIsFocused = true' type='text' class='register-user-input' maxlength='15' placeholder='Peter Pan'/>
      
      <label class='register-user-label' for='email'>Mail-Adresse</label>
      <input name='email' v-model='email' @focus='inputIsFocused = true' type='email' class='register-user-input' placeholder='peter.pan@gmail.de'/>
      
      <label class='register-user-label' style='margin-top: 1rem' for='password'>Passwort</label>
      <input name='password' v-model='password' @focus='inputIsFocused = true' type='password' class='register-user-input' minlength='8'/>
      
      <label class='register-user-label' for='password-repeat'>Passwort wiederholen</label>
      <input name='password-repeat' v-model='passwordRepeat' @focus='inputIsFocused = true' type='password' class='register-user-input' minlength='8'/>

      <button type='submit' class='register-user-button-send'>Account erstellen</button>
    </form>
          <div class='register-user-show-button' v-show='inputIsFocused' @click='inputIsFocused = false'><i  class='sl-icon icon-arrow-up register-user-show-question-icon'></i></div>

  </div>
</template>

<script>
import Heading from '../components/atoms/Heading'
import Paragraph from '../components/atoms/Paragraph'
import Whitespace from '../components/layout/Whitespace'

// GraphQL
import CREATE_USER from '../graphql/users/createUser.gql'
import GET_TOKEN from '../graphql/auth/getToken.gql'
import CURRENT_USER from '../graphql/users/currentUser.gql'


export default {
  name: 'register-user-screen',
  components: {
    Heading,
    Paragraph,    
    Whitespace
  },
  data () {
    return {
      inputIsFocused: false,
      username: '',
      email: '',
      password: '',
      passwordRepeat: ''
    }
  },
  methods: {
    register() {
      const theUsername = this.username
      const theEmail = this.email
      const thePassword = this.password
      const thePasswordRepeat = this.passwordRepeat

      this.username = ''
      this.email = ''
      this.password = ''
      this.passwordRepeat = ''

      const challengeCode = localStorage.getItem('63[CU^j>3=_UJuG')
      
      this.$apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          challengeCode: challengeCode,
          username: theUsername,
          email: theEmail,
          password: thePassword,
        }
      }).then((data) => {
        
        this.username = theUsername
        this.password = thePassword

        this.login()

      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.username = theUsername
        this.email = theEmail

        if (!challengeCode) {
          this.$router.push('/')
        }
      })
    },
    login() {
      const theUsername = this.username
      const thePassword = this.password
      
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
          this.$router.push('/registerproject')
        }
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
      })
    },
    // maxInput() {
    //   var max = 7; // The maxlength you want
    //   console.log(this.inputValue)
    //   if(this.inputValue.length > max) {
    //     this.inputValue = this.inputValue.substring(0, max);
    //   }
    // }
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$apollo.query({
  //     query: CURRENT_USER,
  //     // fetchPolicy: 'network-only'
  //   }).then((data) => {
  //     if(data.data.currentUser.currentProject) {
  //       vm.$router.push('/taskfeed')
  //     } else if (!localStorage.getItem('63[CU^j>3=_UJuG')) {
  //       vm.$router.push('/')
  //     }
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  //   })   
  // },

}
</script>

<style scoped lang='scss'>

  .register-user-show-button {
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

  .register-user-form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vw;
  }

  .register-user-label {
    align-self: flex-start;
    font-size: 0.6rem;
    margin-top: 0.4rem
  }

  .register-user-input {
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

  .register-user-button-send {
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
