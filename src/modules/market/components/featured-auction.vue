<template>
    <div class="featured-auction">
        <div class="container">
            <h3 class="featured-auction__title">subastas destacada</h3>
            <div class="row featured-auction__row flex-nowrap">
                <div
                v-for="product in featured"
                :key="product.id"
                class="featured-auction__card col-10"
                >
                    <div class="featured-auction__card-header">
                        <h5 class="featured-auction__card-title">
                            {{ product.title }}
                        </h5>
                    </div>
                    <div class="featured-auction__card-body">
                        <div class="featured-auction__card-img">
                            <img :src="product.image" :alt="product.title" height="20">
                        </div>
                        <div class="featured-auction__card-description">
                            <p class="featured-auction__card-text">
                                {{ product.description }}
                            </p>
                        </div>
                    </div>
                    <div class="featured-auction__card-footer">
                        <p class="featured-auction__card-price">
                            {{ product.price }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

    export default {
        setup() {
            const store = useStore()

            return {
                featured: computed(() => store.getters['market/featuredProducts'])
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>