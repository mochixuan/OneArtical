import articleSaga from './articleSaga'
import {fork} from 'redux-saga/effects'

const allSagas = function* () {
    yield fork(articleSaga)
}

export default allSagas