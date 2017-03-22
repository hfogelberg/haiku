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
        <button type="button" name="button" id="save" @click="login">Save</button>
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
      login() {
        axios.post('http://localhost:8081/api/users/login', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          let data = res.data;

          localStorage.setItem('haikuUserName', this.username);
          localStorage.setItem('haikuUserId', data.userId);
          localStorage.setItem('haikuToken', data.token);

          let payload = {
            token: data.token,
            userName: this.username,
            userId: data.userId
          }

          this.$store.dispatch('setUser', payload);
          this.$router.push('/admin');
        })
        .catch((err)=> {
          console.log(err);
        });
      },

      signup() {
        axios.post('http://localhost:8081/api/users', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          let data = res.data;

          localStorage.setItem('haikuUserName', this.username);
          localStorage.setItem('haikuUserId', res.data.userId);
          localStorage.setItem('haikuToken', res.data.token);

          let payload = {
            token: token,
            userName: this.username,
            userId: userId
          }

          this.$store.dispatch('setUser', payload);
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
