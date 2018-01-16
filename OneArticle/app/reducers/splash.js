import {SPLASH_SHOW,SPLASH_HIDE} from '../constants/ActionTypes'

//刚进入时进行数据判断和请求，作用标记是否取消了screenpage和第一次是否请求结束
const initialState = {
    splashState: SPLASH_SHOW
}

export default splash = (state = initialState,action) => {
    switch (action.type) {
        case SPLASH_SHOW:
            return Object.assign({},state,{
                splashState: SPLASH_SHOW
            })
        case SPLASH_HIDE:
            return Object.assign({},state,{
                splashState: SPLASH_HIDE
            })
    }
    return state
}