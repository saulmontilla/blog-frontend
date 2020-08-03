<template>
    <div class="row">
        <div class="col-6 mx-auto mt-3">
            <div class="card">
                <div class="card-header">
                    <h3>
                        Register
                    </h3>
                </div>
                <div class="card-body">
                    <register-component />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegisterComponent from '@/components/auth/RegisterComponent'

export default {
    components: {
        RegisterComponent
    }
}
</script>