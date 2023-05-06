<script setup>
import { ref } from 'vue'
const time = ref('')
function updateTime() {
    const now = new Date();
    time.value = now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
</script>

<template>
    <h1>{{ time }}</h1>
</template>
