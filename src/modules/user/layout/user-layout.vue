<template>
    <nav-bar />
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
import navBar from '@/modules/user/components/nav-bar'
export default {
    components: {
        navBar
    },
    setup() {

    }
}
</script>