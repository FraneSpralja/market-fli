<template>
    <div class="product-modal">
        <div class="product-modal__header">
            <h3 class="product-modal__title">
                Product Title
            </h3>
            <div class="product-modal__category">
                <span>category</span>
            </div>
        </div>
        <div class="product-modal__body">
            <p class="product-modal__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque culpa excepturi illo commodi aut harum recusandae in quo, nobis alias a nam consectetur atque ipsum ratione id, libero cupiditate itaque rerum saepe quidem dolore voluptate sed quaerat. Sed maxime aperiam odit, dignissimos eum quasi, suscipit consequatur praesentium, ab cupiditate facilis dolor rerum ut sit a. Laborum, architecto ipsum! Aspernatur nemo saepe quaerat nobis libero, voluptatibus cum sapiente ratione ut tempore harum odit, nihil quas ea?</p>
        </div>
        <div class="product-modal__footer">
            <p class="product-modal__price">
                $250.000
            </p>
            <action-btn 
            btn_text="Buy"
            />
        </div>
    </div>
</template>

<script>
import ActionBtn from '../components/action-btn.vue';

export default {
    components: {
        ActionBtn
    },
    props: {
        product: {
            type: Object,
            required: true
        },
    },
    setup(props) {

    }
}

</script>