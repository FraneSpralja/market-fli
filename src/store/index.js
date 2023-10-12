import { createStore } from "vuex";

import market from '@/modules/market/store/market'
import user from '@/modules/user/store/user'

const store = createStore({
    modules: { 
        market,
        user
    }
})

export default store