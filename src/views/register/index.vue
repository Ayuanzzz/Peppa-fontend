<template>
    <el-form ref="registerFormRef" :model="registerForm" status-icon :rules="rules" label-width="120px">
        <el-form-item label="用户名" prop="name">
            <el-input v-model.trim="registerForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input v-model="registerForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="registerForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm(registerFormRef)">注册</el-button>
            <el-button @click="resetForm(registerFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script setup>
import { reactive, ref } from 'vue'
import http from '@/api/http'
import { useRouter } from 'vue-router'

const registerFormRef = ref()
const router = useRouter()

const validateName = (rule, value, callback) => {
    let username = { 'name': value }
    http.post('/auth/register/name', username)
        .then(res => {
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
            http.post('/auth/register', userData)
                .then(res => {
                    if (res.status == 200) {
                        router.push({ path: '/login' })
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
  