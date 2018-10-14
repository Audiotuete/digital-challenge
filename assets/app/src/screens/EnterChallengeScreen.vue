
<template>
<div>
  <Whitespace/>
  <Heading :level="1">Willkommen zur Project-Challenge-App</Heading>
  <Paragraph>Hier kannst du den Challenge-Code, welchen du während der Ideenschmiede erhälst, eingeben.</Paragraph>
  <input @input='maxInput()' v-model='inputValue' autocomplete='off' @focus='inputIsFocused = true' class='challenge-code-input' maxlength='5' placeholder='XXXXX'/>
  
  <Paragraph v-if='aChallenge'>{{ aChallenge.context }}</Paragraph>
  <Paragraph v-else>-</Paragraph>

  <!-- <div class='challenge-code-show-question' v-show='inputIsFocused' @click='inputIsFocused = false'><i  class='sl-icon icon-arrow-up challenge-code-show-question-icon'></i></div> -->
  <button @click='submitCode()' class='challenge-code-button-send'>Beitreten</button>
  <div class='challenge-code-whiteroom'></div>
  <Paragraph>Wenn du schon einen Challenge-Account hast kannst du dich einfach direkt anmelden.</Paragraph>

  <button @click='goToLoginScreen()' class='challenge-code-button-send'>Anmelden</button>
</div>
</template>

<script>
import Heading from '../components/atoms/Heading'
import Paragraph from '../components/atoms/Paragraph'
import Whitespace from '../components/layout/Whitespace'

// GraphQL
import A_CHALLENGE from '../graphql/challenges/aChallenge.gql'

export default {
  name: 'join-challenge-screen',
  components: {
    Heading,
    Paragraph,
    Whitespace
  },
  data () {
    return {
      inputCount: 0,
      inputIsFocused: false,
      inputValue: '',
      aChallenge: undefined,
    }
  },
  apollo: {
    aChallenge: {
      query: A_CHALLENGE,
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
      if(this.aChallenge) {
        console.log(this.aChallenge)
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

  .challenge-code-button-send {
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
