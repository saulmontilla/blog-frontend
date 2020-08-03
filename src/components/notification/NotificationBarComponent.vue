<template>
    <div 
        class="alert" 
        :class="notificationClass" 
        @mouseover="pause()"
        @mouseout="resume()"
        @click="destroy()"
        role="alert"
    >
        {{ notification.message }}
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'notification-bar',
    computed: {
        notificationClass () {
            return (this.notification.type == 'success') ? 'alert-success' : 'alert-danger'
        }
    },
    data () {
        return {
            timeout: null,
            remaining: null,
            start: null,
            delay: 5000
        }
    },
    mounted () {
        this.timeout = setTimeout(() => this.remove(this.notification), this.delay)
        this.start = Date.now()
        this.remaining = this.delay
    },
    beforeDestroy() {
        clearTimeout(this.timeout)
    },
    methods: {
        ...mapActions('notification', ['remove']),
        pause () {
            clearTimeout(this.timeout)
            this.remaining -= Date.now() - this.start
        },
        resume () {
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => this.remove(this.notification), this.remaining)
        },
        destroy () {
            this.remove(this.notification)
        }
    },
    props:{ 
        notification: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
    .alert { 
        cursor: pointer;
    }
</style>