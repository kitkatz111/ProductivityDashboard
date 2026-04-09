<!-- src/App.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentDate = ref('');


const updateDate = () => {
  const now = new Date();
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const day = now.getDate()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const time = `0${hours}`.slice(-2) + ':' + `0${minutes}`.slice(-2)
  // splicing just as we did in stopwatch
  currentDate.value = `${time} ${day}/${month}/${year}`
  // updating value of ref element with the variables above
  // to make it reactive
}

let intervalId: number

onMounted(() => {
  updateDate()  // Initial set
  intervalId = setInterval(updateDate, 1000)  // Update every minute (or 1000 for seconds)
})

// onmounted lifecycle hook, waits until vue has created the elements in DOM,
// then runs your callbacks inside of it eg sets interval to updateDate()

onUnmounted(() => {
  clearInterval(intervalId)
})

</script>

<template>
  <div id="app">


      <div id="header">

        <h1>Productivity Dashboard</h1>
        <h2 id="time">{{ currentDate }}</h2>

      </div>

      <!-- Routed content (TabsWrapper) will render here -->
      <router-view>

      </router-view>



  </div>
</template>

<style scoped>

#app {
  background: lightgray;
  border-radius: 1rem;
  padding: 1rem;


  font-family: "Google Sans", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings:
      "GRAD" 0;
}

#header {
  justify-self: center;
}

</style>
