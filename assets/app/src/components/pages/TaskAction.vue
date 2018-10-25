<template>
  <div>
    <BaseWhitespace/>
    <BaseHeading :level='1'>
      <button class='header-icon' @click='back()'><i class='sl-icon icon-arrow-left'></i></button>
      {{projectTask.task.taskText}}
    </BaseHeading>
    <form id='form' @submit.prevent='sendData()'>

      <BaseInput :label="'1. Aktion'" v-model='action_1' @focus='inputIsFocused = true' type='text'/>
      
      <BaseInput :label="'2. Aktion'" v-model='action_2' @focus='inputIsFocused = true' type='text'/>

      <BaseInput :label="'3. Aktion'" v-model='action_3' @focus='inputIsFocused = true' type='text'/>
      
      <BaseButton type='submit' form='form'>Abschicken</BaseButton>
    </form>
  </div>
</template>

<script>

// GraphQL
import UPDATE_PROJECT_TASK_ACTION from '../../graphql/projectTasks/updateProjectTaskAction.gql'

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
      action_1: this.projectTask.action1,
      action_2: this.projectTask.action2,
      action_3: this.projectTask.action3,
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    sendData() {
      const action1 = this.action_1
      const action2 = this.action_2
      const action3 = this.action_3
      const taskId = this.projectTask.task.id

      this.action_1 = ''
      this.action_2 = ''
      this.action_3 = ''
      
      this.$apollo.mutate({
        mutation: UPDATE_PROJECT_TASK_ACTION,
        variables: {
          taskId: taskId,
          status: false,
          action1: action1,
          action2: action2,
          action3: action3
        }
      }).then((data) => {
        // Result
        this.$router.push('/')
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.action_1 = action1
        this.action_2 = action2
        this.action_3 = action3
      })
    }
  }
}
</script>

<style scoped lang='scss'>

  .header-icon {
    position: absolute;
    left: 0.15rem;
    top: 1rem;
    font-size: 1.5rem;
    color: #555;
  }

</style>

