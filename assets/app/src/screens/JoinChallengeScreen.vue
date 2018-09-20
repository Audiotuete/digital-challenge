
<template>
  <div class="challenge-code-container">
      
      <div  class="challenge-code-header">
        Willkommen zur Project-Challenge-App
      </div>
      <div  class="challenge-code-text">Hier kannst du den Challenge-Code, welchen du während der Ideenschmiede erhälst, eingeben.</div>
      <input @keyup="maxInput" v-model="inputValue" @focus="inputIsFocused = true" class="challenge-code-input" maxlength="7" placeholder="XXXXXXX"/>
      <!-- <div class="challenge-code-show-question" v-show="inputIsFocused" @click="inputIsFocused = false"><i  class="sl-icon icon-arrow-up challenge-code-show-question-icon"></i></div> -->
      <button @click="submitCode()" class="challenge-code-button-send">Beitreten</button>
      <div class="challenge-code-whiteroom"></div>
      <div  class="challenge-code-text">Wenn du schon einen Challenge-Account hast kannst du dich einfach direkt anmelden.</div>
      <button @click="login()" class="challenge-code-button-send">Anmelden</button>


  </div>
</template>

<script>
// import VueSwing from 'vue-swing'

export default {
  name: 'join-challenge-screen',
  components: {},
  data () {
    return {
      inputIsFocused: false,
      inputValue: ""
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
.challenge-code-container {
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

  .challenge-code-whiteroom {
    height: 16vh;
  }

  .challenge-code-header {
    display: flex;
    text-align: center;
    margin: 1.5rem 1rem 1rem 1rem;
    font-size: 1.1rem;
    font-weight: 300;
  }

  .challenge-code-text {
    margin: 0rem 1.25rem 0 1.25rem;
    font-size: 0.8rem;
    text-align: center;
    color: #555555;
    line-height: 1.3;
    font-weight: 500;
  }

  .challenge-code-show-question {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 7vh;
    right: 6vw;
    height: 10vw;
    width: 10vw;
    background: #fff;
    color: #629EE4;
    border-radius: 50%;
    border: 1px solid #629EE4;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
  }

  .challenge-code-input {
    pointer-events: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    width: 65%;
    margin-top: 1rem;
    padding: .5rem .1rem;
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 0.5rem;
    font-family: 'Open Sans';
    box-sizing: border-box;
    background: #FEFEFE;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.25);
    border-radius: 0.75vw;

    &::placeholder {
      color: #DDDDDD;
    }
  }

  .challenge-code-button-send {
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
