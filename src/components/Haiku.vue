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
let {API_ROOT_URL} = require('../../config')

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
      let url = API_ROOT_URL + '/haiku';

      axios.get(url)
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
