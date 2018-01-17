import {
    FONT_SIZE_SMALL,FONT_SIZE_MIDDLE,FONT_SIZE_LARGE,
    MAIN_BG_1,MAIN_BG_2,MAIN_BG_3,MAIN_BG_4,
    CHANGE_MODEL,
} from '../constants/ActionTypes'
import {MAIN_BGS} from '../constants/DataConstants'

const ARTICLE_MAIN_COLOR = '#000000'
const ARTICLE_SECOND_COLOR = '#808080'
const NIGHT_ARTICLE_FONT_COLOR = '#656766'
const NIGHT_ARTICLE_BG_COLOR = '#313639'

//随机应变 逻辑完全和原app一样
const initialState = {
    articleFontSize: 18,
    fontSizeIndex: 1,
    articleBg: '#f7f7f7',
    articleMainColor: ARTICLE_MAIN_COLOR,
    articleSecondColor: ARTICLE_SECOND_COLOR,
    articleBgStyleIndex: 0,
    dayStyle: true
}

export default styles = (state = initialState,action) => {

    switch (action.type) {
        case FONT_SIZE_SMALL:
            return Object.assign({},state,{
                articleFontSize: 16,
                fontSizeIndex: 0,
            })
        case FONT_SIZE_MIDDLE:
            return Object.assign({},state,{
                articleFontSize: 18,
                fontSizeIndex: 1,
            })
        case FONT_SIZE_LARGE:
            return Object.assign({},state,{
                articleFontSize: 20,
                fontSizeIndex: 2,
            })
        case MAIN_BG_1:
            return Object.assign({},state,{
                dayStyle: true,
                articleMainColor: ARTICLE_MAIN_COLOR,
                articleBg: MAIN_BGS[0],
                articleBgStyleIndex: 0,
            })
        case MAIN_BG_2:
            return Object.assign({},state,{
                dayStyle: true,
                articleMainColor: ARTICLE_MAIN_COLOR,
                articleBg: MAIN_BGS[1],
                articleBgStyleIndex: 1,

            })
        case MAIN_BG_3:
            return Object.assign({},state,{
                dayStyle: true,
                articleMainColor: ARTICLE_MAIN_COLOR,
                articleBg: MAIN_BGS[2],
                articleBgStyleIndex: 2,
            })
        case MAIN_BG_4:
            return Object.assign({},state,{
                dayStyle: true,
                articleMainColor: ARTICLE_MAIN_COLOR,
                articleBg: MAIN_BGS[3],
                articleBgStyleIndex: 3,
            })
        case CHANGE_MODEL:
            let dayStyle = true
            let articleMainColor = ARTICLE_MAIN_COLOR
            let articleBg = MAIN_BGS[state.articleBgStyleIndex]
            if (state.dayStyle) {
                dayStyle = false
                articleMainColor = NIGHT_ARTICLE_FONT_COLOR,
                articleBg =  NIGHT_ARTICLE_BG_COLOR
            }
            return Object.assign({},state,{
                dayStyle,
                articleMainColor,
                articleBg,
            })
    }

    return state

}