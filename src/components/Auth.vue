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
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      signup() {
        console.log(username + ' ' + password);
      }
    }
  }
</script>

<style lang="css">
</style>
