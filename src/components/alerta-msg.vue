<template>
    <div class="alert-msg">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="alert-msg__head">
                        <button 
                        @click="closeAlert"
                        class="alert-msg__close">
                            <i class="fa-solid fa-x"></i>
                        </button>
                        <h3 class="alert-msg__title">{{ title }}</h3>
                    </div>
                    <div class="alert-msg__body">
                        <p class="alert-msg__text mb-2">{{ message }}</p>
                    </div>
                    <div v-if="action_btn" class="alert-msg__footer">
                        <button
                        @click="actionBtn"
                        >
                            Accept
                        </button>
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
            },
            action_btn: {
                type: Boolean,
                default: false
            }
        },
        emits: ['close-alert', 'action-btn'],
        setup(props, { emit }) {
            return {
                closeAlert: () => emit('close-alert'),
                actionBtn: () => emit('action-btn')
            }
        }
    }
</script>