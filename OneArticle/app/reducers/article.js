import {REFRESH_ARTICLE_DOING,REFRESH_ARTICLE_DONE,COLLECT_ARTICLE,CHANGE_ARTICLE} from '../constants/ActionTypes'

const initialState = {
    status: REFRESH_ARTICLE_DOING,
    isSuccess: false,
    isCollected: false,
    isToday: true,
    articleData: null,
    cacheArticles: [],
    collectArticles: []
}

//逻辑独立处理
const exchangeCollect = (state) => {
    let collectArticles = state.collectArticles
    try {
        if (state.articleData != null) {
            let index = -1;
            for (let i = 0; i<collectArticles.length;i++) {
                if (collectArticles[i].data.date.curr === state.articleData.data.date.curr) {
                    index = i
                    break
                }
            }
            if (index == -1) {
                collectArticles = [state.articleData,...collectArticles]
            } else {
                collectArticles.splice(index,1)
            }
        }
    } catch (err) {

    }
    return collectArticles
}

//存一份档只留10份 splice从哪里开始截取截取多少位返回被截取了的数据，剩下的就是未被截取的数据赋值给截取对象
const cacheArticles = (state,action) => {
    try {
        if (action.isSuccess && action.articleData.data != null) {
            let cacheArticles = [action.articleData, ...state.cacheArticles];
            return cacheArticles.splice(0,10)

        }
    } catch (error) {

    }
    return state.cacheArticles
}

//将请求过的文章保存一份，请求文章时先查看是否请求，请求过则读换成数据
export default article = (state = initialState,action) => {
    switch (action.type) {
        case REFRESH_ARTICLE_DOING:
            return Object.assign({},state,{
                status: REFRESH_ARTICLE_DOING,
                isSuccess: action.isSuccess
            })
        case REFRESH_ARTICLE_DONE:
            return Object.assign({},state,{
                status: REFRESH_ARTICLE_DONE,
                isSuccess: action.isSuccess,
                articleData:action.isSuccess?action.articleData:state.articleData,
                cacheArticles: cacheArticles(state,action),
                isCollected: action.isSuccess?action.isCollected:state.isCollected,
                isToday: action.isSuccess?action.isToday:state.isToday
            })
        case COLLECT_ARTICLE:
            return Object.assign({},state,{
                isCollected: !state.isCollected,
                collectArticles: exchangeCollect(state)
            })
        case CHANGE_ARTICLE:
            return Object.assign({},state,{
                articleData: action.articleData
            })
    }
    return state
}