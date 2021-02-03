<template>
    <div id="app">
        <Login v-if="GET_VISIBILITIES.loginComponentVisible" />
        <Main v-if="GET_VISIBILITIES.mainComponentVisible" />
        <Account v-if="GET_VISIBILITIES.accountComponentVisible" />
    </div>
</template>

<script>
    import Login from '@/components/Login.vue';
    import Main from '@/components/Main.vue';
    import Account from '@/components/Account.vue';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'App',

        data () {
            return {
                        
            }
        },

        components: {
            Login,
            Main,
            Account
        },
        
        mounted () {
        
        },

        computed: {
            ...mapGetters(['GET_VISIBILITIES'])           
        },
         
        methods: {
            ...mapActions([  ]),
        }    
    }
</script>

<style lang="scss">
    html {
        height: 100%;
    }
    body {
        height: 100%;
        padding: 0;
        margin: 0;

        #app {
            height: 100%;
        }

        * {
            box-sizing: border-box;
        }

        .logo {
            padding: 10px;
            height: 70px;
            margin-left: 15px;
            margin-right: 30px;
            align-self: center;
        }
    }
</style>
