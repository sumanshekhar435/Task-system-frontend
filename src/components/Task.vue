<template>
  <Header />
  <div class="task-page" id="hig">
    <!-- <h1>Task</h1> -->
    <span class="success-message" v-if="successMessage">{{
      successMessage
    }}</span>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iterate through tasks and display each task in a row -->
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.status }}</td>
          <td>
            <!-- Add action buttons here (e.g., edit, delete) -->
            <router-link :to="{ name: 'UpdateTask', params: { id: task.id } }"
              >Edit</router-link
            >
            <a href="" @click="deleteTask(task.id)" style="color: red">
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
export default {
  name: "Task",
  data() {
    return {
      tasks: [],
      successMessage: "",
    };
  },
  components: {
    Header,
  },
  mounted() {
    // Fetch tasks data when the component is mounted
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      // Fetch tasks data with authentication token
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User not authenticated.");
        return;
      }

      await axios
        .get("http://127.0.0.1:8000/api/v1/tasks", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        })
        .then((response) => {
          // Set the fetched tasks to the tasks array
          this.tasks = response.data;
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    },
    async deleteTask(taskId) {
      // Confirm with the user before deleting the task
      const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
      );
      if (!confirmDelete) return;

      // Delete the task with the specified ID
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User not authenticated.");
          return;
        }
        let result = await axios.delete(
          `http://127.0.0.1:8000/api/v1/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Remove the deleted task from the tasks array
        if (result.status == 200) {
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
          this.successMessage = result.data.message;
          setTimeout(() => {
            this.successMessage = "";
          }, 3000);
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
  },
};
</script>

<style>
.task-page {
  width: 85%;
  padding: 20px;
  margin-left: 6%;
}

#hig {
  margin-top: -600px;
}

.table {
  width: 100% !important;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
}

.btn {
  margin-right: 10px;
}

.success-message {
  width: 320px;
  color: green;
  font-size: 18px !important;
  display: block;
  margin-left: 420px !important;
}
</style>
