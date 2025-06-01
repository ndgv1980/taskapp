import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './Reducers/todoSlice'
import goalReducer from './Reducers/goalsSlice'
import logger from './Middleware/logger'
import checker from './Middleware/checker'
import optionReducer from './Reducers/optionSlice'

export default configureStore({
    reducer:{
        todos:todoReducer,
        goals:goalReducer,
        option:optionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger,checker)
})