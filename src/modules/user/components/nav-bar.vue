<template>
    <nav id="navbar" class="navbar">
        <div class="container-fluid">
            <div class="navbar-logo">
                <router-link :to="userIsActive && accessToken ? {name: 'category-list', query: { user: `user_${userIsActive}`, AT: accessToken }} : { name: 'category-list' }">
                    Logo
                </router-link>
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
            class="navbar-sign"
            @click="logout">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
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
import alertaMsg from '@/components/alerta-msg';
import cartMenu from '@/modules/market/components/cart-menu';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, reactive, computed, onMounted } from 'vue';

    export default {
        components: {
            alertaMsg,
            cartMenu
        },
        setup() {
            const route = useRoute()
            const router = useRouter()
            const store = useStore()
            const alert_txt = reactive({})
            const show_alert = ref(false)
            const showCart = ref(false)

            const userIsActive = computed(() => store.getters['user/isActive'])
            const accessToken = computed(() => route.query.user)

            onMounted(() => {
                store.dispatch('user/activeUser')
            })

            return {
                show_alert,
                alert_txt,
                userIsActive,
                accessToken,
                showCart,
                logout: () => {
                    if(route.query.user.includes('new-user')) {
                        router.push( { name: 'user-form', query: { user: `login_${Date.now()}` } } )
                    } else if(route.query.user.includes('login')) {
                        router.push( {name: 'category-list'} )
                    } else {
                        show_alert.value = true
                        alert_txt.title = 'Sign Out'
                        alert_txt.message = 'You are login out of fli-market. Are you sure?'
                    }
                },
                userLogout: async() => {
                    await store.dispatch('user/signOutUser')
                    show_alert.value = false
                    router.push( {name: 'category-list'} )
                },
                closeAlert: () => show_alert.value = false,
                showCartMenu: () => showCart.value = !showCart.value,
                hiddeCart: () => showCart.value = false,
                getCart: computed(() => store.getters['market/loadCartProducts']),
                totalItems: computed(() => store.getters['market/totalCartProducts']),
            }
        }
    }
</script>