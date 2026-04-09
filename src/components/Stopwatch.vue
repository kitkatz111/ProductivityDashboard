<script setup lang="ts">
import { ref } from "vue";
import Button from '@/components/Buttons.vue'


// advertising what the child (this stopwatch vue) accepts below is time carry over to habits

const props = defineProps<{
  selectedGoal: string
}>()

const emit = defineEmits<{
  timeStopped: [seconds: number]
}>()

const time = ref(0);
// stores active state

const state = ref<"stopped" | "running" | "paused">("stopped")
// keeps track of constant state so the buttons below use v-if to change their visibility based on it

//time and state refs managed here -> move

const interval = ref<number | undefined>(undefined);
// interval is undefined or a number < | > notation


function start() {
state.value = "running";
  interval.value = setInterval(() => {
    time.value++;
  }, 1000)
const clicked = ref(true)
// delay execution to every 1 second

}

function Stop() {
  clearInterval(interval.value)
  state.value = 'paused';
  emit('timeStopped', time.value)
}

function restart() {
  time.value = 0;
  if (interval.value !== undefined) {
    clearInterval(interval.value)
    interval.value = undefined;
    state.value = "stopped";

  }
  state.running = true;

}

function formatTime(time: number) {
  //input number from time
  const minutes = `0${Math.floor(time / 60)}`.slice(-2)
  const seconds = `0${Math.floor(time % 60)}`.slice(-2)
  return `${minutes}:${seconds}`

  //slice reduces '012' to '12' replacing the extra 0 once it changes.
  // ensures proper time format to [12:12] instead of [012:012] during increment

}

function dragElement() {

}


//output time with interpolation
</script>

<template>
  <div id="clock" @click="dragElement">

    <span id="time">{{ formatTime(time)}}</span>

    <div id="btn-container">
      <Button id="start"  v-if="state === 'stopped'"  @click="start">Start</Button>
      <Button id="stop"   v-if="state === 'running'" @click="Stop">Stop</Button>
      <Button id="resume"   v-if="state === 'paused'" @click="start">Resume</Button>
      <Button id="reset"  v-if="state === 'running' || state ==='paused'" @click="restart">Reset</Button>

    </div>

  </div>
</template>

<style>

#time {
  font-size: 2rem;
}

#clock {
  background: #616161;
  width: 20%;
  height: 20%;
  justify-self: center;
  border-radius: 1rem;

}

#btn-container, #time{
  justify-self: center;
  display: flex;
  gap: 1rem;
  padding:1rem;
}


</style>

