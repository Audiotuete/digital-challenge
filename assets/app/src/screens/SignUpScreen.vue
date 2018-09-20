
<template>
  <div class="challenge-signup-container">
    <div v-show="!inputIsFocused" class="challenge-signup-header">
      Deine Kontaktdaten für die Challenge
    </div>
    <div v-show="!inputIsFocused" class="challenge-signup-text__privacy">Deine Daten werden nicht an Dritte weitergegeben und nach der Challenge automatisch gelöscht!</div>
    <form class="challenge-signup-form"  @submit.prevent="login()">
      <label class="challenge-signup-label" for="username">Nutzername</label>
      <input name="username" @keyup="maxInput" v-model="username" @focus="inputIsFocused = true" type="text" class="challenge-signup-input" maxlength="7" placeholder="Peter Pan"/>
      
      <label class="challenge-signup-label" for="email">Mail-Adresse</label>
      <input name="email" @keyup="maxInput" v-model="email" @focus="inputIsFocused = true" type="email" class="challenge-signup-input" maxlength="7" placeholder="peter.pan@gmail.de"/>
      
      <label class="challenge-signup-label" style="margin-top: 1rem" for="password">Passwort</label>
      <input name="password" @keyup="maxInput" v-model="password" @focus="inputIsFocused = true" type="password" class="challenge-signup-input" maxlength="7"/>
      
      <label class="challenge-signup-label" for="password-repeat">Passwort wiederholen</label>
      <input name="password-repeat" @keyup="maxInput" v-model="passwordRepeat" @focus="inputIsFocused = true" type="password" class="challenge-signup-input" maxlength="7"/>

      <button @click="login()" class="challenge-signup-button-send">Account erstellen</button>
    </form>
          <div class="challenge-signup-show-button" v-show="inputIsFocused" @click="inputIsFocused = false"><i  class="sl-icon icon-arrow-up challenge-signup-show-question-icon"></i></div>

  </div>
</template>

<script>
// import VueSwing from 'vue-swing'

export default {
  name: 'challenge-signup-screen',
  components: {},
  data () {
    return {
      inputIsFocused: false,
      username: "",
      email: "",
      password: "",
      passwordRepeat: ""
    }
  },
  methods: {
    submitCode() {

    },
    login() {

    },
    maxInput() {
      var max = 7; // The maxlength you want
      console.log(this.inputValue)
      if(this.inputValue.length > max) {
        this.inputValue = this.inputValue.substring(0, max);
      }
    }
  }

}
</script>

<style scoped lang="scss">
.challenge-signup-container {
    z-index: 50;
    font-size: 1rem;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    box-sizing: border-box;
    padding: 5vh 3vw  5vh 3vw;
  }

  .challenge-signup-whiteroom {
    height: 16vh;
  }

  .challenge-signup-header {
    display: flex;
    text-align: center;
    margin: 1.5rem 1rem 1rem 1rem;
    font-size: 1.1rem;
    font-weight: 300;
  }

  .challenge-signup-text {
    margin: 0rem 1.25rem 0 1.25rem;
    font-size: 0.8rem;
    text-align: center;
    color: #555555;
    line-height: 1.3;
    font-weight: 500;

    &__privacy {
      width: 80vw;
      text-align: center;
      font-size: 0.8rem;
    }
  }

  .challenge-signup-show-button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 7vh;
    right: 3vw;
    height: 10vw;
    width: 10vw;
    background: #fff;
    color: #629EE4;
    border-radius: 50%;
    border: 1px solid #629EE4;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
  }

  .challenge-signup-form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vw;
  }

  .challenge-signup-label {
    align-self: flex-start;
    font-size: 0.6rem;
    margin-top: 0.4rem
  }

  .challenge-signup-input {
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

  .challenge-signup-button-send {
    background: #4A90E2;
    border: none;
    outline: none;
    width: 60vw;
    height: 8vh;
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
