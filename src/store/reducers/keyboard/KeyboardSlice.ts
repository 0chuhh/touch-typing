import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { keyZoneType } from "types/keyZone";


interface KeyboardState {
    leftShift:boolean
    rightShift:boolean
    currentKeyZone:keyZoneType | ''
}

const initialState: KeyboardState = {
    leftShift:false,
    rightShift:false,
    currentKeyZone:''
}

export const keyboardSlice = createSlice({
    name:'keyboard',
    initialState,
    reducers:{
        turnOnLeftShift(state){
            state.leftShift = true
            state.rightShift = false
        },
        turnOnRightShift(state){
            state.leftShift = false
            state.rightShift = true
        },
        turnOffLeftAndRightShift(state){
            state.leftShift = false
            state.rightShift = false
        },
        setCurrentKeyZone(state, action:PayloadAction<keyZoneType>){
            state.currentKeyZone=action.payload
        },
        resetCurrentKeyZone(state){
            state.currentKeyZone = ''
        }
    }
})

export default keyboardSlice.reducer;