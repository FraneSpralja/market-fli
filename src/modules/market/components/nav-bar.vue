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
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import cartMenu from './cart-menu';

    export default {
        components: {
            cartMenu
        },
        setup() {
            const store = useStore()
            const userMenu = ref(false)
            const showCart = ref(false)

            return {
                userMenu,
                showCart,
                openUserMenu: () => userMenu.value = !userMenu.value,
                getCart: computed(() => store.getters['market/loadCartProducts']),
                showCartMenu: () => showCart.value = !showCart.value,
                hiddeCart: () => showCart.value = false,
                totalItems: computed(() => store.getters['market/totalCartProducts'])
            }
        }
    }

</script>