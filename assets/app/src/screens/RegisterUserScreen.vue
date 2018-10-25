
<template>
  <div>
    <BaseWhitespace/>
    <BaseHeading :level="1" v-show='!inputIsFocused'>
      Deine Kontaktdaten für die Challenge
    </BaseHeading>
    <BaseParagraph v-show='!inputIsFocused'>Deine Daten werden nicht an Dritte weitergegeben und nach der Challenge automatisch gelöscht!</BaseParagraph>
    
    <form class='register-user-form'  @submit.prevent='validateBeforeRegsiter()'>
      <BaseInput
        :label = "'Accountname'"
        :validation="{'hasError': errors.has('Accountname') || errors.has('Accountname vergeben') }"
        v-model='username'
        v-validate='{ required: true, alpha_dash: true, min: 3 }'
        data-vv-delay="800"
        @focus='inputIsFocused = true'
        @keyup='errors.remove("Accountname vergeben")'
        type='text' 
        name='Accountname' 
        maxlength='15' 
        placeholder='Peter'/>
      <BaseInputError v-show="errors.has('Accountname')">{{ errors.first('Accountname') }}</BaseInputError>
      <BaseInputError v-show="errors.has('Accountname vergeben')">{{ errors.first('Accountname vergeben') }}</BaseInputError>

      <BaseInput
        :label = "'Mail-Adresse'"
        :validation="{'hasError': errors.has('Mail-Adresse') }"
        v-model='email' 
        v-validate='{ required: true, email: true }'
        data-vv-delay="1200"
        @focus='inputIsFocused = true' 
        type='email'
        name='Mail-Adresse' 
        placeholder='peter.pan@gmail.de'/>
      <BaseInputError v-show="errors.has('Mail-Adresse')">{{ errors.first('Mail-Adresse') }}</BaseInputError>

      <BaseInput
        :label = "'Passwort'"
        :validation="{'hasError': errors.has('Passwort') }"
        v-model='password' 
        v-validate='{ required: true, min: 8 }'
        data-vv-delay="1200"
        @focus='inputIsFocused = true' 
        type='password' 
        name='Passwort' 
        ref="Passwort"/>
      <BaseInputError v-show="errors.has('Passwort')">{{ errors.first('Passwort') }}</BaseInputError>

      <BaseInput
        :label = "'Passwort wiederholen'"
        :validation="{'hasError': errors.has('Passwort wiederholen') }"
        v-validate="'required|confirmed:Passwort'"
        data-vv-as='Passwort wiederholen'
        data-vv-delay="1200"
        v-model='passwordRepeat'
        @focus='inputIsFocused = true' 
        type='password'
        name='Passwort wiederholen'/>
      <BaseInputError v-show="errors.has('Passwort wiederholen')">{{ errors.first('Passwort wiederholen') }}</BaseInputError>

      <BaseButton type='submit' >Account erstellen</BaseButton>
    </form>
    
    <div 
      class='register-user-show-button' 
      v-show='inputIsFocused' 
      @click='inputIsFocused = false'>
      <i  class='sl-icon icon-arrow-up register-user-show-question-icon'></i>
    </div>

  </div>
</template>

<script>

// GraphQL
import CREATE_USER from '../graphql/users/createUser.gql'
import GET_TOKEN from '../graphql/auth/getToken.gql'

export default {
  name: 'register-user-screen',
  components: {

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

      // this.username = ''
      // this.email = ''
      // this.password = ''
      // this.passwordRepeat = ''

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
          this.errors.remove('Accountname vergeben')
          this.errors.add({
            field: 'Accountname vergeben',
            msg: 'Accountname leider schon vergeben'
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

</style>
