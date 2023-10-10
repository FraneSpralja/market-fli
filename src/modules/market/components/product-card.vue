<template>
    <div class="col-12 col-lg-4 col-xxl-3">
        <div class="product-card p-3 mb-4">
            <div class="product-card__header">
                <h4 class="product-card__title text-center">{{ product.title }}</h4>
                <div class="product-card__img d-flex align-items-center justify-content-center text-center">
                    <img 
                    :src="product.image" 
                    :alt="product.title" 
                    class="product-img"
                    @click="showModal"
                    @mouseover="addBorderToCard"
                    @mouseout="removeBorderToCard"
                    >
                </div>
            </div>
            <div class="product-card__body pt-3">
                <div class="product-card__category mb-2 pb-2">
                    <span class="product-category px-3 py-1">
                        {{ product.category }}
                    </span>
                </div>
                <p class="product-card__description">
                    {{  product.description.substring(0,135)  }}...
                </p>
            </div>
            <div class="product-card__footer d-flex flex-wrap align-items-center justify-content-between">
                <p class="product-card__price mb-0">
                    ${{ product.price }}
                </p>
                <btn 
                btn_icon="cart-shopping"
                @click="addProductToCart"
                />
            </div>
        </div>
    </div>
</template>

<script>
import btn from '../components/action-btn'
import { useStore } from 'vuex';

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

        return {
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
            }
        }
    }

}

</script>