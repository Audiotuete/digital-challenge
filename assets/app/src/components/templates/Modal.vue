<template>
  <div class='modal'>
    <div class="overlay" @click='$emit("close", $event.target.value)'></div>
    <div class='card'>
      <div class='modal-content-container'>
          <button v-if='closebutton' class='modal-header-icon' @click='$emit("close", $event.target.value)'>
            <i class='sl-icon icon-close'></i>
          </button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    closebutton: {
      type: Boolean,
      default: true,
      required: false
    },
  }
}
</script>


<style lang='scss' scoped>

.modal {
  display: flex; 
  justify-content:center;
}

.overlay {
  top: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
}

.card {
  position: absolute;
  width: calc(65% * 1.35);
  display: flex;
  top: 16vh;
  justify-content: center;
  align-items: center;  
  background-color: #fff;
  border-radius: 1.5vh;
  box-shadow: 0 0 15px 0 $colorPrimary;
  overflow: hidden;
  padding-bottom: 1rem;

  .modal-content-container {
    z-index: 0;
    font-size: 1rem;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    box-sizing: border-box;
    padding: 3vh 3vw 4vh 3vw;
  }

  .modal-header-icon {
    position: absolute;
    right: 0.15rem;
    top: 0.5rem;
    font-size: 1.5rem;
    color: #555;
  }

  
}



</style>

