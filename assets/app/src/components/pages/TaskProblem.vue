<template>
  <div>
    <BaseWhitespace/>
    <BaseHeading :level='1'>
        <button class='header-icon' @click='back()'><i class='sl-icon icon-arrow-left'></i></button>
        {{projectTask.task.taskText}} 
    </BaseHeading>
    <form id='form' class='form' @submit.prevent='sendData()'>

      <BaseTextarea :label='"Stichpunkte"' v-model='keywords' @focus='inputIsFocused = true' type='text' placeholder='Schreibe hier einfach 10 Stichwörter die dein Problem beschreiben'/>
      
      <BaseButton type='submit' form='form'>Abschicken</BaseButton>
    </form>
  </div>
</template>

<script>

// GraphQL
import UPDATE_PROJECT_TASK_PROBLEM from '../../graphql/projectTasks/updateProjectTaskProblem.gql'

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
      keywords: this.projectTask.keywords,
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    sendData() {
      const keyWords = this.keywords
      const taskId = this.projectTask.task.id

      this.keywords = ''
      
      this.$apollo.mutate({
        mutation: UPDATE_PROJECT_TASK_PROBLEM,
        variables: {
          taskId: taskId,
          keywords: keyWords
        }
      }).then((data) => {
        // Result
        this.$router.push('/')
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.keywords = keyWords
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

  .header-icon {
    position: absolute;
    left: 0.15rem;
    top: 1rem;
    font-size: 1.5rem;
    color: #555;
  }

</style>

