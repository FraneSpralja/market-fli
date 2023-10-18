<template>
    <div class="featured-auction">
        <div class="container">
            <h3 class="featured-auction__title">subastas destacada</h3>
            <div class="featured-auction__row flex-nowrap">
                <div
                v-for="(product, i) in featured"
                :key="product.id"
                class="featured-auction__card"
                :id="`card_${i}`"
                @click="showModal(product)"
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
                                {{ product.description.slice(0, 130) }}...
                            </p>
                        </div>
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
import { carousel } from '@/helpers/carousel';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

    export default {
        emits: ['show-modal'],
        setup(props, {emit}) {
            const store = useStore()

            const auctionCarousel = () => {
                setTimeout(() => {
                    const container = document.querySelector('.featured-auction__row')
                    const btns = document.querySelectorAll('.featured-auction__navigation-bullets')
                    const cards = document.querySelectorAll('.featured-auction__card')

                    setTimeout(() => {
                        carousel(container,btns, cards)
                    }, 500)

                }, 1000)
            }

            onMounted(() => {
                auctionCarousel()
            })


            return {
                featured: computed(() => store.getters['market/featuredProducts']),
                showModal: (item) => emit('show-modal', item)
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>