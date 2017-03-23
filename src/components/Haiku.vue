<template lang="html">
  <div>
    <h1>Haiku</h1>

    <ul>
      <li v-for='image in images'>{{image.title}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      images: []
    }
  },
  created() {
    this.getImages()
  },
  methods: {
    getImages() {
      console.log('getImages');

      axios.get('http://localhost:8081/api/haiku')
          .then((res)=>{
            console.log(res);
            let data = res.data
            this.images = data.images
          })
          .catch((err)=>{
            console.log(err);
          })
    }
  }
}
</script>

<style lang="css">
</style>
