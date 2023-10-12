<template>
    <nav-bar />
    <router-view></router-view>
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