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
        axios.post('http://localhost:8080/api/users', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          console.log(res);
          let data = res.data;
          let token = data.token;
          let userId = data.userId;

          console.log('Token: ' + token);
          console.log('UserId:  ' + userId);

          localStorage.setItem('haikuUserName', this.username);
          localStorage.setItem('haikuUserId', userId);
          localStorage.setItem('haikuToken', token);

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
