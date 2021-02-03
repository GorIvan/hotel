<template>
    <div class="account-wrapper">
        <div class="account-header">
            <div>
                User account
            </div>
            <div  @click="openMain()">
                Back to booking
            </div>
        </div>
        <div class="account-content">
            <div class="requests-wrapper">
                <div>
                    Your booking requests
                </div>
                <div class="message">
                    {{requestsMessage}}
                </div>
            </div>

            <div class="invoices-wrapper">
                <div>
                    Your invoices
                </div>
                <div class="message">
                    {{invoicesMessage}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/assets/styles/account.scss';
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        name: 'Account',

        data () {
            return {
                invoicesMessage: 'You have no invoices',
                requestsMessage: 'You have no rooms booked'
            }
        },

        computed: {
            ...mapGetters(['GET_VISIBILITIES'])           
        },

        methods: {
            ...mapMutations([ 'SET_VISIBILITIES' ]),
        
            openMain: function() {
                this.SET_VISIBILITIES({
                    accountComponentVisible: false,
                    mainComponentVisible: true 
                })
            }
        }         
    }
</script>
