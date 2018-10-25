<template>
  <button 
    class='button'
    v-bind="$attrs"
    v-on="inputListeners"
  >
    <slot>-</slot>
  </button>
</template>

<script>
export default {
  name: 'base-button',
  inheritAttrs: true,
  computed: {
    inputListeners: function () {
      var vm = this
      return Object.assign({},
        this.$listeners,
        { click: function (event) {vm.$emit('click', event.target.value)} }
      )
    }
  },
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


