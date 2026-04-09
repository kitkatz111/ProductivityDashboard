<script setup lang="ts">

import { ref } from 'vue'


</script>

<template>

  <button id="button_top">
    <slot></slot>
  </button>


</template>

<style scoped>


/* From Uiverse.io by Voxybuns */
button {
  --button_radius: 0.75em;
  --button_color: #e8e8e8;
  --button_outline_color: #000000;
  border: none;
  cursor: pointer;
  border-radius: var(--button_radius);
  background: var(--button_outline_color);
  display: block;
  box-sizing: border-box;
  border: 2px solid var(--button_outline_color);
  padding: 0.4em 0.8em;  /* Add this! */
  background: var(--button_color);
  color: var(--button_outline_color);
  transform: translateY(-0.2em);
  transition: transform 0.1s ease;
}

button:hover {
  transform: translateY(-0.33em);  /* Fixed selector */
}

button:active {
  transform: translateY(0);  /* Fixed selector */
}

</style>

