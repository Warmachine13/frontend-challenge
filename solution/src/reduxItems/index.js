import { createStore, applyMiddleware, combineReducers } from 'redux'
//import storage from 'redux-persist/lib/storage'
import storage from 'localforage'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from "redux-thunk";
import logger from "redux-logger";
import { authReducer, placesReducer } from "./ducks";
import createEncryptor from 'redux-persist-transform-encrypt'


const encryptor = createEncryptor({
    secretKey: '4e479c0b44e0b78c66d476631a0b8de6',
    onError: function (error) {
        // Handle the error.
        alert(error)
    }
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [''],
    transforms: [encryptor]
}

const placesConfig = {
    key: 'places',
    storage,
    whitelist: [''],
    transforms: [encryptor]
}
// const empresaConfig = {
//     key: 'empresa',
//     storage,
//     whitelist: [''],
//     transforms: [encryptor]
// }
// const mentorConfig = {
//     key: 'mentor',
//     storage,
//     whitelist: [''],
//     transforms: [encryptor]
// }

const authConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'user'],
    transforms: [encryptor]
}

let reducers = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    places: persistReducer(placesConfig, placesReducer),
})


export default () => {
    const persistedReducer = persistReducer(persistConfig, reducers)
    let store = createStore(persistedReducer, applyMiddleware(thunk, logger))
    let persistor = persistStore(store)
    return { store, persistor }
}