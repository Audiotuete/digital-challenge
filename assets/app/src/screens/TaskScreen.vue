
<template>
  <div> 
    <TaskProblem v-if='tasktype == "ProjectTaskProblemType"' :projectTask='task'/>
    <TaskIdea v-else-if='tasktype == "ProjectTaskIdeaType"' :projectTask='task'/>
    <TaskAction v-else-if='tasktype == "ProjectTaskActionType"' :projectTask='task'/>
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
      projectName: '',
      projectDescription: '',
    }
  },
  methods: {
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
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$apollo.query({
  //     query: CURRENT_USER,
  //     // fetchPolicy: 'network-only'
  //   }).then((data) => {
  //     if(data.data.currentUser.currentProject) {
        
  //     }
  //   }).catch((error) => {
  //     vm.$router.push('/')
  //   })
  //   })   
  // }
}
</script>

<style scoped lang='scss'>

</style>
