
<template>
  <div>
    <Whitespace/>
    <Heading :level="1">
      Aufgabenliste
    </Heading>
    <div class='task-feed-tablehead'>
      <span class='task-feed-tablehead-label'>Aufgabe</span>
      <span class='task-feed-tablehead-label'>Status</span>
    </div>
    <div class='task-feed-list'>
    <div @click='goToTaskDetail(projectTask)' class='task-feed-item' v-for='projectTask in allProjectTasks' :key=projectTask.task.order>
      <span class='task-feed-item-text'>{{ projectTask.task.taskText }}</span>
      <span class='task-feed-item-status'>{{ projectTask.status }}</span>
    </div>

    <a style='align-self: center;margin-top: 1rem;' href='https://plattform.bewirken.org'>
    <button href='https://plattform.bewirken.org' type='submit' class='task-feed-button-send'>
      Videos für euer Projekt
    </button>
    </a>
    </div>
  </div>
</template>

<script>
import Heading from '../components/atoms/Heading'
import Whitespace from '../components/layout/Whitespace'

import ALL_PROJECT_TASKS from '../graphql/projectTasks/allProjectTasks.gql'
import CURRENT_USER from '../graphql/users/currentUser.gql'

export default {
  name: 'task-feed-screen',
  components: {
    Heading,
    Whitespace
  },
  data () {
    return {
      allProjectTasks: []
    }
  },
  apollo: {
    allProjectTasks: {
      query: ALL_PROJECT_TASKS,
      fetchPolicy: 'cache-and-network',
    }
  },
  methods: {
    goToTaskDetail (projectTask) {
      this.$router.push({ name: 'task', params: { projectTask }})
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$apollo.query({
      query: CURRENT_USER,
      fetchPolicy: 'network-only'
    }).then((data) => {
      if(!data.data.currentUser.currentProject) {
        vm.$router.push('/registerproject')
      }
    }).catch((error) => {
      vm.$router.push('/')
    })
    })   
  }
}

</script>

<style scoped lang='scss'>

  .task-feed-whiteroom {
    height: 16vh;
  }

  .task-feed-header {
    display: flex;
    text-align: center;
    margin: 0 1rem 1rem 1rem;
    font-size: 1.1rem;
    font-weight: 300;
  }

  .task-feed-tablehead {
    font-size: .75rem;
    font-weight: 600;
    padding-bottom: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;

    .task-feed-tablehead-label {
      margin: 0 0.5rem 0 0.5rem;
    }
  }

  .task-feed-list {
    display: flex;
    width: 95%;
    flex-direction: column;

    .task-feed-item {
      display: flex;
      font-size: .75rem;
      align-items: center;
      justify-content: flex-start;
      text-align: left;
      height: 4.5rem;
      border-bottom: 1px solid #dddddd;

      .task-feed-item-text{
        flex: 8;
        padding: 0 2rem 0 0.25rem;
      }
      .task-feed-item-status{
        flex: 1;
        padding-right: 0.25rem;
      }
    }
  }

  .task-feed-text {
    margin: 0rem 1.25rem 0 1.25rem;
    font-size: 0.8rem;
    text-align: center;
    color: #555555;
    line-height: 1.3;
    font-weight: 500;
  }

  .task-feed-show-question {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 7vh;
    right: 6vw;
    height: 10vw;
    width: 10vw;
    background: #fff;
    color: $colorPrimary;
    border-radius: 50%;
    border: 1px solid $colorPrimary;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
  }

  .task-feed-input {
    pointer-events: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    width: 65%;
    margin-top: 1rem;
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

  .task-feed-button-send {
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

</style>
