<template>
  <div>
    <BaseWhitespace/>
    <div class='header'>
        <button class='header-icon' @click='back()'><i class='sl-icon icon-arrow-left'></i></button>
        {{projectTask.task.taskText}}
    </div>
    <form id='form' class='form'  @submit.prevent='sendData()'>
      
      <BaseFormLabel>Hashtag#1</BaseFormLabel>
      <input name='action-1' v-model='hashtag_1' @focus='inputIsFocused = true' type='text' class='input'>
      
      <BaseFormLabel>Hashtag#2</BaseFormLabel>      
      <input name='action-2' v-model='hashtag_2' @focus='inputIsFocused = true' type='text' class='input'/>

      <BaseFormLabel>Hashtag#3</BaseFormLabel>     
        <input name='action-3' v-model='hashtag_3' @focus='inputIsFocused = true' type='text' class='input'/>
      
      <button type='submit' form='form' class='button-send'>Abschicken</button>
    </form>
  </div>
</template>

<script>

// GraphQL
import UPDATE_PROJECT_TASK_IDEA from '../../graphql/projectTasks/updateProjectTaskIdea.gql'

export default {
  name: 'task-action',
  components: {

  },
  props: {
    projectTask: Object,
  }, 
  data () {
    return {
      inputIsFocused: false,
      hashtag_1: this.projectTask.hashtag1,
      hashtag_2: this.projectTask.hashtag2,
      hashtag_3: this.projectTask.hashtag3,
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    sendData() {
      const hashtag1 = this.hashtag_1
      const hashtag2 = this.hashtag_2
      const hashtag3 = this.hashtag_3
      const taskId = this.projectTask.task.id

      this.hashtag_1 = ''
      this.hashtag_2 = ''
      this.hashtag_3 = ''
      
      this.$apollo.mutate({
        mutation: UPDATE_PROJECT_TASK_IDEA,
        variables: {
          taskId: taskId,
          status: false,
          hashtag1: hashtag1,
          hashtag2: hashtag2,
          hashtag3: hashtag3
        }
      }).then((data) => {
        // Result
        this.$router.push('/')
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.hashtag_1 = hashtag1
        this.hashtag_2 = hashtag2
        this.hashtag_3 = hashtag3
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.container {
    z-index: 50;
    font-size: 1rem;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    box-sizing: border-box;
    padding: 0 3vw  5vh 3vw;
  }

  .whiteroom {
    height: 16vh;
  }

  .header {
    display: flex;
    text-align: center;
    margin: 1.5rem 1rem 1rem 1rem;
    font-size: 1.1rem;
    font-weight: 300;
  }

  .text {
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

  .show-button {
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

  .form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vw;
  }

  .input {
    pointer-events: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 2.5rem;
    margin-bottom: 0.2rem;
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

  .button-send {
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
  .header-icon {
    position: absolute;
    left: 0.15rem;
    top: 1rem;
    font-size: 1.5rem;
    color: #555;
  }

</style>

