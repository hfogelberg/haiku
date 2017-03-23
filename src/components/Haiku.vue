<template lang="html">
  <div>
    <appHeader></appHeader>
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
import Header from './Header.vue'

export default {
  components: {
    'appHeader': Header,
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

      axios.get('http://localhost:8081/api/haiku')
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
