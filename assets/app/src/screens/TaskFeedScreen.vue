
<template>
  <div>
    <BaseWhitespace/>
    <BaseHeading :level="1">
      Aufgabenliste
    </BaseHeading>
    <div class='task-feed-tablehead'>
      <span class='task-feed-tablehead-label'>Aufgabe</span>
      <span class='task-feed-tablehead-label'>Status</span>
    </div>
    <div class='task-feed-list'>
    <div @click='goToTaskDetail(projectTask)' class='task-feed-item' v-for='projectTask in allProjectTasks' :key=projectTask.task.order>
      <span class='task-feed-item-text'>{{ projectTask.task.taskText }}</span>
      <span class='task-feed-item-status'>
        <i v-if="projectTask.status" style="font-size: 1.5rem; color: #95C23D" class='sl-icon icon-check'></i>
        </span>
    </div>

    <a style='align-self: center;margin-top: 1rem;' href='https://plattform.bewirken.org'>
    <BaseButton href='https://plattform.bewirken.org'>Videos für euer Projekt</BaseButton>
    </a>
    </div>
    <div class='show-challengeinfo-button' @click='goToChallengeInfo()'>
      <i class='sl-icon icon-pin show-challengeinfo-button-icon'></i>
    </div>

  </div>
</template>

<script>

// GraphQL
import ALL_PROJECT_TASKS from '../graphql/projectTasks/allProjectTasks.gql'

export default {
  name: 'task-feed-screen',
  components: {

  },
  data () {
    return {
      allProjectTasks: {}
    }
  },
  apollo: {
    allProjectTasks: {
      query: ALL_PROJECT_TASKS,
      fetchPolicy: 'cache-and-network',
    }
  },
  methods: {
    goToTaskDetail(projectTask) {
      this.$router.push({ name: 'task', params: { id: projectTask.task.id, projectTask }})
    },
    goToChallengeInfo() {
      this.$router.push('/challengeinfo')
    }
  }
}

</script>

<style scoped lang='scss'>

  .show-challengeinfo-button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 1.25rem;
    left: 1.25rem;
    height: 16vw;
    width: 16vw;
    background: $colorPrimary;
    border-radius: 50%;
    // border: 1px solid #ffffff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.25);

    &-icon {
      font-size: 1.9rem;
      padding-left: 2px;
      color: #ffffff;
    }
  }

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
      font-size: .8rem;
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
