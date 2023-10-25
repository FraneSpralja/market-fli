<template>
    <div class="product-modal col-11 col-md-6 col-xl-4">
        <div class="product-modal__header d-flex flex-wrap pb-4">
            <div class="product-modal__close col-12 text-end">
                <button 
                class="close-modal fs-4"
                @click="closeModal"
                >
                X</button>
            </div>
            <h3 class="product-modal__title">
                {{ product.title }}
            </h3>
            <div class="product-modal__category col-12">
                <span
                v-for="(category, i) in product.category"
                >{{ category }}</span>
            </div>
        </div>
        <div class="product-modal__carousel">
            <div class="product-modal__carousel-images d-flex justify-content-center">
                <div class="product-modal__image text-center">
                    <img :src="product.images.img_1" class="main_img_modal" :alt="product.title">
                </div>
            </div>
            <div class="product-modal__pagination">
                <div 
                v-for="(image, i) in product.images" 
                @click="carouselModal"
                class="product-modal__pagination-btn pointer"
                :class="`pagination-btn-${i + 1}`"
                :data-img="`img_${i + 1}`"
                >
                    <img :src="image" class="img_btn" :alt="`${product.title} img_${i + 1}`">
                </div>
            </div>
        </div>
        <div class="product-modal__body">
            <p class="product-modal__description">
                {{ product.description }}
            </p>
        </div>
        <div class="product-modal__footer">
            <p class="product-modal__price">
                ${{ product.price }}
            </p>
            <action-btn 
            btn_icon="cart-shopping"
            @click="addProductToCart"
            />
        </div>
    </div>
</template>

<script>
import ActionBtn from '../components/action-btn.vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

export default {
    components: {
        ActionBtn
    },
    emits: ['close-modal'],
    props: {
        product: {
            type: Object,
        },
    },
    setup(props, { emit }) {
        const store = useStore()
        const imagesLength = computed(() => Object.values(props.product.images).length)

        return {
            imagesLength,
            closeModal: () => {
                emit('close-modal')
            },
            addProductToCart: () => {
                store.dispatch('market/addProductsToCarts', props.product.id)
            },
            carouselModal: (e) => {
                const mainImg = document.querySelector('.main_img_modal')
                const imgSrc = e.target.src
                
                mainImg.src = imgSrc
            }
        }
    }
}

</script>