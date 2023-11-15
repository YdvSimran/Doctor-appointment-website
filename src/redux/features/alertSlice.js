import {createSlice} from '@reduxjs/toolkit'

export const alertSLice =createSlice({
               name:'alerts',
               initialState:{
                              loading:false,
               },
               reducers:{
                              showLoading: (state)=>{
                               state.loading=true              
                              },
                              hideLoading: (state)=>{
                                             state.loading=false
                              }
               }
})
export const {showLoading,hideLoading}=alertSLice.actions