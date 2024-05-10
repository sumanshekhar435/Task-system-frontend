<template>
  <div class="sign-up-container">
    <span v-if="successMessage" class="success-message">{{
      successMessage
    }}</span>
    <span class="heading">Sign Up</span>
    <form @submit.prevent="register">
      <div class="register">
        <input v-model="username" type="text" placeholder="Username" />
        <span class="signUp-error-message">{{
          errors.name && errors.name[0]
        }}</span>
        <input v-model="email" type="text" placeholder="Email" />
        <span class="signUp-error-message">{{
          errors.email && errors.email[0]
        }}</span>
        <input v-model="password" type="password" placeholder="Password" />
        <span class="signUp-error-message">{{
          errors.password && errors.password[0]
        }}</span>
        <input
          v-model="password_confirmation"
          type="password"
          placeholder="Confirm Password"
        />
        <span class="signUp-error-message">{{
          errors.password_confirmation && errors.password_confirmation[0]
        }}</span>
        <button type="submit">Register</button>
        <p class="sign-btn">
          <RouterLink to="/">Login</RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: {},
      successMessage: "",
    };
  },
  methods: {
    async register() {
      console.log("Username:", this.username);
      console.log("Password:", this.password);

      try {
        let result = await axios.post("http://127.0.0.1:8000/api/register", {
          name: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });

        console.warn(result);

        if (result.status == 201) {
          // localStorage.setItem(
          //   "user-info",
          //   JSON.stringify(result.data.user_details)
          // );
          this.successMessage =
            "Registration successful! Redirecting to sign-in page...";
          // Redirect to sign-in page after a delay
          setTimeout(() => {
            this.$router.push({ name: "SignIn" });
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.data.errors) {
          // If server responds with validation errors
          this.errors = error.response.data.errors;
          console.log(this.errors);
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

.heading {
  display: block;
  margin-left: -5% !important;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  font-family: Arial, sans-serif;
}

.register input {
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

.register button {
  width: 320px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: -5%;
  border: 1px solid skyblue;
  color: #fff;
  background-color: skyblue;
  cursor: pointer;
}
.sign-btn {
  margin-left: -5% !important;
  margin-top: 15px;
}

.signUp-error-message {
  width: 320px;
  color: red;
  font-size: 14px;
  display: block;
  margin-left: 30% !important;
}
</style>
