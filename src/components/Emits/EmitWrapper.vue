<script setup>
import Button from './Button.vue'
import { ref } from 'vue'
import Text from './Text.vue'

let fontSize = ref(16)

function recieveFontSize(sizeFromButton) {
  fontSize.value = sizeFromButton
  console.log(fontSize.value)
}
</script>
<template>
  <Button @sendFontSize="recieveFontSize"></Button>
  <Text :size="fontSize"></Text>
</template>
