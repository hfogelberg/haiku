<template lang="html">
  <div class="admin">
    <h1>Admin</h1>

    <form class="adminForm">
      <div>
        <label for="title">Title</label>
        <input type="text" name="title" id="title" v-model="title">
      </div>
      <div>
        <label for="image-path">Image path</label>
        <input type="text" name="image-path" id="image-path" v-model="imagePath">
      </div>
      <div>
        <label for="haiku">Haiku/verse</label>
        <textarea name="haiku" rows="4" id="haiku" cols="80" v-model="haiku"></textarea>
      </div>
      <div>
        <label for="comment">Comment</label>
        <textarea name="comment" rows="4" id="comment" cols="80" v-model="comment"></textarea>
      </div>
      <div>
        <label for='isPriority'>Prioritized</label>
        <input type="checkbox" id='isPriority' v-model='isPriority'>
      </div>
      <div>
        <label for='display'>Display</label>
        <input type="checkbox" class='display' v-model='display'>
      </div>
      <div>
        <button type="button" name="button" id="save" @click="save">Save</button>
      </div>

    </form>
  </div>
</template>

<script>
var axios = require('axios');

export default {
  data() {
    return {
      title: '',
      imagePath: '',
      haiku: '',
      comment: '',
      isPriority: false,
      display: true,
      created: new Date()
    }
  },
  methods: {
    save() {
      axios.post('http://localhost:8080/api/haiku',
      {headers: {'x-auth': this.$store.getters.token}},
      {
        title: this.title,
        imagePath: this.imagePath,
        haiku: this.haiku,
        comment: this.comment,
        isPriority: this.isPriority,
        display: this.display,
        created: this.created
      })
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      });
    }
  }
}
</script>

<style lang="css">
</style>
