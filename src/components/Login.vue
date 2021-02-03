<template>
    <div class="login-wrapper">
        
        <div class="header">
            <img src="@/assets/img/logo.png" class="logo">
            <div class="header__item" @click="openSignInForm()">
                Sign In
            </div>
            <div class="header__item" @click="openRegisterForm()">
                Registration
            </div>
        </div>

        <div class="welcome" v-if="welcomeVisible">
            Welcome to the best hotel in the world 
            <div class="welcome__note">
                To book a room please login or register
            </div>
        </div>

        <div class="form-wrapper">
            <transition name="fade">
                <div class="login" v-if="signInVisible">
                    <input 
                        type="text" 
                        placeholder="Enter login"
                        maxlength="30"
                        v-model="login"
                        autocomplete="off"
                    >
                    <input 
                        type="password" 
                        placeholder="Enter password"
                        maxlength="30"
                        v-model="password"
                        autocomplete="off"
                    >
                    <div class="button" @click="signIn()">
                        Send
                    </div>
                </div>
            </transition>
        </div>

        <div class="form-wrapper">    
            <transition name="fade">
                <div class="registration" v-if="registrationVisible">
                    <input 
                        type="text" 
                        placeholder="Enter login"
                        maxlength="30"
                        v-model="login"
                        autocomplete="off"
                    >
                    <input 
                        type="password" 
                        placeholder="Enter password"
                        maxlength="30"
                        v-model="password"
                        autocomplete="off"
                    >
                    <input 
                        type="password" 
                        placeholder="Confirm password"
                        maxlength="30"
                        v-model="passwordConfirm"
                        autocomplete="off"
                    >
                    <div class="button" @click="register()">
                        Send
                    </div>
                </div>
            </transition>
        </div> 

    </div>
</template>

<script>
    import '@/assets/styles/login.scss'
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        name: 'Login',

        data () {
            return {
                //отображение элементов login.vue
                welcomeVisible: true,
                signInVisible: false,
                registrationVisible: false,
                //эти переменные хранят данные из input
                login: '',
                password: '',
                passwordConfirm: ''                            
            }
        },

        computed: {
            ...mapGetters(['GET_VISIBILITIES'])           
        },

        methods: {
            ...mapMutations([ 'SET_VISIBILITIES' ]),

            openRegisterForm: function () {
                this.welcomeVisible = false;
                this.signInVisible = false;
                this.registrationVisible = true;

                //открывая новую форму очищаем input от возможных старых значений
                this.login = '';
                this.password = '';
                this.passwordConfirm ='';
            },

            openSignInForm: function () {
                this.welcomeVisible = false;
                this.registrationVisible = false;
                this.signInVisible = true;

                //открывая новую форму очищаем input от возможных старых значений
                this.login = '';
                this.password = '';
                this.passwordConfirm ='';
            },

            signIn: function () {
                if (this.login && this.password) {
                    //отправка данных на бек - при удачном ответе открываем компнент main
                    // и скрываем компонент Login  
                    this.SET_VISIBILITIES({
                        loginComponentVisible: false,
                        mainComponentVisible: true
                    })
                }
                 
            },

            register: function () {
                let filledFields  = this.login && this.password && this.passwordConfirm;
                let passwordСheck = this.password === this.passwordConfirm;

                if (filledFields && passwordСheck) {
                    //отправка данных на бек - при удачном ответе открываем компнент main
                    // и скрываем компонент Login  
                    this.SET_VISIBILITIES({
                        loginComponentVisible: false,
                        mainComponentVisible: true
                    })
                }
            }
        }    
    }
</script>

