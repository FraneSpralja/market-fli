<template>
    <div class="col-12 col-md-6 col-lg-4 col-xxl-3">
        <div class="product-card p-3 mb-4">
            <div 
            @click="showModal"
            @mouseover="addBorderToCard"
            @mouseout="removeBorderToCard"
            class="product-card__header pointer">
                <h4 class="product-card__title text-center">{{ product.title }}</h4>
                <div class="product-card__img d-flex align-items-center justify-content-center text-center">
                    <img 
                    :src="product.images.img_1" 
                    :alt="product.title" 
                    class="product-img"
                    >
                </div>
            </div>
            <div class="product-card__body pt-3">
                <div v-if="product.category" class="product-card__category mb-2 pb-2">
                    <span v-for="(cat, i) in product.category" :key="cat" class="product-category px-2 me-2">
                        {{ cat }}
                    </span>
                </div>
                <p class="product-card__description">
                    {{  product.description.substring(0,135)  }}...
                </p>
            </div>
            <div 
            class="product-card__footer d-flex flex-wrap align-items-center justify-content-between"
            :class="likedProduct !== -1 ? 'liked' : ''"
            >
                <p class="product-card__price mb-0">
                    ${{ formatPrice(product.price) }}
                </p>
                <btn 
                btn_icon="cart-shopping"
                @click="addProductToCart"
                />
                <btn 
                btn_icon="eye"
                @click="goToProductPage"
                />
                <btn
                v-if="userIsActive" 
                btn_icon="heart"
                @click="likeToProduct"
                />
            </div>
        </div>
    </div>
</template>

<script>
import formatPrice from '@/helpers/priceFormat';
import btn from '../components/action-btn'
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    components: {
        btn
    },
    props: {
        product : {
            type: Object,
            required: true
        }
    },
    emits: ['show-modal'],
    setup(props, { emit }) {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()

        const userIsActive = computed(() => store.getters['user/isActive'])
        const log_user = computed(() => store.getters['user/getUser'])
        const likes = computed(() => store.getters['user/getMyLikes'])

        return {
            userIsActive,
            log_user,
            likes,
            formatPrice,
            showModal: () => {
                emit('show-modal', props.product)
            },
            addBorderToCard: (e) => {
                const img = e.target
                img.classList.add('product-img__hover')
            },
            removeBorderToCard: (e) => {
                const img = e.target
                img.classList.remove('product-img__hover')
            },
            addProductToCart: () => {
                store.dispatch('market/addProductsToCarts', props.product.id)
            },
            likeToProduct: async () => {
                if(userIsActive) {
                    const data = {
                        user_id: route.query.user.split('_')[1],
                        product_id: props.product.id
                    }
                    await store.dispatch('user/userLikeProduct', data)
                }
            },
            likedProduct: computed(() => likes.value.findIndex((item) => item.id === props.product.id)),
            goToProductPage: () => router.push( { name: 'product-view', params: { id: props.product.id } } )
        }
    }

}

</script>