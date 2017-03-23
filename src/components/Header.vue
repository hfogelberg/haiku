<template lang="html">
  <header>
      <ul>
        <li>
          <h1>Helenas Haiku</h1>
        <li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </header>
</template>


<style lang="css">
  header {
    position: fixed;
    top:0;
    width: 100%;
    height: 4em;
    background-color: rgba(127, 140, 141,0.6);
    color: rgba(236, 240, 241,1.0);
  }

  header h1 {
    font-size: 1.6em;
  }

  header ul {
    margin-left: 1em;
    margin-right: 1em;
    list-style: none;
    display: flex;
    line-height: 4em;
  }

  li {
    flex: 0 0 auto;
    margin: 0.2em;
  }

  li:nth-child(1) {
    margin-right: auto;
  }
</style>
