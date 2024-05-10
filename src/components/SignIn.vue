<template>
  <div class="sign-in-container">
    <span class="login_heading">Login</span>
    <div v-if="invalidCredentialsMessage" class="error-message" role="alert">
      Incorrect email or password. Please try again.
    </div>
    <form @submit.prevent="signin">
      <div class="signin">
        <input v-model="email" type="text" placeholder="Email" />
        <span class="error-message">{{ errors.email && errors.email[0] }}</span>
        <input v-model="password" type="password" placeholder="Password" />
        <span class="error-message">{{
          errors.password && errors.password[0]
        }}</span>
        <button type="submit">Sign In</button>
        <p class="signUp-btn">
          <RouterLink to="/sign-up">Sign Up</RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {}, // Initialize errors object
      invalidCredentialsMessage: "",
    };
  },
  methods: {
    async signin() {
      console.log("Username:", this.email);
      console.log("Password:", this.password);
      try {
        let result = await axios.post("http://127.0.0.1:8000/api/login", {
          email: this.email,
          password: this.password,
        });
        console.warn(result);

        if (result.status == 200) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem(
            "user-info",
            JSON.stringify(result.data.user_details)
          );
          this.$router.push({ name: "Home" });
        }
      } catch (error) {
        if (error.response && error.response.data.errors) {
          // If server responds with validation errors
          this.errors = error.response.data.errors;
        }
        if (
          error.response &&
          error.response.data.message === "Invalid credentials"
        ) {
          // If server responds with invalid credentials message
          this.invalidCredentialsMessage = error.response.data.message;
        }
      }
    },
  },
};
</script>
<style>
.sign-up-container {
  text-align: center;
}

.login_heading {
  display: block;
  margin-left: 45%;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  font-family: Arial, sans-serif;
}

.signin input {
  width: 320px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 35%;
  margin-right: auto;
  border: 1px solid skyblue;
}

.signin button {
  width: 320px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 35%;
  border: 1px solid skyblue;
  color: #fff;
  background-color: skyblue;
  cursor: pointer;
}
.signUp-btn {
  margin-left: 45%;
  margin-top: 15px;
}

.error-message {
  width: 320px;
  color: red;
  font-size: 14px;
  display: block;
  margin-left: 40%;
}
</style>
