<template>
    <div class="user-resume">
        <h1 class="user-resume__title">{{ title }}</h1>
        <div v-if="items.length <= 0 || !items" class="user-resume__empty">
            Is empty
        </div>
        <div v-else class="user-resume__cards">
            <div v-for="item in items" class="user-resume__card">
                <div class="user-resume__card-head">
                    <h3 class="user-resume__card-title">
                        {{ item.title }}
                    </h3>
                    <div class="user-resume__card-img">
                        <img :src="item.img_url" :alt="item.title" height="50">
                    </div>
                </div>
                <div class="user-resume__card-body">
                    <div class="user-resume__card-description">
                        {{ item.description }}
                    </div>
                </div>
                <div class="user-resume__card-footer">
                    <p class="user-resume__card-price">
                        {{ item.price }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        items: {
            type: Array
        }
    },
    setup() {

    }

}

</script>