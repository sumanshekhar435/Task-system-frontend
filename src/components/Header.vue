<template>
  <div class="nav">
    <router-link to="/home">Home</router-link>
    <router-link to="/task">Task</router-link>
    <router-link to="/create-task">Add Task</router-link>
    <!-- <router-link to="/update-task">Update Task</router-link> -->
    <a
      v-on:click="logout"
      href="/home"
      style="margin-left: auto; margin-right: 150px"
      >Logout</a
    >
  </div>
</template>
<script>
export default {
  name: "Header",
  methods: {
    logout() {
      alert("Are You Sure ? You Want to Logout");
      localStorage.clear();
      this.$router.push({ name: "SignIn" });
    },
  },
};
</script>
<style>
.nav {
  display: flex;
  justify-content: space-between;
  /* margin-top: -110px !important; */
  margin-bottom: 600px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 100px;
  background-color: #333;
  width: 100%;
}

.nav a {
  margin: 0 10px;
  color: #fff;
  text-decoration: none; /* Remove underline */
}

.nav a:hover {
  text-decoration: underline;
  background-color: #333;
  color: #fff;
}
</style>
