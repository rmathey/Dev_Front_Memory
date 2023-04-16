<template>
  <h1>Hello world</h1>
  <h1>Count: {{ store.count }}</h1>
  <h1>name {{ name }}</h1>
  <h1>doubleCount {{ doubleCount }}</h1>
  <button @click="increment">Cliquez ici</button>
  <button @click="decrement">Cliquez ici</button>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter.js';

const store = useCounterStore();
const { name, doubleCount } = storeToRefs(store);
const { increment, decrement } = store;
</script>