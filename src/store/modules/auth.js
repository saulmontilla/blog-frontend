import axios from 'axios'

export const auth = {
    namespaced: true,
    state: {
        user: null,
        access_token: null
    },
    getters: {
        userName (state) {
            return (state.user) ? state.user.name : null
        },
        loggedIn (state) {
            return !!state.user
        }
    },
    mutations: {
        SET_USER_DATA(state, data) {
            state.user = data.user
            state.access_token = data.access_token
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('access_token', data.access_token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
        },
        CLEAR_USER_DATA(state) {
            axios.defaults.headers.common['Authorization'] = null

            localStorage.removeItem('user')
            localStorage.removeItem('access_token')
            
            for (const property in state) {
                state[property] = null
            }
        }
    },
    actions: {
        login(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('//localhost:8000/api/login', credentials)
                .then(response => {
                    context.commit('SET_USER_DATA', response.data)

                    const notification = {
                        type: 'success',
                        message: 'Welcome to Dashboard!'
                    }

                    context.dispatch('notification/add', notification, {root: true})
                    resolve()
                })
                .catch(error => {
                    const errorMessage = (error.response.data.message) ?
                        error.response.data.message :
                        error.message

                    const notification = {
                        type: 'error',
                        message: errorMessage
                    }

                    context.dispatch('notification/add', notification, { root: true })
                    reject()
                })
            })
        },
        register(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('//localhost:8000/api/register', credentials)
                .then(response => {
                    context.commit('SET_USER_DATA', response.data)
                    resolve()
                })
                .catch(error => {
                    let errorMessage = null

                    if(error.response.data.errors) {
                        errorMessage = error.response.data.errors
                    } else if (error.response.data.message) {
                        errorMessage = error.response.data.message
                    } else {
                        errorMessage = error.mmesage
                    }
                    
                    const notification = {
                        type: 'error',
                        message: errorMessage
                    }
                    
                    context.dispatch('notification/add', notification, {root: true})
                    reject()
                })
            })
        },
        logout(context) {
            context.commit('CLEAR_USER_DATA')
        }
    }
}