<template>
  <button class='button'>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button',
  // props: {
  //   size: {
  //     type: Number,
  //     required: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>

  .button {
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


