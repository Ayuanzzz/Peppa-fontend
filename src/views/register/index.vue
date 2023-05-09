<script setup>
import { reactive, ref } from 'vue'
import { validate, register } from '@/api/login'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const registerFormRef = ref()
const router = useRouter()

const validateName = (rule, value, callback) => {
    let username = { 'name': value }
    validate(username).then(res => {
        if (res.status == 409) {
            callback(new Error(res.message))
        } else {
            callback()
        }
    })
        .catch(err => {
            console.log(err);
        })
}

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (registerForm.checkPass !== '') {
            if (!registerFormRef.value) return
            registerFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== registerForm.pass) {
        callback(new Error("两次输入密码不相同"))
    } else {
        callback()
    }
}

const registerForm = reactive({
    name: '',
    pass: '',
    checkPass: '',
})

const rules = reactive({
    name: [{ validator: validateName, trigger: 'blur' }],
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log(registerForm);
            let userData = {
                name: registerForm.name,
                password: registerForm.pass
            }
            console.log(userData);
            register(userData).then(res => {
                if (res.status == 200) {
                    router.push({ path: '/login' })
                    ElMessage({
                        message: '注册成功，请登录',
                        type: 'success',
                    })
                }
            })
                .catch(err => {
                    console.log(err);
                })
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<template>
    <div class="container">
        <div class="wrapper">
            <p class="title">项目管理系统</p>
            <el-form ref="registerFormRef" :model="registerForm" status-icon :rules="rules">
                <el-form-item prop="name">
                    <el-input v-model.trim="registerForm.name" placeholder="请输入用户名" style="width: 300px" />
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input v-model="registerForm.pass" type="password" autocomplete="off" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input v-model="registerForm.checkPass" type="password" autocomplete="off" placeholder="确认密码" />
                </el-form-item>
                <el-button type="primary" @click="submitForm(registerFormRef)" style="width: 100px">注册</el-button>
                <el-button type="primary" @click="resetForm(registerFormRef)" style="width: 100px">重置</el-button>
            </el-form>
            <el-divider style="border-color:#c8c9cc" />
            <router-link to="/login" class="footer">账户登录</router-link>
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
  