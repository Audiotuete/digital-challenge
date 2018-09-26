
<template>
  <div>
    <TaskProblem v-if="tasktype == 'TaskProblemType'" :task="task"/>
    <TaskIdea v-if="tasktype == 'TaskIdeaType'" :task="task"/>
    <TaskAction v-if="tasktype == 'TaskActionType'" :task="task"/>
  </div>
</template>

<script>
import Whitespace from '../components/layout/Whitespace'
import TaskProblem from '../components/tasks/TaskProblem'
import TaskIdea from '../components/tasks/TaskIdea'
import TaskAction from '../components/tasks/TaskAction'

import CURRENT_USER from '../graphql/users/currentUser.gql'

export default {
  name: 'task-screen',
  components: {Whitespace, TaskProblem, TaskIdea, TaskAction},
  data () {
    return {
      task: this.$route.params.projectTask,
      tasktype: this.$route.params.projectTask.__typename,
      showEnterCodeModal: false,
      showCreateSuccesModal: false,
      // ------
      inputIsFocused: false,
      projectName: "",
      projectDescription: "",
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
        this.$router.push("/taskfeed")

      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.projectCode = theProjectCode
      })
    },
    goToProjectFeed() {
      // this.$router.push("/taskfeed")
      console.log(this.projectTask)
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
        
      }
    }).catch((error) => {
      vm.$router.push("/")
    })
    })   
  },
}
</script>

<style scoped lang="scss">

.task-container {
    z-index: 50;
    font-size: 1rem;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    box-sizing: border-box;
    padding: 0 3vw 5vh 3vw;
  }

</style>
