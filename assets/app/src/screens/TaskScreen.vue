<template>
  <div> 
    <TaskProblem v-if='tasktype == "ProjectTaskProblemType"' :projectTask='task' class="container"/>
    <TaskIdea v-else-if='tasktype == "ProjectTaskIdeaType"' :projectTask='task' class="container"/>
    <TaskAction v-else-if='tasktype == "ProjectTaskActionType"' :projectTask='task' class="container"/>
  </div>
</template>

<script>
import Whitespace from '../components/layout/Whitespace'

import TaskProblem from '../components/tasks/TaskProblem'
import TaskIdea from '../components/tasks/TaskIdea'
import TaskAction from '../components/tasks/TaskAction'

export default {
  name: 'task-screen',
  components: {Whitespace, TaskProblem, TaskIdea, TaskAction},
  data () {
    return {
      task: this.$route.params.projectTask,
      tasktype: this.$route.params.projectTask.__typename,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(!vm.task) {
        vm.$router.push('/')
      }
    })
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

</style>
