<template>
    <div class="user-form pt-5">
        <div class="container">
            <h1> {{ login ? 'Login in to your acount' : 'Create your acount' }} </h1>
            <form class="user-form__form">
                <!-- login -->
                <div v-if="login" class="form-login">
                    <div class="user-form__form-box">
                        <label for="name" class="user-form__form-label">Username or Email</label>
                        <input type="text" id="name" class="user-form__form-input">
                    </div>
                    <div class="user-form__form-box">
                        <label for="password" class="user-form__form-label">Your Password</label>
                        <input type="password" id="password" class="user-form__form-input">
                    </div>
                </div>
                <!-- register -->
                <div v-else class="form-register">
                    <div class="user-form__form-box">
                        <label for="name" class="user-form__form-label">Your Name</label>
                        <input type="text" id="name" class="user-form__form-input">
                    </div>
                    <div class="user-form__form-box">
                        <label for="username" class="user-form__form-label">Your Username</label>
                        <input type="text" id="username" class="user-form__form-input">
                    </div>
                    <div class="user-form__form-box">
                        <label for="email" class="user-form__form-label">Your email</label>
                        <input type="text" id="email" class="user-form__form-input">
                    </div>
                    <div class="user-form__form-box">
                        <label for="password" class="user-form__form-label">Your password</label>
                        <input type="password" id="password" class="user-form__form-input">
                    </div>
                    <div class="user-form__form-box">
                        <label for="repeat_password" class="user-form__form-label">Repeat password</label>
                        <input type="password" id="repeat_password" class="user-form__form-input">
                    </div>
                </div>
                <!-- submit -->
                <div class="user-form__form-box">
                    <button type="submit" class="user-form__form-submit">{{ login ? 'Login' : 'Register' }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
    setup() {
        const route = useRoute()

        return {
            login: computed(() => route.query.user.split('_')[0] === 'login' ? true : false )
        }
    }
}
</script>