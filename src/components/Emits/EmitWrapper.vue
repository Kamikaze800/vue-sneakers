<script setup>
import Button from './Button.vue';
import { ref } from 'vue';

let fonstSize = ref(16)

function recieveFontSize(sizeFromButton) {
  fonstSize.value = sizeFromButton
}
</script>
<template>
<Button @sendFontSize="recieveFontSize"> </Button>
</template>
