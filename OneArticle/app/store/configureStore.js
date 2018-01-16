import {applyMiddleware,createStore,compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {persistStore,persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/es/storage'
import {logger,crashReporter} from '../middleware/loggerMiddleware'
import rootReducers from '../reducers'
import sagas from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [
    logger,
    crashReporter,
    sagaMiddleware
]

const config = {
    key: 'root',
    storage,
    debug: false
}

const reducers = persistCombineReducers(config,rootReducers)
const enhances = [applyMiddleware(...middlewares)]

export default configureStore = (initialState) => {
    const store = createStore(reducers,initialState,compose(...enhances))
    //persistStore(store,null,null)
    sagaMiddleware.run(sagas)
    return store
}




