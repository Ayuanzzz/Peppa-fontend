<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { login } from '@/api/login'
import { asyncRoutes } from '@/router';
import { filterAsyncRoutes } from '@/utils/router';


const router = useRouter()

const loginForm = reactive({
    username: '',
    password: ''
})

const saveUserData = (data) => {
    const userData = {
        id: data.id,
        name: data.name,
        roles: [data.role]
    }
    localStorage.setItem('userData', JSON.stringify(userData))
}


const validateLogin = (name, password) => {
    let data = {
        name: name,
        password: password
    }

    login(data).then(res => {
        if (res.status == 200) {
            saveUserData(res)
            userInfo.getUserData()
            accessRoutes([res.role])
            router.push({ path: '/' })
        } else {
            ElMessage({
                message: res.message,
                type: 'warning',
            })
        }
    })
        .catch(err => {
            console.log(err);
        })
}

// 根据role过滤路由
const accessRoutes = (roles) => {
    console.log(roles);
    const routes = filterAsyncRoutes(asyncRoutes, roles)
    localStorage.setItem("accessRoutes", JSON.stringify(routes))
}

const handleLogin = () => {
    // 处理登录逻辑
    validateLogin(loginForm.username, loginForm.password)
}
</script>

<template>
    <div class="container">
        <div class="wrapper">
            <p class="title">项目管理系统</p>
            <el-form @submit.native.prevent="handleLogin">
                <el-form-item prop="username">
                    <el-input v-model.trim="loginForm.username" placeholder="请输入用户名" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model.trim="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-button type="primary" native-type="submit" style="width: 100px">登录</el-button>
            </el-form>
            <el-divider style="border-color:#c8c9cc" />
            <router-link to="/register" class="footer">账户注册</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #E1F5FE, #B3E5FC);
}

.wrapper {
    text-align: center;

    .title {
        font-family: sans-serif;
        font-size: 30px;
        padding-bottom: 25px;
        color: #336699
    }

    .footer {
        color: #4DACF2;
        font-size: 5px;
    }
}
</style>

  

  