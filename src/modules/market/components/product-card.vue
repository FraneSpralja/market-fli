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
                    <span v-for="(cat, i) in product.category" class="product-category px-3 py-1">
                        {{ cat }}
                    </span>
                </div>
                <p class="product-card__description">
                    {{  product.description.substring(0,135)  }}...
                </p>
            </div>
            <div 
            class="product-card__footer d-flex flex-wrap align-items-center justify-content-between"
            :class="user_like ? 'user-like' : ''"
            >
                <p class="product-card__price mb-0">
                    ${{ product.price }}
                </p>
                <btn 
                btn_icon="cart-shopping"
                @click="addProductToCart"
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
import btn from '../components/action-btn'
import { useStore } from 'vuex';
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

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

        const user_like = ref(false)

        const userIsActive = computed(() => store.getters['user/isActive'])
        const userLikes = (item_id) => {
            if(userIsActive) {
                const products = store.getters['user/getMyLikes']
                const likeIndex = products.findIndex((item) => item.id === item_id)

                if(likeIndex !== -1) user_like.value = true
            }
        }

        onMounted(() => {
            userLikes(props.product.id)
        })

        return {
            userIsActive,
            user_like,
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
                    user_like.value = await store.dispatch('user/userLikeProduct', data)
                }
            },
        }
    }

}

</script>