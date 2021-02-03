import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        visibilities: {
            loginComponentVisible: true,
            mainComponentVisible: false,
            accountComponentVisible: false   
        },

        rooms: [
            {
                roomId: '',            //number??
                price: 1000,            //number
                numberOfGuests: 5,      //number
                apartmentClass: 'First-class',     // Second-class, First-class, Lux-class     
                apartmentStatus: 'free',     //free, booked, occupied, unavailable
                description: 'Watermelon room',     //string
                photo: 'https://media.istockphoto.com/photos/hotel-room-suite-with-view-picture-id627892060?k=6&m=627892060&s=612x612&w=0&h=lVIi3QTDsZ1UDnMAjuy8ob9Zm6sBPCZ84x_e_OUl7Wk='     //string
            },
            {
                roomId: '',            //number??
                price: 1000,            //number
                numberOfGuests: 5,      //number
                apartmentClass: 'First-class',     // Second-class, First-class, Lux-class     
                apartmentStatus: 'unavailable',     //free, booked, occupied, unavailable
                description: 'Watermelon room',     //string
                photo: 'https://media.istockphoto.com/photos/cozy-studio-apartment-design-with-bedroom-and-living-space-picture-id954121470?k=6&m=954121470&s=612x612&w=0&h=Z9ConkSCZt8YsTutrU-eEfYKMvQJqS9la2fNEQ0oc0M='
            },
            {
                roomId: '',            //number??
                price: 1000,            //number
                numberOfGuests: 5,      //number
                apartmentClass: 'First-class',     // Second-class, First-class, Lux-class     
                apartmentStatus: 'occupied',     //free, booked, occupied, unavailable
                description: 'Watermelon room',     //string
                photo: 'https://media.istockphoto.com/photos/interior-of-a-modern-luxury-hotel-double-bed-bedroom-picture-id1163498940?k=6&m=1163498940&s=612x612&w=0&h=NEsid6vx4Lfy-6hrZoPJacuvgk_krlxS8yI9VD5Wl7M='
            },
            {
                roomId: '',            //number??
                price: 500,            //number
                numberOfGuests: 3,      //number
                apartmentClass: 'Second-class',     // Second-class, First-class, Lux-class     
                apartmentStatus: 'free',     //free, booked, occupied, unavailable
                description: 'Raspberry room',     //string
                photo: 'https://media.istockphoto.com/photos/render-modern-bedroom-picture-id1161026663?k=6&m=1161026663&s=612x612&w=0&h=G9sQshRjqFLEmzZ8RsFgvgY4sIR5EhegMljO5LCPV4w='
            },
            {
                roomId: '',            //number??
                price: 500,            //number
                numberOfGuests: 3,      //number
                apartmentClass: 'Second-class',     // Second-class, First-class, Lux-class     
                apartmentStatus: 'free',     //free, booked, occupied, unavailable
                description: 'Raspberry room',     //string
                photo: 'https://media.istockphoto.com/photos/3d-rendering-modern-luxury-bedroom-suite-and-bathroom-picture-id928431714?k=6&m=928431714&s=612x612&w=0&h=IBnf0aE9zEmsaJ3nLep6UmK4u-KYQPdEQa6LY30Ivn4='
            },
            {
                roomId: '',            //number??
                price: 350,            //number
                numberOfGuests: 3,      //number
                apartmentClass: 'Second-class',     // Second-class, First-class, Lux-class     
                apartmentStatus: 'booked',     //free, booked, occupied, unavailable
                description: 'Cherry room',     //string
                photo: 'https://media.istockphoto.com/photos/clean-and-modern-hotel-suite-picture-id1098012526?k=6&m=1098012526&s=612x612&w=0&h=Of5BgciVFqorKzUtZOUTtnfsjQzozGWtC2_T-lLvUCs='
            },
            {
                roomId: '',            //number??
                price: 350,            //number
                numberOfGuests: 2,      //number
                apartmentClass: 'Second-class',     // Second-class, First-class, Lux-class     
                apartmentStatus: 'booked',     //free, booked, occupied, unavailable
                description: 'Cherry room',     //string
                photo: 'https://media.istockphoto.com/photos/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-tv-and-picture-id1213885014?k=6&m=1213885014&s=612x612&w=0&h=MVEP1q4p_kPlLuojmn5OQ9PATrT8xAG1XvLAglzY7KY='
            },
            {
                roomId: '',            //number??
                price: 1800,            //number
                numberOfGuests: 3,      //number
                apartmentClass: 'Lux-class',     // Second-class, First-class, Lux-class     
                apartmentStatus: 'free',     //free, booked, occupied, unavailable
                description: 'Pineapple room',     //string
                photo: 'https://media.istockphoto.com/photos/modern-luxury-bedroom-with-ocean-view-picture-id1139085698?k=6&m=1139085698&s=612x612&w=0&h=iSMIW4DYzLPAhSu_Oe7cURBT4x8cCXX8pXfYsBOOsUw='
            },
            {
                roomId: '',            //number??
                price: 1400,            //number
                numberOfGuests: 2,      //number
                apartmentClass: 'Lux-class',     // Second-class, First-class, Lux-class     
                apartmentStatus: 'free',     //free, booked, occupied, unavailable
                description: 'Orange room',     //string
                photo: 'https://media.istockphoto.com/photos/luxury-bedroom-interior-picture-id1141951033?k=6&m=1141951033&s=612x612&w=0&h=h3FLCHrI8QXRKNTvzMEdZwOR6R01WrQGrpxKPnw8CnE='
            }
        ]
    },

    getters: {
        GET_VISIBILITIES (state) {
            return state.visibilities
        },

        GET_ROOMS (state) {
            return state.rooms
        },
    },

    mutations: {
        //обновляем объект visibilities
        //value приходит в виде {name: boolean, ...}
        SET_VISIBILITIES (state, value) {
    		Object.assign(state.visibilities, value)
        }
    },

    actions: {

    }
})
