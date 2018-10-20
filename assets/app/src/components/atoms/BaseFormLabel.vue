<template>
  <label class="label">
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'base-form-label',
  // props: {
  //   size: {
  //     type: Number,
  //     required: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  .label {
    align-self: flex-start;
    font-size: 0.75rem;
    margin-top: 0.4rem;
    margin-bottom: 0.1rem;
  }
</style>


