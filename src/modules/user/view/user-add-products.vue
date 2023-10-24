<template>
    <div class="user-add-products">
        <button
        @click="back_to_profile"
        class="user-add-products__btn"
        >
            <i class="fa-solid fa-arrow-left"></i>
            Back to profile
        </button>
        <h1 class="user-add-products__title text-center mt-4">
            Add a new product
        </h1>
        <form 
        @submit.prevent="newProduct"
        class="user-add-products__form">
            <div class="user-add-products__form-box">
                <label class="user-add-products__form-label">Title</label>
                <input type="text" class="user-add-products__form-input" v-model="title">
            </div>
            <div class="user-add-products__form-box">
                <label class="user-add-products__form-label">Produt image</label>
                <input 
                type="file" 
                class="user-add-products__form-input user-add-products__form-input--hidden" 
                @change="getImage"
                ref="imageSelector"
                multiple>
                <a 
                @click="addImage"
                class="user-add-products__form-reference"
                >Add an image</a>
                <img 
                v-if="files_url.length > 0"
                v-for="(img, i) in files_url"
                :key="img" 
                :src="img" :alt="`product_${i + 1}`"
                height="50">
            </div>
            <div class="user-add-products__form-box">
                <label class="user-add-products__form-label">Price</label>
                <input type="number" class="user-add-products__form-input" v-model="price">
            </div>
            <div class="user-add-products__form-box">
                <label class="user-add-products__form-label">Colección</label>
                <input type="checkbox" 
                class="user-add-products__form-checkbox" 
                value="coleccion"
                @change="addTagging"
                >
                <label class="user-add-products__form-label">Cartas</label>
                <input type="checkbox" 
                class="user-add-products__form-checkbox" 
                value="cartas"
                @change="addTagging"
                >
                <label class="user-add-products__form-label">Comics</label>
                <input type="checkbox" 
                class="user-add-products__form-checkbox" 
                value="comics"
                @change="addTagging"
                >
                <label class="user-add-products__form-label">Lectura</label>
                <input type="checkbox" 
                class="user-add-products__form-checkbox" 
                value="lecture"
                @change="addTagging"
                >
                <label class="user-add-products__form-label">Figuras</label>
                <input type="checkbox" 
                class="user-add-products__form-checkbox" 
                value="figuras"
                @change="addTagging"
                >
            </div>
            <div class="user-add-products__form-box">
                <label class="user-add-products__form-label">Description</label>
                <textarea class="user-add-products__form-textarea" v-model="description"></textarea>
            </div>
            <div class="user-add-products__form-box">
                <button type="submit" class="user-add-products__form-btn">Save product</button>
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
            const tagging = reactive([])
            const title = ref()
            const product_file = ref([])
            const files_url = ref([])
            const price = ref()
            const description = ref()
            const user_id = route.params.id
            const imageSelector = ref(null)

            return {
                title,
                product_file,
                files_url,
                price,
                description,
                imageSelector,
                tagging,
                back_to_profile: () => router.go(-1),
                getImage: (e) => {
                    const files = [ ...e.target.files ]
                    product_file.value = [ ...files ]
                    
                    files.map( (file, i) => {
                        const fileUrl = window.URL.createObjectURL(file)
                        files_url.value.push(fileUrl)
                    }  )

                },
                newProduct: async () => {
                    const category = {}
                    const categories = tagging
                                        .filter((item, index) => tagging
                                            .indexOf(item) === index )
                                            
                    for(let i = 0; i < categories.length; i++) {
                        let cat = categories[i]

                        category[`cat_${i + 1}`] = cat
                    }

                    console.log(category)


                    product.title = title.value
                    product.price = price.value
                    product.product_file = product_file.value
                    product.description = description.value
                    product.user_id = user_id
                    product.category = category

                    await store.dispatch('user/setNewProduct', product)
                    router.go(-1)
                },
                addImage: () => {
                    imageSelector.value.click()
                },
                addTagging: (e) => {
                    tagging.push(e.target.value)
                }
            }
        }
    }
</script>