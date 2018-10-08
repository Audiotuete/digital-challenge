
<template>
  <div>
    <vue-swing
      @throwoutup='skipQuestion()'
      @throwoutleft='vote(answerValues.NO)'
      @throwoutdown='toggleCard()'
      @throwoutright='vote(answerValues.YES)'
      @change='this.activeCard = document.querySelector(".cardselector")'
      :config='config'
      ref='vueswing'
      class='swing-wrapper'
    >
      <div class='card card-not-dragable'>
        <div v-show='!showNotepad' class='question-container'>
          <div class='question-image-text'>
          </div>
        </div>
      </div>
      <div
        v-for='card in cardStack'
        :class='[ "card-" + card.id, { card: true, "card-notepad": showNotepad }]'
        :key='card.id'
        >
        <!-- Front of Card where the Question is presented and voteable -->
        <div v-show='!showNotepad' class='question-container'>
          <div class='question-image-text'>
            <img src='https://source.unsplash.com/random/450x650' alt=''>
          </div>
          <div class='choicebar'>
            <div  class='choice-container'>
              {{card.id}} 
              <button @click='vote(answerValues.NO)' class='choice-button' href='#'><i class='sl-icon icon-close'></i></button>
              <button v-show='!showNotepad' @click='toggleCard()' class='choice-button' href='#'><i class='sl-icon icon-note'></i></button>
              <!-- <button v-show='showNotepad' @click='toggleCard()' class='choice-button' href='#'><i class='sl-icon icon-question'></i></button> -->
              <button @click='vote(answerValues.YES)' class='choice-button' href='#'><i class='sl-icon icon-check'></i></button>
            </div>
          </div>
        </div>
        <!-- Back of Card where a note can be made an send (not dragable) -->
        <div v-show='showNotepad' class='note-container'>
            
            <div v-show='!inputIsFocused' class='note-header'><button class='note-header-icon' @click='toggleCard()'><i class='sl-icon icon-arrow-left'></i></button>Anmerkungen zu:</div>
            <div v-show='!inputIsFocused' class='note-question'>Sollten in der Kantine vegetarische Speisen angeboten werden?</div>
            <textarea @focus='inputIsFocused = true' class='note-input' maxlength='250'/>
            <div class='note-show-question' v-show='inputIsFocused' @click='inputIsFocused = false'><i  class='sl-icon icon-arrow-up note-show-question-icon'></i></div>
            <button @click='makeNote(answerValues.NOTE)' class='note-button-send'>Senden</button>
        </div>
      </div>

    </vue-swing>
    <button @click='login()' class='note-button-send'>Register</button>
  </div>
</template>

<script>
import VueSwing from 'vue-swing'

// GraphQL
import ALL_USER_ANSWERS from '../graphql/userAnswers/allUserAnswers.gql'
import CREATE_USER from '../graphql/users/createUser.gql'
import GET_TOKEN from '../graphql/auth/getToken.gql'

export default {
  name: 'swiper-screen',
  components: { VueSwing },
  data () {
    return {
      allUserAnswers: {},
      activeCard: "",
      cardStack: [ 
        {id: 0, value: 'A'}
      ],
      none: 'none',
      answerValues: {'NO': 0, 'YES': 1, 'NOTE': 2},
      isPlaying: false,
      showNotepad: false,
      inputIsFocused: false,
      activeCard: "",
      username: "test",
      password: "password"
    }
  },
  apollo: {
    allUserAnswers: {
      query: ALL_USER_ANSWERS,
      fetchPolicy: 'cache-and-network',
      // update(data) {
      //   console.log(data)
      // },
    }
  },
  computed: {
    // username() {
    //   return 'Alfred'
    // },
    // password() {
    //   return 'password'
    // },
    config () {
      return {        
        allowedDirections: 
        [
          // Skip Question on swipe UP
          // VueSwing.Direction.UP,
          VueSwing.Direction.DOWN,
          VueSwing.Direction.RIGHT,
          VueSwing.Direction.LEFT,
        ]
        ,
        minThrowOutDistance: 1000,
        maxThrowOutDistance: 5000,
        throwOutConfidence: (xOffset, yOffset, element) => {
          const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth * 1.5, 1);
          const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight * 2.5, 1);

          return Math.max(xConfidence, yConfidence);
        }
      }
    }
  },
  methods: {
    register() {
      const theUsername = this.username
      const thePassword = this.password

      this.username = ''
      this.password = ''
      
      this.$apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          pollId: 8,
          username: theUsername,
          password: thePassword,
        }
      }).then((data) => {
        
        this.username = theUsername
        this.password = thePassword

        this.login()

      }).catch((error) => {
        // Error
        console.error('No user created')
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
          // this.$router.push('/')
        }
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
      })
    },
    vote(value = -1) {
      this.saveCardAnswer(value, null)
    },
    toggleCard() { 
      let card = this.$refs.vueswing.stack.getCard(this.activeCard)
      card.throwIn(0, 0)
      this.showNotepad = !this.showNotepad
    },
    makeNote(value = -1, note = null) {

      this.saveCardAnswer(value, note)
    },
    skipQuestion() {},
    requestNewCard() {
      // Query here
      this.showNotepad = false
      this.inputIsFocused = false;
      this.cardStack.unshift({id: Math.floor(Math.random() * Math.floor(100)), value: Math.floor(Math.random() * Math.floor(20000))})
    },

    saveCardAnswer(value, note) {
      // Mutation here
      if(this.cardStack.length == 1) {
        this.cardStack.pop()

      }
      this.requestNewCard()
      // console.log(this.cardStack)
      // console.log(this.activeCard)

    }
  },
  mounted() {
    this.activeCard = document.querySelector('.card-' + this.cardStack[0].id)
  },
  updated() {
    this.activeCard = document.querySelector('.card-' + this.cardStack[0].id)
  },
}
</script>

<style scoped lang='scss'>

.swing-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 150%;
}

.card {
  z-index: 50;
  top: 11.5vh;
  position: absolute;
  height: calc(74% * 1);
  width: calc(88% * 1);
  display: flex;
  justify-content: center;
  align-items: center;  
  background-color: #fff;
  border-radius: 1.5vh;
  box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;

  .question-container {
    z-index: 50;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
  }

  .note-container {
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

  .note-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 1rem 1rem 1rem;
    font-size: 1.2rem;
    font-weight: 300;
  }

  .note-header-icon {
    position: absolute;
    left: 3vw;
    top: 8.5vh;
    font-size: 1.5rem;
    color: #555555;
  }

  .note-question {
    margin: 0rem 1.75rem 0 1.75rem;
    font-size: 1.1rem;
    text-align: center;
    color: #555555;
    line-height: 1.3;
    font-weight: 500;
  }

  .note-show-question {
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

  .note-input {
    pointer-events: all;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 55%;
    width: 86%;
    margin-top: 1.5rem;
    padding: 2.5rem 1.5rem;
    font-size: 0.9rem;
    font-family: 'Open Sans';
    box-sizing: border-box;
    background: #FEFEFE;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.25);
    border-radius: 0.75vw;
  }

  .note-button-send {
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
    font-weight: 600;
    border-radius: 1vh;
    margin-top: -1.6rem;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.25);
  }
}

.card-notepad {
  // transform: none !important;
}

.question-image-text {
  height: 10%;
  flex: 4;
}

.choicebar {
  display: flex;
  width: 100%;
  flex: 1;
  align-self: flex-end;
  justify-content: center;
  height: 16vh;
  background: rgba(255,255,255,1);
  // box-shadow: 0 0 6px 0 rgba(0,0,0,0.25);
}

.choice-container {
  width: 100%;
  display: flex;
  padding-top: 1px;
  justify-content: space-around;
  align-items: center;
  background: transparent;
}

.choice-text {
  font-size: 1rem;
  width: 30vw;
  text-align: center;
}

.choice-button {

  .icon-close {
    font-size: 12.5vw;
    color: rgba(208, 2, 26, .5)
  }
  .icon-note, .icon-question {
    font-size: 12vw;
    color: rgba(245, 165, 35, .6)
  }
  .icon-check {
    font-size: 12.5vw;
    color: rgba(125, 211, 33, 0.75)
  }
}

</style>
