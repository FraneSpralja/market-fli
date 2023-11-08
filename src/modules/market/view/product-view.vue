<template>
    <div v-if="product" class="product-view">
        <div class="product-view__header">
            <h3 class="product-view__title">
                {{ product.title }}
            </h3>
            <div class="product-view__category">
                <span v-for="(cat, i) in product.category" :key="i">{{ cat }}</span>
            </div>
        </div>
        <div class="product-view__body">
            <div class="product-view__images">
                <img v-for="(img, i) in product.images" :key="i" :src="img" :alt="`${product.title} ${i}`" class="product-view__img">
            </div>
            <p class="product-view__description">{{ product.description }}</p>
        </div>
        <div class="product-view__footer">
            <p class="product-view__price">
                ${{ formatPrice(product.price) }}
            </p>
            <action-btn 
            btn_text="Buy"
            />
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
        }
    }
}

</script>