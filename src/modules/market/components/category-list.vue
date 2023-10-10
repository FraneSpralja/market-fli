<template>
    <div class="category-list">
        <h3 class="category-list__title">Lista de productos por categoria</h3>
        <category-filter 
        :product="getProducts"
        />
        <div class="row">
            <product-card 
            v-for="item in getProducts" :key="item.id"
            :product="item"
            @show-modal="showModal"
            />
        </div>
    </div>
    <div 
    class="modal-fade"
    v-if="modal"
    >
        <product-modal 
        :product="product"
        @close-modal="closeModal"
        />
    </div>

</template>

<script>
import productCard from './product-card'
import productModal from './product-modal'
import categoryFilter from './category-filter';

import { computed, ref } from 'vue';
import { useStore } from 'vuex'

export default {
    components: {
        categoryFilter,
        productCard,
        productModal
    },
    setup() {
        const store = useStore()
        const modal = ref(false)
        const product = ref(null)
        
        return {
            modal,
            product,
            showModal: ( item ) => {
                modal.value = true
                product.value = item
            },
            closeModal: () => modal.value = false,
            getProducts: computed(() => store.getters['market/loadProducts'])
        }
    }
}


</script>

<style lang="scss" scoped>

</style>