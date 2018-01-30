import {REFRESH_ARTICLE_DOING,REFRESH_ARTICLE_DONE,SAGA_TODAY_ARTICLE,SAGA_NEXT_ARTICLE,SAGA_PREV_ARTICLE,SAGA_RANDOM_ARTICLE} from '../constants/ActionTypes'
import {put,take,fork,cancel,call,select} from 'redux-saga/effects'
import {getTodayArticle,getSpecifiedArticle,getRandomArticle} from '../data/api'
import {getCurSystemTime} from '../utils/Util'

const sagaRequestActions = [
    SAGA_TODAY_ARTICLE,
    SAGA_PREV_ARTICLE,
    SAGA_NEXT_ARTICLE,
    SAGA_RANDOM_ARTICLE
]

/*
* Saga最好是独立于state数据,不应依赖 Store的state
* 这里为了实现数据层的所以都在saga里处理，所以使用select获取articleData,但不改变数据
* 也可以在ControlPanel里实现逻辑，但为了数据的来源唯一性，写在这里
* */

/*
* 判断是否有数据
* */
const getCachedArticle = (article,type) => {
    let cacheArticle = null;
    let date = null;
    try {
        const {cacheArticles,articleData} = article
        switch (type) {
            case SAGA_TODAY_ARTICLE:
                date = getCurSystemTime()
                break
            case SAGA_PREV_ARTICLE:
                date = articleData.data.date.prev
                break
            case SAGA_NEXT_ARTICLE:
                date = articleData.data.date.next
                break
        }
        for (let i=0;i<cacheArticles.length;i++) {
            if (cacheArticles[i].data.date == date) {
                cacheArticle = cacheArticles[i].articleData
                break
            }
        }
    } catch (error) {
    }
    return cacheArticle;
}

/*
* 判断文章是否被收藏过
* */
const isCollectedCurArticle = (article,articleData) => {
    try {
        const collectArticles = article.collectArticles
        const curArticleDate = articleData.data.date.curr
        if (collectArticles == null || collectArticles.length == 0) return false
        let index = -1;
        for (let i = 0; i<collectArticles.length;i++) {
            if (collectArticles[i].data.date.curr === curArticleDate) {
                index = i
                break
            }
        }
        if (index != -1)
            return true
    } catch (error) {
    }
    return false
}

/*
* 加了个获取缓存数据
*
* */
function* dealtData(action) {
    let articleData ;
    const article = yield select((state) => state.article)
    if (action.type === SAGA_RANDOM_ARTICLE) {
        articleData = yield call(getRandomArticle)
    } else {
        if (article.articleData == null || article.articleData.data == null || article.cacheArticles.length == 0) { //没有数据则先请求数据，没有缓存数据也没有数据
            articleData = yield call(getTodayArticle)
        } else {
            articleData = getCachedArticle(article,action.type)
            if (articleData == null) {
                switch (action.type) {
                    case SAGA_TODAY_ARTICLE:
                        articleData = yield call(getTodayArticle)
                        break
                    case SAGA_NEXT_ARTICLE:
                        articleData = yield call(getSpecifiedArticle,article.articleData.data.date.next)
                        break
                    case SAGA_PREV_ARTICLE:
                        articleData = yield call(getSpecifiedArticle,article.articleData.data.date.prev)
                        break
                }
            }
        }
    }
    //console.log("articleData",articleData)
    //console.log("article",article)
    if (articleData != null && articleData.data != null) {
        const isToday = (getCurSystemTime() === articleData.data.date.curr)
        const isCollected = isCollectedCurArticle(article,articleData)
        yield put({
            type: REFRESH_ARTICLE_DONE,
            isSuccess: true,
            articleData,
            isToday,
            isCollected
        })
    } else {
        yield put({
            type: REFRESH_ARTICLE_DONE,
            isSuccess: false,
        })
    }
}


/*
* 文章显示只有一篇，请求数据时最多也只能有一种
*   1.解释当请求今天文章花费10s,请求特定一天今天文章需要4s当请求今天文章后2s后请求特定一天文章结果是
*       6s后特定一天文章出来了，刷新。10s后今天文章刷新出来了，这结果显然不对吧。
*       正常是2s后取消当前正在请求的所以文章，在进行新的请求这样才对，这就是下面的写法的解释。
*   2. 解释下take加cancel可以编写出takeLatest，fork第一个参数:需是 Generator 函数, 或者返回 Promise 的普通函数
* */
function* watchRequestArticle() {
    let lastTask
    while (true) {
        const action = yield take(sagaRequestActions)
        if (lastTask) {
            yield cancel(lastTask)
        }
        yield put({type: REFRESH_ARTICLE_DOING})
        switch (action.type) {
            case SAGA_TODAY_ARTICLE:
                lastTask = yield fork(dealtData,action)
                break
            case SAGA_PREV_ARTICLE:
                lastTask = yield fork(dealtData,action)
                break
            case SAGA_NEXT_ARTICLE:
                lastTask = yield fork(dealtData,action)
                break
            case SAGA_RANDOM_ARTICLE:
                lastTask = yield fork(dealtData,action)
                break
        }
    }
}

export default watchRequestArticle
