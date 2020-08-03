<template>
    <div class="notification-container">
        <notification-bar
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
        />
    </div>
</template>

<script>
import NotificationBar from './NotificationBarComponent'
import {mapState} from 'vuex'

export default {
    name: 'notification-container',
    components: {
        NotificationBar
    },
    computed: {
        ...mapState('notification', ['notifications'])
    }    
}
</script>

<style>
    .notification-container {
        position: fixed;
        bottom: 0;
        right: 0;
        padding-right: 40px;

    }
</style>