
<template>
  <div class="note-container">
      
      <div  class="note-header"><button class="note-header-icon" @click="showNotepad = false"><i class="sl-icon icon-arrow-left"></i></button>Anmerkungen zu:</div>
      <div  class="note-question">Sollten in der Kantine vegetarische Speisen angeboten werden?</div>
      <textarea @focus="inputIsFocused = true" class="note-input" maxlength="250"/>
      <div class="note-show-question" v-show="inputIsFocused" @click="inputIsFocused = false"><i  class="sl-icon icon-arrow-up note-show-question-icon"></i></div>
      <button @click="submitCode()" class="note-button-send">Senden</button>
  </div>
</template>

<script>
// import VueSwing from 'vue-swing'

export default {
  name: 'challenge-code-screen',
  components: {},
  data () {
    return {
      inputIsFocused: false,
    }
  },
  methods: {
    submitCode() {}
  }
}
</script>

<style scoped lang="scss">
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

</style>
