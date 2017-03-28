<template lang="html">
  <div>
    <div id="wrapper">
      <ul>
        <li v-for='haiku in haikus'><haikuItem :haiku='haiku'></haikuItem></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HaikuItem from './HaikuItem.vue';
let port = process.env.PORT || 8081;

export default {
  components: {
    'haikuItem': HaikuItem
  },
  data(){
    return {
      haikus: []
    }
  },
  created() {
    this.getImages()
  },
  methods: {
    getImages() {
      console.log('getImages');

      axios.get(port + '/api/haiku')
          .then((res)=>{
            console.log(res);
            let data = res.data
            this.haikus = data.images
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
