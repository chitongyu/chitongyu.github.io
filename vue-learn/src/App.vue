<!--
 * @Author: Lyle
 * @Date: 2020-05-12 22:45:24
 * @LastEditors: Lyle
 * @LastEditTime: 2020-05-19 20:44:54
 * @Description: 
 -->
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
	name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
