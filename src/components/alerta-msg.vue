<template>
    <div class="alert-msg">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="alert-msg__head">
                        <button 
                        @click="closeAlert"
                        class="alert-msg__close">x</button>
                        <h3 class="alert-msg__title">{{ title }}</h3>
                    </div>
                    <div class="alert-msg__body">
                        <p class="alert-msg__text">{{ message }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        },
        emits: ['close-alert'],
        setup(props, { emit }) {
            return {
                closeAlert: () => emit('close-alert')
            }
        }
    }
</script>