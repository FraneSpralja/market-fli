<template>
    <div class="user-profile">
        <div class="container">
            <div class="user-profile__header">
                <div 
                class="user-profile__avatar"
                :class="user_login.img_profile ? 'avatar-img' : 'avatar-initial'">
                    <img v-if="user_login.img_profile" :src="user_login.img_profile" class="user-profile__avatar-img">
                    <p v-else class="user-profile__avatar-initial">{{  user_login.name[0] }}</p>
                </div>
                <div class="user-profile__perfil">
                    <ul class="user-profile__perfil-list">
                        <li class="user-profile__perfil-item"><span class="user-profile__perfil-item--strong">Name:</span> {{ user_login.name }}</li>
                        <li class="user-profile__perfil-item"><span class="user-profile__perfil-item--strong">Email:</span> {{ user_login.email }}</li>
                        <li class="user-profile__perfil-item"><span class="user-profile__perfil-item--strong">Adress:</span> {{ !user_login.adress ? 'Undefined' : user_login.adress }}</li>
                        <li class="user-profile__perfil-item"><span class="user-profile__perfil-item--strong">Phone:</span> {{ !user_login.phone ? 'Undefined' : user_login.phone }}</li>
                    </ul>
                </div>
                <nav class="user-profile__navbar">
                    <button class="user-profile__navbar-btn">Me gusta</button>
                    <button class="user-profile__navbar-btn">Mis Compras</button>
                    <button class="user-profile__navbar-btn">Mis Ventas</button>
                </nav>
            </div>

            <div class="user-profile__body">
                <user-resume
                :title="`My products`"
                :items="products"
                />
                <user-resume
                :title="`My Likes`"
                :items="likes"
                />
                <user-resume
                :title="`My Shopping`"
                :items="shopping"
                />
                <user-resume
                :title="`My Sales`"
                :items="sales"
                />
            </div>

            <button 
            @click="new_product"
            class="user-profile__add-product"
            >
                <i class="fa-solid fa-plus"></i>
                Add new product
            </button>
        </div>
    </div>
</template>

<script>
    import userResume from '../components/user-resume'

    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { computed, onMounted } from 'vue'
    export default {
        components: {
            userResume
        },
        setup() {
            const router = useRouter()
            const route = useRoute()
            const store = useStore()

            const user_id = route.params.id

            const getMyProducts = async(id) => store.dispatch('user/getMyProducts', id)

            getMyProducts(user_id)

            return {
                user_login: computed(() => store.getters['user/getUser']),
                products: computed(() => store.getters['user/getMyProducts']),
                shopping: computed(() => store.getters['user/getMyShopping']),
                sales: computed(() => store.getters['user/getMySales']),
                likes: computed(() => store.getters['user/getMyLikes']),
                new_product: () => {
                    router.push( { name: 'my-product', params: { id: user_id } } )
                }
            }
        }
    }
</script>