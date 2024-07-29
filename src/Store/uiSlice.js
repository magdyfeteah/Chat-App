import { createSlice } from "@reduxjs/toolkit";


const initialState = {showDetail : false}
const uiSlice = createSlice({
    name : "ui",
    initialState,
    reducers : {
        handleDetail  (state , action){
            state.showDetail = !state.showDetail
        }
    }
})


export const uiActions = uiSlice.actions

export default uiSlice