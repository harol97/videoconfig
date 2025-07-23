import { init } from "@rematch/core";
import storage from "./storage";
import createPersistPlugin from "@rematch/persist";
import { getPersistor } from "@rematch/persist";
// 
const auths = {
    state: {}, 
    reducers: {
        SET(state, payload) {
            return { ...state, ...payload }
        },
        DEL(state, payload) {
            storage.removeItem('persist:root');
            return {}
        },
        SWITCH(state, payload){
            const newUser = {};
            // 
            const fieldsToKeep = ['token', 'email', 'fullName', 'id', 'profileImage', 'description', 'activeRole'];
            fieldsToKeep.forEach(key => {
                if (key in state) {
                    newUser[key] = state[key];
                }
            });
            return {
                ...newUser
            }
        }
    }
};
// 
const models = {
    state: { 
        cardList: [],
        Countries: []
    }, 
    reducers: {
        SET(state, payload) {
            return { ...state, ...payload }
        }
    }
};
// 
const persistPlugin = createPersistPlugin({
	key: 'root',
	storage,
	version: 2,
	whitelist: ['auths']
})
// 
const store = init({ 
    models: {
        auths, 
        models
    },
    plugins: [persistPlugin]
});
// 
const persistor = getPersistor();
// 
export { store, persistor }