<template>
  <Header />
  <div class="add-task-container">
    <span class="success-message" v-if="successMessage">{{
      successMessage
    }}</span>
    <span class="error-message" v-if="errorMessage.task">{{
      errorMessage.task
    }}</span>
    <form @submit.prevent="addTask">
      <div class="add-task">
        <label for="user" class="lable_class">User</label>
        <select v-model="selectedUser">
          <option disabled value="">Select User</option>
          <option v-for="user in allUsers" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
        <span class="error-message" v-if="errorMessage.user_id">
          The user field is required</span
        >
        <label for="title" class="lable_class">Title</label>
        <input v-model="title" type="text" placeholder="Enter Title" />
        <span class="error-message">{{
          errorMessage.title && errorMessage.title[0]
        }}</span>
        <label for="status" class="status">Status</label>
        <select v-model="selectedStatus">
          <option disabled value="">Select Status</option>
          <option value="0">Pending</option>
          <option value="1">Complete</option>
        </select>
        <span class="error-message">{{
          errorMessage.status && errorMessage.status[0]
        }}</span>
        <label for="deadline" class="deadline">Deadline</label>
        <input v-model="deadline" type="date" placeholder="Deadline" />
        <span class="error-message">{{
          errorMessage.deadline && errorMessage.deadline[0]
        }}</span>
        <label for="description" class="description">Description</label>
        <textarea v-model="description" placeholder="Description"></textarea>
        <span class="error-message">{{
          errorMessage.description && errorMessage.description[0]
        }}</span>
        <button type="submit" :disabled="formSubmitted">Sign In</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import Header from "./Header.vue";
export default {
  name: "AddTask",
  components: {
    Header,
  },
  data() {
    return {
      formSubmitted: false,
      allUsers: [],
      selectedUser: "",
      title: "",
      title: "",
      description: "",
      desc: "",
      selectedStatus: "",
      deadline: "",
      errorMessage: {},
      successMessage: "",
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      // Fetch users data with authentication token
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User not authenticated.");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.allUsers = response.data.users;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async addTask() {
      this.formSubmitted = true;
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User not authenticated.");
        return;
      }

      try {
        let result = await axios.post(
          "http://127.0.0.1:8000/api/v1/tasks",
          {
            user_id: this.selectedUser,
            title: this.title,
            description: this.description,
            status: this.selectedStatus,
            deadline: this.deadline,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Task added successfully!");
        if (result.status == 201) {
          this.successMessage = result.data.message;
          console.log(result.data.message);
          this.$router.push({ name: "Task" });
        }
      } catch (error) {
        console.error("Error adding task:", error.response.data);
        this.errorMessage = error.response.data.error;
      } finally {
        this.formSubmitted = false;
      }
    },
  },
};
</script>
<style>
.hhh {
  margin-top: -400px;
}
</style>
<style>
.add-task-container {
  text-align: center;
  margin-top: -570px;
}

.heading {
  display: block;
  margin-left: 45%;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  font-family: Arial, sans-serif;
}

.add-task label {
  /* margin-left: -280px; */
  font-size: 16px;
  color: skyblue;
}
.status{
    margin-left: -280px !important;
}

.deadline{
    margin-left: -260px !important;
}

.description{
    margin-left: -240px !important;
}

.lable_class{
    margin-left: -290px;
}

.add-task input,
.add-task textarea,
.add-task select {
  width: 320px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 472px;
  margin-right: auto;
  border: 1px solid skyblue;
}
.add-task button {
  width: 320px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  /* margin-left: -57px; */
  border: 1px solid skyblue;
  color: #fff;
  background-color: skyblue;
  cursor: pointer;
}
.error-message {
  width: 320px;
  color: red;
  font-size: 14px;
  display: block;
  margin-left: 400px !important;
}
.success-message {
  width: 320px;
  color: green;
  font-size: 14px;
  display: block;
  margin-left: 472px;
}
</style>
