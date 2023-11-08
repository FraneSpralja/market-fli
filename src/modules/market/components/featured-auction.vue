<template>
    <div class="featured-auction mb-3 mb-lg-5">
        <div class="container">
            <div class="featured-auction__row flex-nowrap">
                <div
                v-for="(product, i) in featured"
                :key="product.id"
                class="featured-auction__card"
                :class="i === 0 ? 'active' : ''"
                :id="`card_${i}`"
                @click="goToProductPage(product.id)"
                >
                    <div class="featured-auction__card-header">
                        <h5 class="featured-auction__card-title">
                            {{ product.title }}
                        </h5>
                    </div>
                    <div class="featured-auction__card-img">
                        <img :src="product.images.img_1" :alt="product.title" height="20">
                    </div>
                    <div class="featured-auction__card-categories">
                        <span v-for="cat in product.category" :key="cat" class="featured-auction__card-category px-2 me-2">
                            {{ cat }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="featured-auction__navigation">
                <ul class="featured-auction__navigation-list">
                    <li class="featured-auction__navigation-bullets active"></li>
                    <li class="featured-auction__navigation-bullets"></li>
                    <li class="featured-auction__navigation-bullets"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';

    export default {
        emits: ['show-modal'],
        setup(props, {emit}) {
            const store = useStore()
            const router = useRouter()

            return {
                featured: computed(() => store.getters['market/featuredProducts']),
                showModal: (item) => emit('show-modal', item),
                goToProductPage: (id) => router.push( { name: 'product-view', params: { id } } )
            }
        }
    }

</script>