<script setup>
import { ref, onMounted } from 'vue'
const time = ref('')
const year = ref('')
const month = ref('')
const day = ref('')
const week = ref('')
function updateTime() {
    const now = new Date();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    time.value = now.toLocaleTimeString();
    year.value = now.getFullYear()
    month.value = now.getMonth() + 1
    day.value = now.getDate()
    week.value = weekdays[now.getDay()]
}
updateTime()

</script>

<template>
    <div class="container">
        <p class="date">{{ year }}年{{ month }}月{{ day }}日 {{ week }} </p>
        <p class="time">{{ time }}</p>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #E1F5FE, #B3E5FC);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.date {
    font-size: 50px;
    font-weight: bold;
    display: block;
    color: #333333;
    margin-bottom: 10px;
}

.time {
    font-size: 40px;
    font-weight: bold;
    color: #333333;
}
</style>
