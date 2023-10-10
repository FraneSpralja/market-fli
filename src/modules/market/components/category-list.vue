<template>
    <div class="category-list">
        <h3 class="category-list__title">Lista de productos por categoria</h3>
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
import productCard from './product-card.vue'
import productModal from './product-modal.vue'

import { computed, ref } from 'vue';
import { useStore } from 'vuex'

export default {
    components: {
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
            getProducts: computed(() => store.getters['market/loadProductsByCategory'])
        }
    }
}


</script>

<style lang="scss" scoped>

</style>