<template>
<div class="container">
  <Whitespace/>
  <div class="header">
    <button class="header-icon" @click="back()"><i class="sl-icon icon-arrow-left"></i></button>
    {{task.taskText}}
  </div>
    <form id="form" class="form"  @submit.prevent="sendData()">
      <label class="label" for="username">1. Aktion</label>
      <input name="action-1" v-model="action_1" @focus="inputIsFocused = true" type="text" class="input">
      
      <label class="label" for="action-2">2. Aktion</label>
      <input name="action-2" v-model="action_2" @focus="inputIsFocused = true" type="text" class="input"/>

      <label class="label" for="action-3">3. Aktion</label>
      <input name="action-3" v-model="action_3" @focus="inputIsFocused = true" type="text" class="input"/>
     
      <button type="submit" form="form" class="button-send">Abschicken</button>
    </form>
    </div>
</template>

<script>
import Whitespace from '../layout/Whitespace'

import UPDATE_PROJECT_TASK_ACTION from '../../graphql/projectTasks/updateProjectTaskAction.gql'
import CURRENT_USER from '../../graphql/users/currentUser.gql'

export default {
  name: 'task-action',
  components: {Whitespace},
  props: {
    task: Object,
  }, 
  data () {
    return {
      inputIsFocused: false,
      action_1: '',
      action_2: '',
      action_3: '',
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    sendData() {
      const action1 = this.action_1
      const action2 = this.action_2
      const action3 = this.action_3
      const taskId = this.task.id

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
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
        this.action_1 = action1
        this.action_2 = action2
        this.action_3 = action3
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$apollo.query({
      query: CURRENT_USER,
      // fetchPolicy: 'network-only'
    }).then((data) => {

    }).catch((error) => {
      console.log(error)
    })
    })   
  }
}
</script>

<style scoped lang="scss">
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
    color: #E94F35;
    border-radius: 50%;
    border: 1px solid #E94F35;
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

  .label {
    align-self: flex-start;
    font-size: 0.6rem;
    margin-top: 0.4rem
  }

  .input {
    pointer-events: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 2.5rem;
    margin-top: 0.1rem;
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
    background: #E94F35;
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

