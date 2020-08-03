<template>
    <form @submit.prevent="register()">
        <div class="form-group">
            <div class="row">
                <label for="name" class="col-4 col-form-label">
                    Name
                </label>
                <div class="col-8">
                    <input 
                        type="text" 
                        class="form-control" 
                        id="name" 
                        placeholder="Enter your name"
                        autofocus
                        v-model="name"
                        :class="{'is-invalid' : $v.name.$error}"
                        @blur="$v.name.$touch()"
                    >

                    <template v-if="$v.name.$error">
                        <span v-if="!$v.name.required" class="invalid-feedback">
                            The name is required
                        </span>
                    </template>
                </div>

            </div>
        </div>
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
                        <span v-if="!$v.password.minLength" class="invalid-feedback">
                            The password needs to be at least 8 characters long
                        </span>
                    </template>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label for="password_confirmation" class="col-4 col-form-label">
                    Confirm password
                </label>
                <div class="col-8">
                    <input 
                        type="password" 
                        class="form-control" 
                        id="password_confirmation" 
                        placeholder="Repear your password"
                        v-model="password_confirmation"
                        :class="{'is-invalid' : $v.password_confirmation.$error}"
                        @blur="$v.password_confirmation.$touch()"
                    >

                    <template v-if="$v.password_confirmation.$error">
                        <span v-if="!$v.password_confirmation.required" class="invalid-feedback">
                            Please confirm your password
                        </span>
                        <span v-if="!$v.password_confirmation.sameAsPassword" class="invalid-feedback">
                            The passwords dont match
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
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'
import SpinnerComponent from '../globals/SpinnerComponent'

export default {
    name: 'register-component',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            isLoading: false
        }
    },
    methods: {
        register() {
            this.$v.$touch()
            if(!this.$v.$invalid) {
                this.isLoading = true

                const credentials = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                }

                this.$store.dispatch('auth/register', credentials)
                .then(() => {
                    this.isLoading = false
                    this.$router.push({name: 'Dashboard'})
                })
                .catch(() =>{
                    this.isLoading = false
                })
            }
        }
    },
    validations: {
        name: {
            required
        },
        email: {
            required, email
        },
        password: {
            required,
            minLength: minLength(8)
        },
        password_confirmation: {
            required,
            sameAsPassword: sameAs('password')
        }
    }
}
</script>