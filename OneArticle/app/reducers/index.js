import article from './article'
import splash from './splash'
import styles from './styles'
import storage from 'redux-persist/es/storage'
import {persistReducer} from 'redux-persist'

/*
* 有些数据不需要存储将其忽略，有两种方法可以实现
* 1. 将所以要忽略的state放到一个或者多个reducers里面，这里面的全是需要忽略的状态
* 2. 可以保持每个reducers的特性，每个reduces需要忽略的单独去除来忽略
* 这里选择第二种，可以保持每个reducer按照自己的特性写
* */

const articleConfig = {
    key: 'article',
    storage,
    debug: false,
    blacklist: ['status']
}

const splashConfig = {
    key: 'splash',
    storage,
    debug: false,
    blacklist: ['splashState']
}

const stylesConfig = {
    key: 'styles',
    storage,
    debug: false,
    blacklist: ['modalState']
}

const reducers = {
    article: persistReducer(articleConfig,article),
    splash: persistReducer(splashConfig,splash),
    styles: persistReducer(stylesConfig,styles)
}

export default reducers