import { createStore } from "vuex";

import market from '@/modules/market/store/market'

const store = createStore({
    modules: { 
        market
    }
})

export default store