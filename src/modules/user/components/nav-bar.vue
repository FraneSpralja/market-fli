<template>
    <nav id="navbar" class="navbar">
        <div class="container-fluid">
            <div class="navbar-logo">
                Logo
            </div>
            
            <button 
            class="navbar-sign"
            @click="logout">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
        </div>
    </nav>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

    export default {
        setup() {
            const route = useRoute()
            const router = useRouter()
            return {
                logout: () => {
                    router.push( {name: 'category-list'} )
                }
            }
        }
    }
</script>