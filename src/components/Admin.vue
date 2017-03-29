<template lang="html">
  <div class="admin">
    <form class="adminForm">
      <div>
        <label for="title">Title</label>
        <input type="text" name="title" id="title" v-model="title">
      </div>
      <div>
        <label for="image-path">Image path</label>
        <input type="text" name="image-path" id="image-path" v-model="imagePath" v-on:change="setImgUrl">
      </div>
      <div class='thumb'>
        <img :src="imageUrl" v-bind:alt="title">
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
if (process.env.NODE_ENV === 'development') {
  let root = 'http://localhost:8081/api/'
}

export default {
  data() {
    return {
      title: '',
      imagePath: '',
      imageUrl: '',
      haiku: '',
      comment: '',
      isPriority: false,
      display: true,
      created: new Date()
    }
  },
  mounted() {
    if (this.hasToken() === false) {
      this.$router.push('/auth')
    }
  },
  methods: {
    hasToken() {
      let token = localStorage.getItem('haikuToken');

      if (token) {
        console.log('Has Token');
        return true;
      } else {
        console.log('No token');
        return false;
      }
    },
    setImgUrl() {
      alert('setImgUrl')
      let root = 'http://res.cloudinary.com/ginkgo/image/upload/w_180/'
      this.imageUrl = root + this.imagePath
      alert(this.imageUrl)
    },
    save() {
      let token = localStorage.getItem('haikuToken');
      axios.defaults.headers.common ['x-auth']  = token
      axios.post(root + 'haiku', {
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
          this.title = '';
          this.imagePath = '';
          this.haiku = '';
          this.comment = '';
          this.isPriority = false;
          this.display = true;
          this.imageUrl = '';
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
