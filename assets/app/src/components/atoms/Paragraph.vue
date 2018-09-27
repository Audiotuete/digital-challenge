<template>
  <p class='paragraph'>
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'paragraph',
  // props: {
  //   size: {
  //     type: Number,
  //     required: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  p {
    margin: 0rem 1.25rem 0 1.25rem;
    font-size: 0.8rem;
    text-align: center;
    color: #555555;
    line-height: 1.3;
    font-weight: 500;
  }
</style>


