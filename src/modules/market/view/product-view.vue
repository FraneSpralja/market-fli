<template>
    <div v-if="product" class="product-view">
        <div class="product-view__main">
            <div class="product-view__main-header">
                <h3 class="product-view__main-title">
                    {{ product.title }}
                </h3>
                <div class="product-view__main-category">
                    <span v-for="(cat, i) in product.category" :key="i">{{ cat }}</span>
                </div>
            </div>
            <div class="product-view__main-body">
                <div class="product-view__main-images">
                    <img :src="product.images.img_1" :alt="`main image ${product.title}`" class="product-view__main-img">
    
                    <div class="product-view__main-images-pagination">
                        <img 
                        v-for="(img, i) in product.images" 
                        :key="i" 
                        :src="img" 
                        :alt="`${product.title} ${i}`" 
                        class="product-view__main-images-btn"
                        :class="i === 'img_1' ? 'btn-active' : ''"
                        @click="carouselImg">
                    </div>
                </div>
                <p class="product-view__main-description">{{ product.description }}</p>
            </div>
            <div class="product-view__main-footer">
                <p class="product-view__main-price">
                    ${{ formatPrice(product.price) }}
                </p>
            </div>
        </div>
        <div class="product-view__aside">
            <div class="product-view__aside-total">
                <h4 class="product-view__aside-total-num">{{ total }}</h4>
                <action-btn 
                btn_icon="plus"
                @click="totalIncrement"
                />
                <action-btn 
                btn_icon="minus"
                @click="totalDecrement"
                />
            </div>
            <h4 class="product-view__aside-price">
                ${{ formatPrice(product.price * total) }}
            </h4>
            <div class="product-view__aside-btns">
                <action-btn 
                btn_text="Buy"
                />
                <action-btn 
                btn_icon="cart-shopping"
                @click="addProductToCart"
                />
            </div>
        </div>
    </div>
</template>

<script>
import formatPrice from '@/helpers/priceFormat'
import { useStore } from 'vuex';
import ActionBtn from '../components/action-btn.vue';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
    components: {
        ActionBtn
    },
    props: {
        id: {
            type: String,
            required: true
        },
    },
    setup(props) {
        const route = useRoute()
        const store = useStore()
        const product = ref()
        const total = ref(1)
        const itemId = computed(() => route.params.id)

        watch(itemId, (newVal) => {
            getProduct(itemId.value)
        })
        const getProduct = async(id) => {
            product.value = await store.dispatch('market/productView', id)
        }

        getProduct(props.id)

        return {
            product,
            formatPrice,
            total,
            carouselImg: (e) => {
                const active = document.querySelector('.btn-active')
                const imgBtn = e.target
                const image = document.querySelector('.product-view__main-img')
                image.src = imgBtn.src

                if(active) {
                    active.classList.remove('btn-active')
                    imgBtn.classList.add('btn-active')
                }
            },
            totalIncrement: () => total.value++,
            totalDecrement: () => {
                total.value--
                if(total.value <= 1) total.value = 1
            },
            addProductToCart: () => {
                const item = {
                    ...product.value,
                    number: total.value
                }
                store.commit('market/addProductToCartFromView', item)
            }
        }
    }
}

</script>