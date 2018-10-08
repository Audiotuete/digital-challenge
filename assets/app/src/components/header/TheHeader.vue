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

export default {
  name: 'the-header',
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
  position: fixed;
  z-index: 1000;
  display: flex;
  justify-content: center;
  height: 8vh;
  width: 100%;
  background: rgba(255,255,255,1);
  box-shadow: 0 0 4px 1px rgba(0,0,0,0.15);
}
.menu-container {
  width: 65vw;
  display: flex;
  padding-top: 5px;
  justify-content: space-around;
  align-items: center;
  line-height: 0;
}

.fa {
  color: rgb(181, 181, 181);
  font-size: 4vw;

  &.fa-stack-exchange {
    font-size: 4vw;
    color: #7ED321
  }

  &:active :hover {
    color: green;
  }
}

</style>
