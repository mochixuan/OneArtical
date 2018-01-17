/**
 * 简单的没有异步处理的action放在这里
 * 复杂的异步请求和处理的数据放在sagas里处理
 * 其实可以不用写，但如果以后逻辑发生改变时，它的作用就显现了，
 * 尽量将逻辑层和视图层分开
 * */
import {COLLECT_ARTICLE,SAGA_TODAY_ARTICLE,SAGA_NEXT_ARTICLE,SAGA_PREV_ARTICLE,SAGA_RANDOM_ARTICLE,SPLASH_HIDE,SPLASH_SHOW,CHANGE_ARTICLE,
    FONT_SIZE_SMALL,FONT_SIZE_MIDDLE,FONT_SIZE_LARGE,MAIN_BG_1,MAIN_BG_2,MAIN_BG_3,MAIN_BG_4,CHANGE_MODEL
} from '../constants/ActionTypes'

export const collect = () => ({
    type: COLLECT_ARTICLE
})

export const changeArticle = (article) => ({
    type: CHANGE_ARTICLE,
    articleData: article,
})

export const changeFontSize = (index) => {
    let type = FONT_SIZE_SMALL
    switch (index) {
        case 0:
            type = FONT_SIZE_SMALL
            break
        case 1:
            type = FONT_SIZE_MIDDLE
            break
        case 2:
            type = FONT_SIZE_LARGE
            break
    }
    return {
        type: type
    }
}

export const changeBgColor = (index) => {
    let type = MAIN_BG_1
    switch (index) {
        case 1:
            type = MAIN_BG_2
            break
        case 2:
            type = MAIN_BG_3
            break
        case 3:
            type = MAIN_BG_4
            break
    }
    return {
        type: type
    }
}

export const changeModel = () => ({
    type: CHANGE_MODEL
})

export const hideSplash = () => ({
    type: SPLASH_HIDE
})

export const showSplash = () => ({
    type: SPLASH_SHOW
})

export const todayArticle = () => ({
    type: SAGA_TODAY_ARTICLE
})

export const preArticle = () => ({
    type: SAGA_PREV_ARTICLE
})

export const nextArticle = () => ({
    type: SAGA_NEXT_ARTICLE
})

export const randomArticle = () => ({
    type: SAGA_RANDOM_ARTICLE
})
