<template>
  <label>
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'form-label',
  // props: {
  //   size: {
  //     type: Number,
  //     required: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  label {
    align-self: flex-start;
    font-size: 0.6rem;
    margin-top: 0.4rem
  }
</style>


