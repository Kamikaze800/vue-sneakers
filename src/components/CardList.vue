<script setup>
import Card from './Card.vue';
defineProps({
  items: Array,
});
const onClickAdd = () => {
  alert('add');
}
</script>
<template>
 <div class="grid grid-cols-4 gap-5 mb-8">
        <Card
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :imageUrl="item.imageUrl"
        :price="item.price"
        :onClickAdd="onClickAdd"
        />

      </div>
</template>
