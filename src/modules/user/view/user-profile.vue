<template>
    <div class="user-profile">
        <div class="container">
            <div class="user-profile__header">
                <div class="user-profile__avatar">
                    <img v-if="user_login.img_profile" :src="user_login.img_profile" class="user-profile__avatar-img">
                    <p v-else class="user-profile__avatar-initial">{{ user_login.name[0] }}</p>
                </div>
                <div class="user-profile__perfil">
                    <ul class="user-profile__perfil-list">
                        <li class="user-profile__perfil-item">Name: {{ user_login.name }}</li>
                        <li class="user-profile__perfil-item">Email: {{ user_login.email }}</li>
                        <li class="user-profile__perfil-item">Adress: {{ !user_login.adress ? 'Undefined' : user_login.adress }}</li>
                        <li class="user-profile__perfil-item">Phone: {{ !user_login.phone ? 'Undefined' : user_login.phone }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useStore } from 'vuex'
    import { computed } from 'vue'
    export default {
        setup() {
            const store = useStore()

            return {
                user_login: computed(() => store.getters['user/getUser'])
            }
        }
    }
</script>