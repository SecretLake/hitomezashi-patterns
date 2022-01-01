<template>
  <div id="app">
    <HitomezashiPatterns />
  </div>
</template>

<script>
import HitomezashiPatterns from "@/components/HitomezashiPatterns";
export default {
  name: 'App',
  components: {
    HitomezashiPatterns
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>