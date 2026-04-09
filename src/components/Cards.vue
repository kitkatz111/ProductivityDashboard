<script setup lang="ts">



</script>

<template>

    <div id="card">
      <h1><slot name="title"></slot></h1>
      <div id="box-one"><slot name="box-one"></slot></div>
      <div id="box-two"><slot name="box-two"></slot></div>
      <div id="box-three"><slot name="box-three"></slot></div>
    </div>

</template>

<style>

#card {
  background: #a1a1a1;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;


}

</style>