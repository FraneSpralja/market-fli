<template>
    <select 
    name="category" 
    id="category-filter"
    class="category-filter mb-3"
    @change="getProductsByCategory"
    >
        <option selected disabled>Category select</option>
        <option 
        v-for="category in categories"
        :key="category"
        :value="category">{{ category }}</option>
        <option
        value="all"
        >All</option>
    </select>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    setup() {
        const store = useStore()
        return {
            categories: computed(() => store.getters['market/selectItemByCategory'] ),
            getProductsByCategory: (e) => {
                store.dispatch('market/getProductsByCategory', e.target.value)
            }
        }
    }
}
</script>