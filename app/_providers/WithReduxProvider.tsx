"use client"

import { useSelector, Provider } from 'react-redux'
import { store } from '../_store/store'
import React from 'react'

export const useReduxState = () => {

    const state = useSelector((state) => state)

    return state

}

const WithReduxState = ({ children } : { children: React.ReactNode }) => {

    return <Provider store={store}>{children}</Provider>

}

export default WithReduxState;