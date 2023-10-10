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
            v-if="!user"
            @click="logOut"
            class="navbar-sign">
                <i class="fa-solid fa-user"></i>
            </button>
            
            <button 
            v-else
            @click="logOut"
            class="navbar-logout">
                <i class="fa-solid fa-right-to-bracket"></i>
            </button>
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
            const user = ref(false)
            const showCart = ref(false)

            return {
                user,
                showCart,
                logOut: () => user.value = !user.value,
                getCart: computed(() => store.getters['market/loadCartProducts']),
                showCartMenu: () => showCart.value = !showCart.value,
                hiddeCart: () => showCart.value = false,
                totalItems: computed(() => store.getters['market/totalCartProducts'])
            }
        }
    }

</script>