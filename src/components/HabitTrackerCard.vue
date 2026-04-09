<script setup lang="ts">

import { ref, onMounted, watch } from 'vue'

import Button from './Buttons.vue'
import Stopwatch from "@/components/Stopwatch.vue";

//define the interface TS structure
interface Habit {
  id: number;
  goal: string;
  hours: string;
}

const STORAGE_KEY = 'habitTrackerCard'

const data = ref<Habit[]>([])
// holds data to push to interfaced Habits

const message = ref('')

// holds the message

let counter = 0;


const selectedHabitId = ref<number | null>(null)

// specific vue function to render after initial finish
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) { // if there is a string in storage_key, use it otherwise skip.
    try {
      const parsed = JSON.parse(saved) as Habit[];
      data.value = parsed;
      // ensures that the data is parsed w/o error

      const maxId = parsed.reduce((max, h) => Math.max(max, h.id), 0);
      counter = maxId;

      // ensures that the ID matches with entered goals
    } catch (e) {
      console.log('failed to parse')
    }
  }
})

const addHabit = () => {
  if (message.value.trim() === '') return;
  counter++;

  data.value.push({
    id: counter,
    goal: message.value,
    hours: '0',
  })
// We use a storage key as local storage set item requires a key, value pair
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value))

  message.value = '';
}

const removeHabit = (id: number) => {

  data.value = data.value.filter(habit => habit.id !== id)
  // grabs value of data sets it to a filtered habit w/o habit

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value))
  counter--;

  // ensure that all of the IDs match with order in list

}

function formatTime(time: number) {
  //input number from time
  const minutes = `0${Math.floor(time / 60)}`.slice(-2)
  const seconds = `0${Math.floor(time % 60)}`.slice(-2)
  return `${minutes}:${seconds}`

  //slice reduces '012' to '12' replacing the extra 0 once it changes.
  // ensures proper time format to [12:12] instead of [012:012] during increment

}

const handleTimeStopped = (seconds: number) => {
  const habit = data.value.find(h => h.id === selectedHabitId.value)
  if (habit) {
    habit.hours = String(Number(habit.hours) + seconds) // update total
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value))
  }
}

</script>

<template>

  <div id="card">
    <h1>Habit & Time Tracker</h1>

    <div id="box-one">
      <table>
        <thead>
        <tr>
          <th>Selected</th>
          <th>Goal</th>
          <th>Total Time</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="habit in data" :key="habit.id">   <!--id provided for each habit-->
          <td><input type="radio" v-model="selectedHabitId" :value="habit.id"></td>
          <td>{{ habit.goal }}</td>
          <td>{{ formatTime(habit.hours) }}</td>
          <td><Button id='remove' @click="removeHabit(habit.id)">Remove</Button></td>
        </tr>
        <!-- Here we can change 'habit' to anything, essentially, v-for tells vue,
         take array (defined in script above) called DATA -> for every object
         temporarily call it habit and give access to its properties -->
        <tr>
          <td><Button @click="addHabit">+</Button></td>
          <td>
            <input

                v-model="message"
                type="text"
                placeholder="Enter goals here..."
                @keyup.enter="addHabit"

            />
            <!-- the v-model here is a two-way binding so that 'message' updates with
              the input form  -->
          </td>

        </tr>
        </tbody>
      </table>
    </div>


  </div>

    <Stopwatch
      :selectedGoal="data.find(h => h.id === selectedHabitId)?.goal ?? ''"
      @timeStopped="handleTimeStopped"
    />


  <!--Listening for event payload from emit in stopwatch a
      and fires time stopped function -->

</template>

<style>

#remove {
 background-color: red;
  border-radius: 1rem;
  padding: 0.5rem;
}

#card {
  background: #a1a1a1;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

}


th, td {
  padding: 7px;
  text-align: center;
}

input{

  border-color: #CCCCCC;
  background-color: #FFFFFF;
  color: #000000;
  border-style: solid;
  border-radius: 1rem;
  padding: 0.6rem;
  box-shadow: 0px 0px 12px rgba(66,66,66,.22);

}

</style>