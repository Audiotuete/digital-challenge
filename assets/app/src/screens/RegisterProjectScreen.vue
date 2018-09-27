
<template>
  <div>
    <Whitespace/>
    <Heading :level="1" v-show='!inputIsFocused'>
      Einem Projekt per Code beitreten
    </Heading>

    <button v-show='!inputIsFocused' @click='showEnterCodeModal = true' class='register-project-button-send'>Code eingeben</button>

    <div @click='showEnterCodeModal = false' :class='{ /* Make card not dragble while making notes */ "darken-background": showEnterCodeModal }'></div> 
    <div v-show='showEnterCodeModal' class='card '>
      <div class='modal-container'>
        <!-- Extract close button from heading -->
        <Heading :level="1">
          <button class='modal-header-icon' @click='showEnterCodeModal = false'>
            <i class='sl-icon icon-close'></i>
          </button>
          Projekt-Code eingeben
        </Heading>

        <input @keyup='maxInput' v-model='projectCode' autocomplete='off' class='modal-input' maxlength='7' placeholder='XXXXXXX'/>
        <Paragraph>Den Projektcode erfährst du vom Projektersteller oder Projektmitgliedern</Paragraph>
        <button @click='joinProject()' class='register-project-button-send'>Projekt beitreten</button>
      </div>
    </div>
 <!-- Whitespace instead of custom Style -->
    <Heading :level="1" style="margin-top: 3rem; margin-bottom: 0.25rem;">
      Neues Projekt erstellen
    </Heading>
    <form class='register-project-form' @submit.prevent='createProject()'>
      <FormLabel>Projektname</FormLabel>
      <input name='project-title' v-model='projectName' @focus='inputIsFocused = true' type='text' class='register-project-input' maxlength='28'/>
      
      <FormLabel>Projektbeschreibung</FormLabel>      
      <textarea class='register-project-input register-project-textarea' name='project-description' v-model='projectDescription' @focus='inputIsFocused = true' type='text' maxlength='80'/>

      <button type='submit' class='register-project-button-send'>Projekt erstellen</button>
    </form>
    <div class='register-project-show-button' v-show='inputIsFocused' @click='inputIsFocused = false'><i  class='icon-arrow-up register-project-show-question-icon'></i></div>
  
    <div :class='{ /* Make card not dragble while making notes */ "darken-background": showCreateSuccesModal }'></div> 
      <div v-show='showCreateSuccesModal' class='card '>
        <div class='modal-container'>
          <Heading :level="1">
            Projekt erfolgreich erstellt
          </Heading>
          <Paragraph><strong>{{ projectName }}</strong></Paragraph>
          <Paragraph>{{ projectDescription }}</Paragraph>
          <div class='register-project-label register-project-label__code'>Project-Code</div>
          <div  class='register-project-code-display'>{{ projectCode }}</div>
          <button @click='goToProjectFeed()' class='register-project-button-send'>Weiter</button>
        </div>
      </div>
    </div>
 
</template>

<script>
import Heading from '../components/atoms/Heading'
import Paragraph from '../components/atoms/Paragraph'
import FormLabel from '../components/atoms/FormLabel'
import Whitespace from '../components/layout/Whitespace'

// GraphQL
import CREATE_PROJECT from '../graphql/projects/createProject.gql'  
import JOIN_PROJECT from '../graphql/projects/joinProject.gql'
import CURRENT_USER from '../graphql/users/currentUser.gql'

export default {
  name: 'register-project-screen',
  components:{
    Heading,
    Paragraph,
    FormLabel,
    Whitespace
  },
  data () {
    return {
      showEnterCodeModal: false,
      showCreateSuccesModal: false,
      projectCode: '',
      // ------
      inputIsFocused: false,
      projectName: '',
      projectDescription: '',
    }
  },
  methods: {
    joinProject() {
      const theProjectCode = this.projectCode

      this.projectCode = ''
      
      this.$apollo.mutate({
        mutation: JOIN_PROJECT,
        variables: {
          projectCode: theProjectCode,
        }
      }).then(() => {
        // Result
        this.$router.push('/taskfeed')

      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.projectCode = theProjectCode
      })
    },
    createProject() {
      const theName = this.projectName
      const theDescription = this.projectDescription

      this.projectName = ''
      this.projectDescription = ''
      
      this.$apollo.mutate({
        mutation: CREATE_PROJECT,
        variables: {
          projectName: theName,
          projectDescription: theDescription,
        }
      }).then((data) => {
        // Result
        this.projectName = data.data.createProject.project.projectName
        this.projectDescription = data.data.createProject.project.projectDescription
        this.projectCode = data.data.createProject.project.projectCode

        this.showCreateSuccesModal = true;

      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.projectName = theName
        this.projectDescription = theDescription

      })
    },
    goToProjectFeed() {
      this.$router.push('/taskfeed')
    },
    maxInput() {
      var max = 7; // The maxlength you want
      if(this.projectCode.length > max) {
        this.projectCode = this.projectCode.substring(0, max);
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$apollo.query({
      query: CURRENT_USER,
      // fetchPolicy: 'network-only'
    }).then((data) => {
      if(data.data.currentUser.currentProject) {
        vm.$router.push('/taskfeed')
      }
    }).catch((error) => {
      vm.$router.push('/')
    })
    })   
  },
}
</script>

<style scoped lang='scss'>

.darken-background {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
}

  .register-project-show-button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1.5rem;
    right: 1rem;
    height: 10vw;
    width: 10vw;
    background: #fff;
    color: $colorPrimary;
    border-radius: 50%;
    border: 1px solid $colorPrimary;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
  }

  .register-project-form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vw;
  }

  .register-project-label {
    align-self: flex-start;
    font-size: 0.6rem;
    margin-top: 0.4rem;

    &__code {
      align-self: center;
      margin-top: 1rem;
      margin-bottom: 0.25rem;
    }
  }

  .register-project-input {
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

  .register-project-code-display {
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 0.5rem;
  }

  .register-project-textarea {
    height: 6rem;
    padding: 0.75rem;
  }

  .register-project-button-send {
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


.card {
  position: absolute;
  width: calc(65% * 1.35);
  display: flex;
  top: 16vh;
  justify-content: center;
  align-items: center;  
  background-color: #fff;
  border-radius: 1.5vh;
  box-shadow: 0 0 15px 0 $colorPrimary;
  overflow: hidden;
  padding-bottom: 1rem;

  .modal-container {
    z-index: 50;
    font-size: 1rem;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    box-sizing: border-box;
    padding: 3vh 3vw 4vh 3vw;
  }

  .modal-header-icon {
    position: absolute;
    right: 0.15rem;
    top: 0.5rem;
    font-size: 1.5rem;
    color: #555;
  }

  .modal-input {
    pointer-events: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    width: 70%;
    margin-bottom: 1rem;
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
    color: $colorPrimary;
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

</style>
