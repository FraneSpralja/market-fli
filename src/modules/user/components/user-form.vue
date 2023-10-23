<template>
    <div class="user-form pt-5">
        <div class="container">
            <h1> {{ login ? 'Login in to your acount' : 'Create your acount' }} </h1>
            <!-- login -->
            <form 
            v-if="login"
            @submit.prevent="signUp"
            class="user-form__form">
                <div class="form-login">
                    <div class="user-form__form-box">
                        <label for="name" class="user-form__form-label">Username or Email</label>
                        <input type="text" id="name" class="user-form__form-input" v-model="email">
                    </div>
                    <div class="user-form__form-box">
                        <label for="password" class="user-form__form-label">Your Password</label>
                        <input type="password" id="password" class="user-form__form-input" v-model="pass">
                    </div>
                    <!-- submit -->
                    <div class="user-form__form-box">
                        <button type="submit" class="user-form__form-submit">Sign up</button>
                    </div>
                </div>
            </form>
            <form 
            v-else
            @submit.prevent="register"
            class="user-form__form">
                <!-- register -->
                <div class="form-register">
                    <div class="user-form__form-box">
                        <label for="name" class="user-form__form-label">Your Name</label>
                        <input type="text" id="name" class="user-form__form-input" v-model="name">
                    </div>
                    <div class="user-form__form-box">
                        <label for="username" class="user-form__form-label">Your Username</label>
                        <input type="text" id="username" class="user-form__form-input" v-model="user_name">
                    </div>
                    <div class="user-form__form-box">
                        <label for="email" class="user-form__form-label">Your email</label>
                        <input type="text" id="email" class="user-form__form-input" v-model="email">
                    </div>
                    <div class="user-form__form-box">
                        <label for="password" class="user-form__form-label">Your password</label>
                        <input type="password" id="password" class="user-form__form-input" v-model="pass">
                    </div>
                    <div class="user-form__form-box">
                        <label for="repeat_password" class="user-form__form-label">Repeat password</label>
                        <input type="password" id="repeat_password" class="user-form__form-input" v-model="repeat_pass">
                    </div>
                </div>
                <!-- submit -->
                <div class="user-form__form-box">
                    <button type="submit" class="user-form__form-submit">Register</button>
                </div>
            </form>
        </div>
    </div>

    <div v-if="show_alert" class="alert-fade">
        <alert-msg 
        :title="alert_txt.title"
        :message="alert_txt.message"
        @close-alert="closeAlert"
        />
    </div>
</template>

<script>
import alertMsg from '@/components/alerta-msg'

import { createUser } from '@/helpers/auth';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, ref } from 'vue';

export default {
    components: {
        alertMsg
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()

        const alert_txt = reactive({})
        const email = ref()
        const login = reactive({})
        const name = ref()
        const pass = ref()
        const repeat_pass = ref()
        const show_alert = ref(false)
        const user = reactive({})
        const user_name = ref()

        return {
            alert_txt,
            email,
            name,
            pass,
            repeat_pass,
            show_alert,
            user_name,
            login: computed(() => route.query.user.split('_')[0] === 'login' ? true : false ),
            register: async() => {
                user.name = name.value
                user.user_name = user_name.value ? user_name.value : name.value 
                user.email = email.value
                user.pass = pass.value
                user.repeat_pass = repeat_pass.value

                if( !name.value  || !email.value  || !pass.value  || !repeat_pass.value ) {
                    alert_txt.title = 'Campos incompletos'
                    alert_txt.message = 'Existen campos incompletos, por favor reviselos'
                    show_alert.value = true
                    return
                }
                
                if(repeat_pass.value !== pass.value) {
                    alert_txt.title = 'Contreseñas no coinciden'
                    alert_txt.message = 'Las contraseñas no coinciden, por favor revise nuevamente'
                    show_alert.value = true
                    return
                }

                await createUser(user)
                router.push( { name: 'user-form', query: { user: `login_${Date.now()}` } } )
            },
            signUp: async() => {
                login.email = email.value
                login.pass = pass.value
                try {
                    const { accessToken, id } = await store.dispatch('user/signUpUser', login)
                    router.push({ name: 'user-profile', params: { id }, query: { user: accessToken } })

                } catch (error) {
                    console.log(error)
                }
            },
            user_login: computed(() => store.state['user/user'] ),
            closeAlert: () => show_alert.value = false
        }
    }
}
</script>