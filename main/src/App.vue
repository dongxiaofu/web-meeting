<template>
  <div id="app" style="height: 100%">
    <router-view/>
  </div>
</template>


<style lang="scss">
@import "../static/css/base";
</style>

<script>
  export default {
      data() {
          return {
              name: '111'
          }
      },
      mounted() {
          this.$bus.$on('busClick', _ => {
              console.log('app', this);
          });
      }
  }
</script>
