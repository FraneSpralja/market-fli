<template>
    <div class="category-list">
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

import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex'

export default {
    components: {
        categoryFilter,
        productCard,
        productModal
    },
    props: {
        itemModal: {
            type: Object,
            default: null
        }
    },
    setup(props) {
        const store = useStore()
        const modal = ref(false)
        const product = ref(null)

        const modalFromBanner = computed(() => props.itemModal)

        watch(modalFromBanner, (newValue) => {{
            if(newValue) {
                product.value = newValue
                modal.value = true
            }
        }})
        
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