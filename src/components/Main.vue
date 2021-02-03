<template>
    <div class="main-wrapper">
        <div class="main-header">
            <div class="menu-container">
                <img src="@/assets/img/logo.png" class="logo">
                <div class="menu-item">
                    
                </div>
            </div>

            <div class="menu-container">
                <div class="menu-item" @click="openAccount()">
                    User account
                </div>
                <div class="line"></div>
                <div class="menu-item" @click="logOut">
                    Log out
                </div>
                <div class="line"></div>
                <div class="menu-item">
                   <span class="language">EN</span>
                   <span class="language">UA</span>
                </div>
            </div>
        </div>    

        <div class="main-content">
            <div class="reservation-wrapper">
                <div class="reservation main-block">
                    <div class="main-block-info">
                        {{ reservationInfoMessage }}
                    </div>
                    <select v-model="request.ApartmentsClass">
                        <option 
                            value="" 
                            class="select-placeholder"
                            disabled
                            selected
                        >
                            Select apartments class
                        </option>
                        <option>
                            Second-class
                        </option>
                        <option>
                            First-class
                        </option>
                        <option>
                            Lux-class
                        </option>
                    </select>
                    <input 
                        type="number" 
                        placeholder="Number of guests"
                        maxlength="100"
                        min="1"
                        v-model="request.number"
                    >
                    <div class="reservation-date-picker">
                        <label for="arrival">
                            Arrival:
                        </label>
                        <input 
                            type="date" 
                            id="arrival"
                            :min="currentDate"
                            v-model="request.arrival" 
                        >
                        <label for="departure">
                            Departure:
                        </label>
                        <input 
                            type="date" 
                            id="departure" 
                            :min="currentDate"
                            v-model="request.departure" 
                        >
                    </div>
                    <div class="main-button" @click="reserve">
                        Reserve a room
                    </div>
                </div>
            </div>

            <div class="rooms-wrapper">
                <div class="rooms main-block">
                    <div class="rooms-header">
                        <div class="rooms-header-description">
                            Show by
                        </div>

                        <div 
                            class="sort-button"
                            @click="sortRooms('Price')"
                        >
                            Price
                        </div>
                        <div 
                            class="sort-button"
                            @click="sortRooms('Guests number')"
                        >
                            Guests number
                        </div>
                        <div 
                            class="sort-button"
                            @click="sortRooms('Apartment class')"
                        >
                            Apartment class
                        </div>
                        <div 
                            class="sort-button"
                            @click="sortRooms('Apartment status')"
                        >
                            Apartment status
                        </div>
                        <div class="date-selection">
                            <label for="dateSelectionArrival">
                                Arrival:
                            </label>
                            <input 
                                type="date" 
                                id="dateSelectionArrival"
                                :min="currentDate"
                                v-model="dateSelection.arrival" 
                            >
                            <label for="dateSelectionDeparture">
                                Departure:
                            </label>
                            <input 
                                type="date" 
                                id="dateSelectionDeparture" 
                                :min="currentDate"
                                v-model="dateSelection.departure"
                                v-on:change="selectFreeRooms()"
                            >
                        </div>
                    </div>

                    <div 
                        class="room-item-wrapper"
                        v-for="(item, index) in rooms" 
                        :key="index"
                    >
                        <div class="room-container">
                            <div class="room-item">
                                <b>{{item.description}}</b>
                                <img :src="item.photo">
                            </div>
                            <div class="room-item">
                                <b>Price:</b> <br>
                                {{item.price}}$
                            </div>
                            <div class="room-item">
                                <b>Guests number:</b> <br>
                                {{item.numberOfGuests}}
                            </div>
                            <div class="room-item">
                                <b>Apartment class:</b> <br>
                                {{item.apartmentClass}}
                            </div>
                            <div class="room-item">
                                <b>Apartment status:</b> <br>
                                {{item.apartmentStatus}}
                            </div>
                            <img 
                                src="@/assets/img/plus.png" 
                                class="plus"
                                v-if="item.apartmentStatus === 'free'"
                                @click="bookRoom(item)"
                            >
                        </div>
                        <div class="room-line"></div>
                    </div>    
                </div>
            </div>
        </div>

        <div class="main-footer">
            <div class="social-networks">
                <a href="https://www.facebook.com/" target="_blank">
                    <img src="@/assets/img/facebook.svg" alt="facebook">
                </a>
                <a href="https://twitter.com/" target="_blank">
                    <img src="@/assets/img/twitter.svg" alt="twitter">
                </a>
                <a href="https://www.instagram.com/" target="_blank">
                    <img src="@/assets/img/Instagram.svg" alt="Instagram">
                </a>
            </div>

            <div class="footer-info">
                <div class="footer-info__item">
                    <div>111-222-333</div>
                    <div>Call us, it's toll-free</div>
                </div>
                <div class="footer-info__item">
                    ©2021 Super Hotel
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import '@/assets/styles/main.scss'
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        name: 'Main',

        data () {
            return {
                request: {
                    number: '',
                    ApartmentsClass: '',
                    arrival: '',
                    departure: ''
                },
                dateSelection: {
                    arrival: '',
                    departure: ''
                },
                currentDate: '',              
                reservationInfoMessage: 'Leave your request and our manager will contact you',
                reservationInfo: [
                    'Thank you for contacting us! Our manager will send your booking confirmation to your personal account',
                    'Fill all fields please'
                ],
                rooms: [],
                roomsSorted: {
                    priceSorted: false,
                    guestsNumberSorted: false,
                    apartmentClassSorted: false,
                    apartmentStatusSorted: false
                }
            }
        },

        computed: {
            ...mapGetters([ 'GET_VISIBILITIES', 'GET_ROOMS' ])           
        },

        mounted () {
            let	date = new Date();
            let day = ("0" + date.getDate()).slice(-2);
            let month = ("0" + (date.getMonth() + 1)).slice(-2);
            let today = date.getFullYear() + "-" + (month) + "-" + (day);
            this.currentDate = today;
            this.request.arrival = today;
            this.request.departure = today;
            this.dateSelection.arrival = today;
            this.dateSelection.departure = today;
            
            this.rooms = this.GET_ROOMS;
        },

        methods: {
            ...mapMutations([ 'SET_VISIBILITIES' ]),

            openAccount: function() {
                this.SET_VISIBILITIES({
                    mainComponentVisible: false,
                    accountComponentVisible: true 
                })
            },

            logOut: function() {
                this.SET_VISIBILITIES({
                    mainComponentVisible: false,
                    accountComponentVisible: false,
                    loginComponentVisible: true
                })
            },

            reserve: function() {
                //если все поля заявки заполнены отправляем на бек
                if (this.request.number && this.request.number > 0 && this.request.ApartmentsClass && this.request.departure > this.request.arrival) {
                    //обновялем сообщение "запрос отправлен менеджеру"
                    this.reservationInfoMessage = this.reservationInfo[0];
                    console.log(this.request);
                } else {
                    //если не все поля заполнены обновляем сообщение с ошибкой
                    this.reservationInfoMessage = this.reservationInfo[1]
                }
            },

            bookRoom: function(room) {
                console.log(room);
            },

            selectFreeRooms: function() {
                if (this.dateSelection.departure > this.dateSelection.arrival) {
                    console.log(this.dateSelection)
                    //запрос на сервер отфильтрованных номеров по дате
                }
            },

            sortRooms: function (value) {
                let rooms = this.GET_ROOMS;

                switch (value) {
                    case 'Price':
                        if (!this.roomsSorted.priceSorted) {
                            rooms.sort(( a, b ) => b.price - a.price);
                            this.roomsSorted.priceSorted = true;
                        } else {
                            rooms.sort(( a, b ) => a.price - b.price);
                            this.roomsSorted.priceSorted = false;
                        }
                        this.rooms = rooms
                        break;

                    case 'Guests number':
                        if (!this.roomsSorted.guestsNumberSorted) {
                            rooms.sort(( a, b ) => b.numberOfGuests - a.numberOfGuests);
                            this.roomsSorted.guestsNumberSorted = true;
                        } else {
                            rooms.sort(( a, b ) => a.numberOfGuests - b.numberOfGuests);
                            this.roomsSorted.guestsNumberSorted = false;
                        }
                        this.rooms = rooms
                        break;

                    case 'Apartment class':
                        let secondСlass = rooms.filter(function(item) {
                                return item.apartmentClass === 'Second-class'
                            });                        
                        let firstClass = rooms.filter(function(item) {
                                return item.apartmentClass === 'First-class'
                            });
                        let luxClass = rooms.filter(function(item) {
                                return item.apartmentClass === 'Lux-class'
                            });
                                                
                        rooms = [].concat(luxClass, firstClass, secondСlass);

                        if (!this.roomsSorted.apartmentClassSorted) {
                            this.rooms = rooms;
                            this.roomsSorted.apartmentClassSorted = true;
                        } else {
                            this.rooms = rooms.reverse();
                            this.roomsSorted.apartmentClassSorted = false;
                        }
                        break;

                    case 'Apartment status':
                        let free = rooms.filter(function(item) {
                                return item.apartmentStatus === 'free'
                            });                        
                        let booked = rooms.filter(function(item) {
                                return item.apartmentStatus === 'booked'
                            });
                        let occupied = rooms.filter(function(item) {
                                return item.apartmentStatus === 'occupied'
                            });
                        let unavailable = rooms.filter(function(item) {
                                return item.apartmentStatus === 'unavailable'
                            });

                        rooms = [].concat(free, booked, occupied, unavailable);

                        if (!this.roomsSorted.apartmentStatusSorted) {
                            this.rooms = rooms;
                            this.roomsSorted.apartmentStatusSorted = true;
                        } else {
                            this.rooms = rooms.reverse();
                            this.roomsSorted.apartmentStatusSorted = false;
                        }
                        break;
                }
            }
        }    
    }
</script>

