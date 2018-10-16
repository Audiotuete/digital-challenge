
<template>
  <div>
    <Whitespace/>
    <Heading :level="1" v-show='!inputIsFocused'>
      Deine Kontaktdaten für die Challenge
    </Heading>
    <Paragraph v-show='!inputIsFocused'>Deine Daten werden nicht an Dritte weitergegeben und nach der Challenge automatisch gelöscht!</Paragraph>
    <form class='register-user-form'  @submit.prevent='validateBeforeRegsiter()'>

      <FormLabel>Nutzername</FormLabel>
      <input
      :class="{'register-user-input': true, 'form-error-field': errors.has('Nutzername') || errors.has('Nutzername vergeben') }"
      v-model='username'
      v-validate='{ required: true, alpha_dash: true, min: 3 }'
      data-vv-delay="800"
      @focus='inputIsFocused = true'
      @keyup='errors.remove("Nutzername vergeben")'
      type='text' 
      name='Nutzername' 
      maxlength='15' 
      placeholder='Peter'/>
      <span class="form-error-text" v-show="errors.has('Nutzername')">{{ errors.first('Nutzername') }}</span>
      <span class="form-error-text" v-show="errors.has('Nutzername vergeben')">{{ errors.first('Nutzername vergeben') }}</span>


      <FormLabel>Mail-Adresse</FormLabel>
      <input
        :class="{'register-user-input': true, 'form-error-field': errors.has('Mail-Adresse') }"
        v-model='email' 
        v-validate='{ required: true, email: true }'
        data-vv-delay="1200"
        @focus='inputIsFocused = true' 
        type='email'
        name='Mail-Adresse' 
        placeholder='peter.pan@gmail.de'
      />
      <span class="form-error-text" v-show="errors.has('Mail-Adresse')">{{ errors.first('Mail-Adresse') }}</span>

      <FormLabel style='margin-top: 1rem'>Passwort</FormLabel>
      <input 
        :class="{'register-user-input': true, 'form-error-field': errors.has('Passwort') }"
        v-model='password' 
        v-validate='{ required: true, min: 8 }'
        data-vv-delay="1200"
        @focus='inputIsFocused = true' 
        type='password' 
        name='Passwort' 
        ref="Passwort"
      />
      <span class="form-error-text" v-show="errors.has('Passwort')">{{ errors.first('Passwort') }}</span>

      <FormLabel>Passwort wiederholen</FormLabel>
      <input 
        :class="{'register-user-input': true, 'form-error-field': errors.has('Passwort wiederholen') }"
        v-validate="'required|confirmed:Passwort'"
        data-vv-as='Passwort wiederholen'
        data-vv-delay="1200"
        v-model='passwordRepeat'
        @focus='inputIsFocused = true' 
        type='password'
        name='Passwort wiederholen' 
      />
      <span class="form-error-text" v-show="errors.has('Passwort wiederholen')">{{ errors.first('Passwort wiederholen') }}</span>

      <button type='submit' class='register-user-button-send'>Account erstellen</button>
    </form>
    <div class='register-user-show-button' v-show='inputIsFocused' @click='inputIsFocused = false'><i  class='sl-icon icon-arrow-up register-user-show-question-icon'></i></div>

  </div>
</template>

<script>
import Heading from '../components/atoms/Heading'
import Paragraph from '../components/atoms/Paragraph'
import FormLabel from '../components/atoms/FormLabel'
import Whitespace from '../components/layout/Whitespace'

// GraphQL
import CREATE_USER from '../graphql/users/createUser.gql'
import GET_TOKEN from '../graphql/auth/getToken.gql'

export default {
  name: 'register-user-screen',
  components: {
    Heading,
    Paragraph,
    FormLabel,  
    Whitespace
  },
  data () {
    return {
      inputIsFocused: false,
      // username: '',
      // email: '',
      // password: '',
      // passwordRepeat: ''
    }
  },
  methods: {
    validateBeforeRegsiter() {
      this.$validator.validateAll().then((result) => {
        if(!result) {
          return false
        } else {
          this.register()
        }
      })
    },
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
        if(error.message == 'GraphQL error: Username already exists!') {
          this.errors.remove('Nutzername vergeben')
          this.errors.add({
            field: 'Nutzername vergeben',
            msg: 'Nutzername leider schon vergeben'
          })
        }
        // We restore the initial user input
        this.username = theUsername
        this.email = theEmail
        this.password = thePassword
        this.passwordRepeat = thePasswordRepeat

        if (!challengeCode) {
          //  Alert for no challenge Code association
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
        // console.error(error)
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
  }
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
