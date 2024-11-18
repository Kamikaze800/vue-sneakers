<script setup>
const emit = defineEmits(['sendFontSize'])
const fontSize = 30

function sendData() {
  console.log(emit('sendFontSize', fontSize))
  console.log('signal sended')
}
</script>
<template>
  <button @click="sendData">Я кнопка</button>
</template>
