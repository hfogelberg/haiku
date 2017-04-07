<template lang="html">
  <div class="admin">
    <header>
      <h2>Admin</h2>
      <div class='toolbar'>
        <router-link to='/newhaiku' class='new-haiku'><img src="/assets/img/plus.svg" alt="New"></router-link>
      </div>
    </header>
    <table>
      <thead>
        <tr>
          <td></td>
          <td></td>
          <td>Prioriterad</td>
          <td>Visas</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for='haiku in haikus'>
          <td>
            <img class= 'artwork' :src="'http://res.cloudinary.com/ginkgo/image/upload/w_80,c_fill/' + haiku.imagePath" v-bind:alt="haiku.title">
          </td>
          <td>{{haiku.title}}</td>
          <td>
            <img src="/assets/img/checkmark.svg" alt="Priority" v-if="haiku.isPriority">
          </td>
          <td>
            <img src="/assets/img/checkmark.svg" alt="Priority" v-if="haiku.display">
          </td>
          <td><img src='/assets/img/pencil.svg' alt='Edit'></td>
          <td><img src='/assets/img/trashcan.svg' alt='Trash can'></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
let {API_ROOT_URL} = require('../../config')

export default {
  data() {
    return {
      haikus: []
    }
  },
  mounted() {
    if (this.hasToken() === false) {
      this.$router.push('/auth')
    } else {
      this.getImages();
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

<style lang="css" scoped>
  header {
    width: 100vw;
    height: 16vh;
    position: absolute;
    top: 10vh;
  }

  h2 {
    text-align: center;
    font-size: 3em;
  }

  .toolbar {
    position: absolute;
    right: 2em;
    bottom: 0;
  }

  table {
    position: absolute;
    top: 28vh;
    width: 70vw;
    left: 15vw;
    right: 15vw;
    margin: auto;
  }

  thead {
    font-weight: 300;
    font-size: 1.3em;
  }

  tbody {
    font-size: 1.3em;
  }
</style>
