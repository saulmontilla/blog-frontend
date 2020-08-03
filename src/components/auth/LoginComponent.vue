<template>
    <form @submit.prevent="login()">
        <div class="form-group">
            <div class="row">
                <label for="email" class="col-4 col-form-label">
                    Email
                </label>
                <div class="col-8">
                    <input 
                        type="text" 
                        class="form-control" 
                        id="email" 
                        placeholder="Enter your email"
                        v-model="email"
                        :class="{'is-invalid' : $v.email.$error}"
                        @blur="$v.email.$touch()"
                    >

                    <template v-if="$v.email.$error">
                        <span v-if="!$v.email.required" class="invalid-feedback">
                            The email is required
                        </span>
                        <span v-if="!$v.email.email" class="invalid-feedback">
                            Please enter a valid email address
                        </span>
                    </template>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label for="password" class="col-4 col-form-label">
                    Password
                </label>
                <div class="col-8">
                    <input 
                        type="password" 
                        class="form-control" 
                        id="password" 
                        placeholder="Enter your password"
                        v-model="password"
                        :class="{'is-invalid' : $v.password.$error}"
                        @blur="$v.password.$touch()"
                    >

                    <template v-if="$v.password.$error">
                        <span v-if="!$v.password.required" class="invalid-feedback">
                            The password is required
                        </span>
                    </template>
                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" :disabled="isLoading">
                <span v-if="!isLoading">
                    Login
                </span>
                <spinner-component v-else></spinner-component>
            </button>
        </div>
    </form>
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'

export default {
    name: 'login-component',
    data() {
        return {
            email: '',
            password: '',
            isLoading: false
        }
    },
    methods: {
       login() {
           this.$v.$touch()
            if(!this.$v.$invalid) {
                this.isLoading = true
                const credentials = {
                    email: this.email,
                    password: this.password
                }

                this.$store.dispatch('auth/login', credentials)
                .then(() => {
                    this.isLoading = false
                    this.$router.push({name: 'Dashboard'})
                })
                .catch(() => {
                    this.isLoading = false
                })

            }
       }
    },
    validations: {
        email: {
            required, email
        },
        password: {
            required
        }
    }
}
</script>