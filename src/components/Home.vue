<template>
  <Header />
  <h1 class="hight">Hello {{ name }}, Welcome on Home Page</h1>
</template>
<script>
import Header from "./Header.vue";
export default {
  name: "Home",
  data(){
    return{
        name: ''
    }
  },
  components: {
    Header,
  },
  mounted(){
    let user = localStorage.getItem('user-info');
    this.name = JSON.parse(user).name;
  }
};
</script>

<style>
    .hight{
        margin-top: -400px;
        margin-left: 30%;
    }
</style>
