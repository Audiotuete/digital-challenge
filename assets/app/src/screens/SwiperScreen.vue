
<template>
  <div>
    <vue-swing
      @throwoutleft="vote(answerValues.NO)"
      @throwoutup="true"
      @throwoutright="vote(answerValues.YES)"
      :config="config"
      ref="vueswing"
      class="swing-wrapper"
    >
    <div class="card card-not-dragable"></div>
      <div
        v-for="card in cards"
        :key="card"
        :class="{ /* Make card not dragble while making notes */ card: true, 'card-not-dragable': showNotepad }"
        ref="card"
        >
        <!-- Front of Card where the Question is presented and voteable -->
        <div v-show="!showNotepad" class="question-container">
          <youtube id="youtube-player"
            video-id
            :player-vars="playerVars" 
            ref="youtube" 
            @playing="playing"
            @paused="isPlaying = !isPlaying"
            >
          </youtube>
          <button v-show="!isPlaying" class="button-play" @click="playVideoIndex(2)"><i class="fa fa-play"></i></button>
          <button class="button-replay" style="marigin: 20px" @click="replayVideo()"><i class="fa fa-undo"></i></button>
        </div>
        <!-- Back of Card where a note can be made an send (not dragable) -->
        <div v-show="showNotepad" class="note-container">
            
            <div v-show="!inputIsFocused" class="note-header"><button class="note-header-icon" @click="showNotepad = false"><i class="sl-icon icon-arrow-left"></i></button>Anmerkungen zu:</div>
            <div v-show="!inputIsFocused" class="note-question">Sollten in der Kantine vegetarische Speisen angeboten werden?</div>
            <textarea @focus="inputIsFocused = true" class="note-input" maxlength="250"/>
            <div class="note-show-question" v-show="inputIsFocused" @click="inputIsFocused = false"><i  class="sl-icon icon-arrow-up note-show-question-icon"></i></div>
            <button @click="makeNote(answerValues.NOTE)" class="note-button-send">Senden</button>
        </div>
      </div>
    </vue-swing>
    
    <div v-show="!showNotepad" class="choicebar">
      <div  class="choice-container">
        <button @click="vote(answerValues.NO)" class="choice-button" href='#'><i class="sl-icon icon-close"></i></button>
        <button v-show="!showNotepad" @click="goToNotepad()" class="choice-button" href='#'><i class="sl-icon icon-note"></i></button>
        <!-- <button v-show="showNotepad" @click="goToNotepad()" class="choice-button" href='#'><i class="sl-icon icon-question"></i></button> -->
        <button @click="vote(answerValues.YES)" class="choice-button" href='#'><i class="sl-icon icon-check"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import VueSwing from 'vue-swing'

export default {
  name: 'swiper-screen',
  components: { VueSwing },
  data () {
    return {
      cards: ['A'],
      none: 'none',
      answerValues: {'NO': 0, 'YES': 1, 'NOTE': 2},
      isPlaying: false,
      showNotepad: false,
      inputIsFocused: false,
      playerVars: {
        listType: 'playlist',
        list: 'PLglaqunAuU1jKrln443Vi2xkwX_Oimg_G',
        autoplay: 0,
        rel: 0,
        showinfo: 0,
        showsearch: 0,
        controls: 0,
        modestbranding: 0,
        cc_load_policy: 1
      }
    }
  },
  computed: {
    config () {
      return {        
        allowedDirections: 
        [
          // VueSwing.Direction.UP,
          // VueSwing.Direction.DOWN,
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
    vote(value = -1) {
      
      this.saveCardAnswer(value, null)
      this.isPlaying = false
    },

    goToNotepad() {
      this.$refs.youtube[0].player.pauseVideo()
      this.showNotepad = true
      
    },

    makeNote(value = -1, note = null) {
      this.saveCardAnswer(value, note)
    },

    requestNewCard() {
      // Query here
      this.showNotepad = false
      this.inputIsFocused = false;
      this.cards.push(Math.random())	
    },

    saveCardAnswer(value, note) {
      // Mutation here
      console.log(value, note)
      this.cards.shift()
      this.requestNewCard()

    },

    async playVideoIndex (index) {
      let player = this.$refs.youtube[0].player
      if (await player.getPlayerState() == 2) {
        console.log("playing paused video")
          player.playVideo()
      } else {
        player.playVideoAt(index)
      }
      // setInterval(() => this.isPlaying = true, 200)
    },

    replayVideo() {
      let player = this.$refs.youtube[0].player
      player.stopVideo()
      player.playVideo()
    },

    playing () {
      this.isPlaying = true;
    } 
  }
}
</script>

<style scoped lang="scss">

.swing-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 150%;
}

.card {
  top: 6vh;
  position: absolute;
  height: calc(79.5% * 1.35);
  width: calc(68.5% * 1.35);
  display: flex;
  justify-content: center;
  align-items: center;  
  background-color: #fff;
  border-radius: 1.5vh;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;

  .question-container {
    z-index: 50;
    display: flex;
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
    pointer-events: auto;
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

.card-not-dragable {
  pointer-events: auto;
}

// .overlay {
//   z-index: 900;
// }

.button-play {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  border-radius: 10px;
  height: 15.5vw;
  width: 21vw;
  border: none;
  outline: none;
  // color: #fff;
  background-color: rgba(255, 255, 255, .9);

  .fa-play {
    color: #629EE4;
    padding: 0.75vw 0 0 0.75vw;
  }
}

.button-replay {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 6vh;
  left: 6vw;
  z-index: 100;
  border-radius: 1vw;
  height: 8vw;
  width: 8vw;
  border: none;
  outline: none;
  // color: #fff;
  background-color: rgba(0, 0, 0, .5);

  .fa-undo {
    padding-top: 10%;
    font-size: 5vw;
  }
}

.choicebar {
  z-index: 100;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 79vh;
  height: 14vh;
  width: 100%;
  background: rgba(255,255,255,1);
  box-shadow: 0 0 6px 0 rgba(0,0,0,0.25);
}

.choice-container {
  width: 85vw;
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
