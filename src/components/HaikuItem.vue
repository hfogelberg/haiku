<template lang="html">
  <div class="panel">
    <div class='header-container'>
      <h2>{{haiku.title}}</h2>
    </div>
    <div class='image-container'>
      <img class= 'artwork' :src="'http://res.cloudinary.com/ginkgo/image/upload/w_400,c_fill/' + haiku.imagePath" v-bind:alt="haiku.title">
       <!-- <span>
         <a class="btn-info" href="#open-modal"><img src='/assets/img/info.svg'></a>
        </span> -->
    </div>
    <div class='haiku-container'>
       <p class='haiku'>{{haiku.haiku}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['haiku']
}
</script>

<style lang="css">
.panel {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1em;
}

.header-container {
  flex: 0.2;
}

.image-container {
  flex: 0.6;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.haiku-container {
  flex: 0.2;
}

h2 {
  margin-top: 0.8em;
  text-align: center;
  font-size: 3.2em;
  color: rgba(52, 73, 94,0.8);
}

img.artwork{
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  margin: auto;
}

img {
  border-radius: 20px;
}

.haiku-container {
  white-space: pre-wrap;
}

p.haiku {
  font-size: 1.8em;
  text-align: center;
  color: ###95a5a6;
}

.btn-info {
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin-right: 10em;
}
</style>
