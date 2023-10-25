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
            @click="$router.push()"
            class="navbar-back-to-profile">
                profile
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
import { useRouter } from 'vue-router';
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
            const store = useStore()
            const userMenu = ref(false)
            const showCart = ref(false)
            const alert_txt = reactive({})
            const show_alert = ref(false)
            const router = useRouter()

            return {
                userMenu,
                showCart,
                show_alert,
                alert_txt,
                openUserMenu: () => userMenu.value = !userMenu.value,
                getCart: computed(() => store.getters['market/loadCartProducts']),
                showCartMenu: () => showCart.value = !showCart.value,
                hiddeCart: () => showCart.value = false,
                totalItems: computed(() => store.getters['market/totalCartProducts']),
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
                closeAlert: () => show_alert.value = false
            }
        }
    }

</script>