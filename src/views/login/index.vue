<template>
    <div>
        <el-tabs v-model="activeTab">
            <el-tab-pane label="用户登录" name="login">
                <el-form label-width="80px" @submit.native.prevent="handleLogin">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model.trim="loginForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model.trim="loginForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" native-type="submit">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="用户注册" name="register">
                <h1>register</h1>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
  
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { login } from '@/api/login'
import { asyncRoutes } from '@/router';
import { filterAsyncRoutes } from '@/utils/router';
import { userDataStore } from '@/stores/user';


const router = useRouter()

const activeTab = ref('login')
const loginForm = reactive({
    username: 'admin',
    password: '666'
})

const saveUserData = (data) => {
    const userData = {
        id: data.id,
        name: data.name,
        roles: [data.role]
    }
    localStorage.setItem('userData', JSON.stringify(userData))
}


const userInfo = userDataStore()
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
  