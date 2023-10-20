<template>
    <div class="user-products">
        <button
        @click="back_to_profile"
        >
            Back to profile
        </button>
        <form 
        @submit.prevent="newProduct"
        class="user-products__form">
            <div class="user-products__form-box">
                <label class="user-products__form-label">Title</label>
                <input type="text" class="user-products__form-input" v-model="title">
            </div>
            <div class="user-products__form-box">
                <label class="user-products__form-label">Produt image</label>
                <input type="file" class="user-products__form-input" @change="getImage">
            </div>
            <div class="user-products__form-box">
                <label class="user-products__form-label">Price</label>
                <input type="number" class="user-products__form-input" v-model="price">
            </div>
            <div class="user-products__form-box">
                <label class="user-products__form-label">Description</label>
                <textarea class="user-products__form-textarea" v-model="description"></textarea>
            </div>
            <div class="user-products__form-box">
                <button>Save product</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { reactive, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    
    export default {
        setup() {
            const router = useRouter()
            const route = useRoute()
            const store = useStore()

            const product = reactive({})
            const title = ref()
            const product_file = ref()
            const price = ref()
            const description = ref()
            const user_id = route.params.id

            return {
                title,
                product_file,
                price,
                description,
                back_to_profile: () => router.go(-1),
                getImage: (e) => product_file.value = e.target.files[0],
                newProduct: async () => {
                    product.title = title.value
                    product.price = price.value
                    product.product_file = product_file.value
                    product.description = description.value
                    product.user_id = user_id

                    await store.dispatch('user/setNewProduct', product)
                    router.go(-1)
                }
            }
        }
    }
</script>