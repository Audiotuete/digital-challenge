<template>
  <div class="footer">
    <div class="menu-container">
      <a class="footer-link">Datenschutz</a>
      |
      <a class="footer-link">Impressum</a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  height: 10vh;
  width: 100%;

}
.menu-container {
  width: 35vw;
  display: flex;
  padding-top: 1px;
  font-size: 0.65rem;
  justify-content: space-around;
  align-items: center;

  .footer-link {
    color: #323232
  }
}


</style>
