<template>
  <div class='navbar'>
    <div class='menu-container'>
      <router-link  to='/'><i class='fa fa-cog'></i></router-link>
      <router-link to='/'><i class='fa fa-stack-exchange'></i></router-link>
      <router-link to='/'><i class='fa fa-book'></i></router-link>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang='scss'>
.navbar {
  z-index: 1000;
  display: flex;
  justify-content: center;
  position: absolute;
  height: 10vh;
  width: 100%;
  background: rgba(255,255,255,1);
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.25);
}
.menu-container {
  width: 65vw;
  display: flex;
  padding-top: 1px;
  justify-content: space-around;
  align-items: center;
}

.fa {
  color: rgb(181, 181, 181);
  font-size: 7vw;

  &.fa-stack-exchange {
    font-size: 8vw;
    color: #7ED321
  }

  &:active :hover {
    color: green;
  }
}

</style>
