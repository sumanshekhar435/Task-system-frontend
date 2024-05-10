<template>
  <Header />
  <div class="update-task-container">
    <span class="success-message" v-if="successMessage">{{
      successMessage
    }}</span>
    <span class="error-message" v-if="errorMessage.task">{{
      errorMessage.task
    }}</span>
    <form @submit.prevent="updateTask">
      <div class="update-task">
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
        <button type="submit" :disabled="formSubmitted">Update Task</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import Header from "./Header.vue";

export default {
  name: "UpdateTask",
  components: {
    Header,
  },
  data() {
    return {
      allUsers: [],
      selectedUser: "",
      title: "",
      description: "",
      selectedStatus: "",
      deadline: "",
      errorMessage: {},
      successMessage: "",
      formSubmitted: false,
    };
  },
  mounted() {
    this.fetchUsers();
    this.fetchTaskDetails(); // Fetch task details when the component is mounted
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
    async fetchTaskDetails() {
      const taskId = this.$route.params.id;
      console.log(taskId);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User not authenticated.");
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const task = response.data;
        console.log(response.data);
        this.selectedUser = task.user_id;
        this.title = task.title;
        this.description = task.description;
        this.selectedStatus = task.status;
        const datetimeString = task.deadline;
        const date = new Date(datetimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDeadline = `${year}-${month}-${day}`;
        this.deadline = formattedDeadline;
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    },
    async updateTask() {
      const taskId = this.$route.params.id; // Get the task ID from the route params
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User not authenticated.");
        return;
      }

      try {
        this.formSubmitted = true; // Set formSubmitted to true to disable the button

        const response = await axios.put(
          `http://127.0.0.1:8000/api/v1/tasks/${taskId}`,
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

        if (response.status === 200) {
          this.successMessage = "Task updated successfully!";
          // Redirect to the task page after a short delay
          setTimeout(() => {
            this.$router.push({ name: "Task" });
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.error;
        } else {
          console.error("Error updating task:", error);
        }
      } finally {
        this.formSubmitted = false; // Reset formSubmitted to false
      }
    },
  },
};
</script>
<style>
.update-task-container {
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

.update-task label {
  /* margin-left: -280px; */
  font-size: 16px;
  color: skyblue;
}
.status {
  margin-left: -280px !important;
}

.deadline {
  margin-left: -260px !important;
}

.description {
  margin-left: -240px !important;
}

.lable_class {
  margin-left: -290px;
}

.update-task input,
.update-task textarea,
.update-task select {
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
.update-task button {
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
