
<template>
<div>
  <BaseWhitespace/>
  <BaseHeading :level="1">Willkommen zur Projekt Challenge App</BaseHeading>
  <BaseParagraph>Hier kannst du den Challenge-Code, welchen du während der Ideenschmiede erhälst, eingeben.</BaseParagraph>
  <input @input='maxInput()' v-model='inputValue' autocomplete='off' @focus='inputIsFocused = true' class='challenge-code-input' maxlength='5' placeholder='XXXXX'/>
  
  <BaseParagraph v-if='checkChallenge'>{{ checkChallenge.context }}</BaseParagraph>
  <BaseParagraph v-else>-</BaseParagraph>

  <!-- <div class='challenge-code-show-question' v-show='inputIsFocused' @click='inputIsFocused = false'><i  class='sl-icon icon-arrow-up challenge-code-show-question-icon'></i></div> -->
  <BaseButton @click.native='submitCode()'>Beitreten</BaseButton>
  <div class='challenge-code-whiteroom'></div>
  <BaseParagraph>Wenn du schon einen Challenge-Account hast kannst du dich einfach direkt anmelden.</BaseParagraph>
  
  <BaseButton @click.native='goToLoginScreen()'>Anmelden</BaseButton>
</div>
</template>

<script>

// GraphQL
import CHECK_CHALLENGE from '../graphql/challenges/checkChallenge.gql'

export default {
  name: 'enter-challenge-screen',
  components: {

  },
  data () {
    return {
      inputCount: 0,
      inputIsFocused: false,
      inputValue: '',
      checkChallenge: undefined,
    }
  },
  apollo: {
    checkChallenge: {
      query: CHECK_CHALLENGE,
      variables() {
        return {
          challengeCode: this.inputValue
        } 
      },
      fetchPolicy: 'network-only',
      skip() {
        return this.inputCount < 5
      },
    }
  },
  methods: {
    submitCode() {
      if(this.checkChallenge) {
        localStorage.setItem('63[CU^j>3=_UJuG', this.inputValue)
        this.$router.push('/registeruser')
      }
    },
    goToLoginScreen() {
      this.$router.push('/login')
    },
    maxInput() {
      this.inputCount = this.inputValue.length
      var max = 5; // The maxlength you want
      if(this.inputValue.length > max) {
        this.inputValue = this.inputValue.substring(0, max);
      }
    },
  }
}
</script>

<style scoped lang='scss'>

  .challenge-code-whiteroom {
    height: 16vh;
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
    color: $colorPrimary;
    border-radius: 50%;
    border: 1px solid $colorPrimary;
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

</style>
