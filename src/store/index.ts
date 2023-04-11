import { combineReducers, configureStore } from "@reduxjs/toolkit";
import keyboardReducer from './reducers/keyboard/KeyboardSlice'
const rootReducer = combineReducers({
    keyboardReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']