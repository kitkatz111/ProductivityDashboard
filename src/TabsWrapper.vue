<!-- src/TabsWrapper.vue -->
<script setup lang="ts">

import Button from './components/Buttons.vue'
import Card from './components/Cards.vue';
import HabitTrackerCard from "@/components/HabitTrackerCard.vue";

import { ref, onMounted } from 'vue'

const activeIndex = ref(0)

const activeCard = (index: number) => {
  activeIndex.value = index;
  // ensures the index tab is the card that is active
}


//localstorage function

interface todo {
  id: number;
  name: string;
}

const STORAGE_KEY = 'todo'
const data = ref<todo[]>([]) // uses interface as template for array
let counter = 0;

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) { // if there is a string in storage_key, use it otherwise skip.
    try {
      const parsed = JSON.parse(saved) as todo[];
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

// to-do logic

const itemName = ref('')
function addItem() {
    if (itemName.value.trim() !== "") {

      counter++;

      data.value.push({
        id: counter,
        name: itemName.value,
      })

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value))

    }
    itemName.value = '';
}

const removeToDo = (id: number) => {
  data.value = data.value.filter(todo => todo.id !== id)
  // grabs value of data sets it to a filtered object

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value))


}


</script>

<template>
  <div>
    <div id="buttons">
      <Button @click="activeCard(0)">Habit Tracker</Button>
      <Button @click="activeCard(1)">Notepad</Button>
      <Button @click="activeCard(2)">To-do List</Button>
    </div>
    <!--
    buttons clicked decides which tab to display, no need for hiding
    css classes, Cards are set for active index to match page tabs for each button
     -->
    <div id="cards">

      <HabitTrackerCard v-show="activeIndex === 0" />


      <Card v-show="activeIndex === 1">
        <template #title>Notepad</template>
        <template #box-one><textarea id="notepadBox"/></template>

      </Card>

      <Card v-show="activeIndex === 2">
        <template #title>To-Do List</template>
        <template #box-one>
          <input type="text" v-model="itemName" @keyup.enter="addItem">
          <button type="submit" @click="addItem">+</button>

          <!--Displays the to-do list from todo array, need to display from local storage -->
          <ul>
            <li v-for="todo in data" id="todoresults">
              {{todo.id}}. {{ todo.name }}
              <Button id="remove" @click="removeToDo(todo.id)">remove</Button>
            </li>

          </ul>
        </template>

      </Card>


    </div>



  </div>
</template>

<style>
#cards {
  padding-top: 2rem;
}

#notepadBox {
  border-radius: 1rem;
  field-sizing: content;
  min-width: 10rem;
  max-width: 10rem;
  min-height: 10rem;

}

#todoresults {
  display:flex;
  flex-direction: row;
  margin: 1rem;
  align-items: center;
}

#remove {
  margin-left: 1rem;
  padding: 0.2rem;
}

#box-one > textarea {
  height: 5rem;


}

#cards {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

#buttons {
  justify-self: center;
  display: flex;
  gap: 1rem;
  padding:rem;
}

</style>
