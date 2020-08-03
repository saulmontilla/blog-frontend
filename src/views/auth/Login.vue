<template>
    <div class="row">
        <div class="col-6 mx-auto mt-3">
            <div class="card">
                <div class="card-header">
                    <h3>
                        Login
                    </h3>
                </div>
                <div class="card-body">
                    <login-component />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginComponent from '@/components/auth/LoginComponent'

export default {
    components: {
        LoginComponent
    }
}
</script>