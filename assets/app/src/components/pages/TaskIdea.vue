<template>
  <div>
    <BaseWhitespace/>
    <BaseHeading :level='1'>
      <button class='header-icon sl-icon icon-arrow-left' @click='back()'><i ></i></button>
      {{projectTask.task.taskText}}
    </BaseHeading>
    <form id='form' class='form' @submit.prevent='sendData()'>
      
      <BaseInput :label="'Hashtag#1'" v-model='hashtag_1' @focus='inputIsFocused = true' type='text' />
      
      <BaseInput :label="'Hashtag#2'" v-model='hashtag_2' @focus='inputIsFocused = true' type='text' />

      <BaseInput :label="'Hashtag#3'" v-model='hashtag_3' @focus='inputIsFocused = true' type='text' />
      
      <BaseButton type='submit' form='form'>Abschicken</BaseButton>
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

