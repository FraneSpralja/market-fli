import { ref } from 'vue';
<template>
    <nav id="navbar" class="navbar">
        <div class="container-fluid">
            <div class="navbar-logo">
                Logo
            </div>
            <button
            class="navbar-cart"
            @click="showCartMenu"
            :disabled="getCart <= 0 ? true : false"
            >
                <i class="fa-solid fa-cart-shopping"></i>
                <span 
                v-if="getCart.length" 
                id="cart-num">
                    {{ totalItems }}
                </span>
            </button>
            
            <button 
            v-if="isActive"
            @click="router.push({ name: 'user-profile', params: { id: $route.query.user.split('_')[1] }, query: { user: $route.query.AT } })"
            class="navbar-back-to-profile">
                <img v-if="log_user.img_profile" :src="log_user.img_profile">
                <span v-else class="user-profile__avatar-initial">{{ log_user.name[0] }}</span>
            </button>

            <button 
            v-if="isActive" 
            class="navbar-sign"
            @click="logout">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>

            <button
            v-else
            class="navbar-sign"
            @click="openUserMenu">
                <i class="fa-solid fa-user"></i>
            </button>
            
            <div v-if="userMenu" class="user-menu">
                <router-link :to="{ name: 'user-form', query: { user: `login_${Date.now()}` } }">Login</router-link>
                <router-link :to="{ name: 'user-form', query: { user: `new-user${Date.now()}` } }">Register</router-link>
            </div>
        </div>

        <cart-menu 
        :show="showCart"
        @hidde-cart="hiddeCart"
        />
    </nav>

    <div v-if="show_alert" class="alert-fade">
        <alerta-msg 
        :title="alert_txt.title"
        :message="alert_txt.message"
        :action_btn="true"
        @close-alert="closeAlert"
        @action-btn="userLogout"
        />
    </div>
</template>

<script>
import { reactive, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import alertaMsg from '@/components/alerta-msg';
import cartMenu from './cart-menu';

    export default {
        components: {
            cartMenu,
            alertaMsg
        },
        props: {
            isActive: {
                type: String,
                default: null
            }
        },
        setup() {
            const router = useRouter()
            const route = useRoute()
            const store = useStore()
            const userMenu = ref(false)
            const showCart = ref(false)
            const alert_txt = reactive({})
            const show_alert = ref(false)

            const log_user = computed(() => store.getters['user/getUser'])

            return {
                userMenu,
                showCart,
                show_alert,
                alert_txt,
                log_user,
                router,
                getCart: computed(() => store.getters['market/loadCartProducts']),
                totalItems: computed(() => store.getters['market/totalCartProducts']),
                openUserMenu: () => userMenu.value = !userMenu.value,
                showCartMenu: () => showCart.value = !showCart.value,
                hiddeCart: () => showCart.value = false,
                logout: () => {
                    show_alert.value = true
                    alert_txt.title = 'Sign Out'
                    alert_txt.message = 'You are login out of fli-market. Are you sure?'
                },
                userLogout: async() => {
                    await store.dispatch('user/signOutUser')
                    show_alert.value = false
                    router.push( { name: 'category-list', query: {} } )
                },
                closeAlert: () => show_alert.value = false,
            }
        }
    }

</script>