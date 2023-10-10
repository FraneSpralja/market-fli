<template>
    <button class="btn-action">
        <span v-if="btn_text">{{ btn_text }}</span>
        <i v-else :class="`fa-solid fa-${btn_icon}`"></i>
    </button>
</template>

<script>

export default {
    props: {
        btn_text: {
            type: String,
            default: null
        },
        btn_icon: {
            type: String,
            default: null
        }
    },
    setup(props) {

    }
}

</script>