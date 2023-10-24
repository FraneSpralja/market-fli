import { useStore } from 'vuex';
<template>
    <div 
    class="cart-menu col-12 col-lg-6 p-3"
    :class="show ? 'active' : ''"
    >
        <div class="container cards-container">
            <div 
            v-for="product in products"
            :key="product.id"
            class="cart-menu__card row align-items-center pb-1 mb-2"
            >
                <div class="cart-menu__img col-2">
                    <img :src="product.images.img_1" :alt="product.title">
                    <span class="cart-menu__number">{{ product.number }}</span>
                </div>
                <h5 class="cart-menu__title col-7">
                    {{ product.title }}
                </h5>
                <div class="cart-menu__footer col-3 align-self-end">
                    <div class="cart-menu__actions-btn d-flex justify-content-between justify-content-md-evenly">
                        <action-btn
                        class="btn-plus"
                        btn_icon="plus" 
                        @click="addProductToCart(product.id)"
                        />
                        <action-btn
                        class="btn-minus"
                        btn_icon="minus" 
                        @click="oneLess(product.id)"
                        />
                        <action-btn 
                        class="btn-delete"
                        btn_icon="trash"
                        @click="deleteProduct(product.id)"
                        />
                    </div>
                    <p class="cart-menu__price text-end">
                        ${{ product.price.toFixed(2) }}
                    </p>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <h5 class="cart-menu__total d-inline mb-0">
                Total: ${{ totalPrice.toFixed(2) }}
            </h5>
            <action-btn 
            btn_text="Checkout"
            class="cart-menu__checkout"
            />
        </div>
    </div>
</template>

<script>
import actionBtn from './action-btn';
import { useStore } from 'vuex'
import { computed } from 'vue';
export default {
    components: {
        actionBtn
    },
    emits: ['hidde-cart'],
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const store = useStore(); 
        const products = computed( () => store.getters['market/loadCartProducts'] )

        return {
                products,
                totalPrice: computed( () => store.getters['market/totalPrice'] ),
                deleteProduct: (id) => {
                    store.commit('market/deleteFromCart', id)
                    if(products.value.length <= 0) emit('hidde-cart') 
                },
                oneLess: (id) => {
                    store.commit('market/lessOneProduct', id)
                    if(products.value.length <= 0) emit('hidde-cart') 
                },
                addProductToCart: (id) => {
                    store.dispatch('market/addProductsToCarts', id)
                }
            }
    }
}

</script>