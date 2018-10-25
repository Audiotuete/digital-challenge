
<template>
  <div>
    <BaseWhitespace/>
    <BaseHeading :level="1" v-show='!inputIsFocused'>
      Einem Projekt beitreten
    </BaseHeading>

    <BaseButton v-show='!inputIsFocused' @click='showEnterCodeModal = true'>Projektpasswort eingeben</BaseButton>

    <!-- <div @click='showEnterCodeModal = false' :class='{ /* Make card not dragble while making notes */ "darken-background": showEnterCodeModal }'></div>  -->
    <Modal @close='showEnterCodeModal = false' v-show='showEnterCodeModal'>
      <BaseHeading :level="1">
        Projektpasswort eingeben
      </BaseHeading>

      <input @keyup='maxInput' v-model='projectCode' autocomplete='off' class='modal-input' maxlength='7' placeholder='XXXXXXX'/>
      <BaseParagraph>Das Projektpasswort erfährst du vom Projektersteller oder Projektmitgliedern</BaseParagraph>
      <BaseButton @click='joinProject()'>Projekt beitreten</BaseButton>
    </Modal>
 <!-- BaseWhitespace instead of custom Style -->
    <BaseHeading :level="1" style="margin-top: 3rem; margin-bottom: 0.25rem;">
      Neues Projekt erstellen
    </BaseHeading>

    <form class='register-project-form' @submit.prevent='createProject()'>
      <BaseInput 
        :label="'Projektname'"
        name='project-title'
        v-model='projectName'
        @focus='inputIsFocused = true'
        type='text'
        maxlength='28'/>
      <BaseTextarea 
        :label="'Projektbeschreibung'" 
        name='project-description' 
        v-model='projectDescription' 
        @focus='inputIsFocused = true' 
        type='text' 
        maxlength='80'/>
      <BaseButton type='submit'>Projekt erstellen</BaseButton>
    </form>

    <div class='register-project-show-button' v-show='inputIsFocused' @click='inputIsFocused = false'><i  class='icon-arrow-up register-project-show-question-icon'></i></div>
  
    <Modal v-show='showCreateSuccesModal' :closebutton = false>
      <BaseHeading :level="1">
        Projekt erfolgreich erstellt
      </BaseHeading>
      <BaseParagraph><strong>{{ projectName }}</strong></BaseParagraph>
      <BaseParagraph>{{ projectDescription }}</BaseParagraph>
      <div class='register-project-label register-project-label__code'>Project-Code</div>
      <div  class='register-project-code-display'>{{ projectCode }}</div>
      <BaseButton @click='goToProjectFeed()'>Weiter</BaseButton>
    </Modal>
  </div>
 
</template>

<script>

import Modal from '../components/templates/Modal'

// GraphQL
import CREATE_PROJECT from '../graphql/projects/createProject.gql'  
import JOIN_PROJECT from '../graphql/projects/joinProject.gql'

export default {
  name: 'register-project-screen',
  components:{
    Modal
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
        this.$router.push('/')

      }).catch((error) => {
        // Error
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
      this.showCreateSuccesModal = false
      this.$router.push('/')
    },
    maxInput() {
      var max = 7; // The maxlength you want
      if(this.projectCode.length > max) {
        this.projectCode = this.projectCode.substring(0, max);
      }
    },
  }
}
</script>

<style scoped lang='scss'>

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

  .register-project-code-display {
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 0.5rem;
  }


.card-not-dragable {
  pointer-events: auto;
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

</style>
