<template lang="html">
  <div class='auth'>
    <form>
      <div>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" v-model="username">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="text" name="password" id="password" v-model="password">
      </div>
      <div class='button-container'>
        <button type="button" name="button" @click="login" class='btn btn-login'>Login</button>
        <button type="button" name="button" @click="signup" class='btn btn-signup'>Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
  let axios = require('axios');
  let {API_ROOT_URL} = require('../../config')

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        let url = API_ROOT_URL + '/users/login';
        console.log(url);

        axios.post(url, {
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
          alert(err)
          console.log(err);
        });
      },

      signup() {
        axios.post(root + '/users/signup', {
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
  .auth {
    margin-top: 8em;
  }

  form {
    width: 80%;
    margin: 0 auto;
  }

  .btn {
    margin-top: 1em;
    margin-left: 0.5em;
    font-size: 1.3em;
    margin-left: 11ch;
    height: 2em;
    width: 10ch;
    color: #ecf0f1;
    border-radius: 10px;
  }

  .btn-login {
    background-color: #f39c12;
    margin-right: 0.7em;
  }

  .btn-signup {
    background-color: #2ecc71;
  }
</style>
