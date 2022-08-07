import {configureStore} from '@reduxjs/toolkit';

const stringMiddleware = () => (next: any) => (action: any) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }

    return next(action)
}

const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store