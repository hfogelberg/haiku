<template lang="html">
  <div>
    <h1>Auth</h1>
    <form>
      <div>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" v-model="username">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="text" name="password" id="password" v-model="password">
      </div>
      <div>
        <button type="button" name="button" id="save" @click="signup">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
  let axios = require('axios');

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      signup() {
        alert('Signup');
        console.log(this.username + ' ' + this.password);

        axios.post('http://localhost:8080/api/users', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err)=> {
          console.log(err);
        });
      }
    }
  }
</script>

<style lang="css">
</style>
