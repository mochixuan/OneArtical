import {
    FONT_SIZE_SMALL,FONT_SIZE_MIDDLE,FONT_SIZE_LARGE,
    MAIN_BG_1,MAIN_BG_2,MAIN_BG_3,MAIN_BG_4,
    STYLE_DAT,STYLE_NIGHT
} from '../constants/ActionTypes'

const MAIN_BGS = ['#f7f7f7','#7bf8ad','#ffd774','#ffc0b4']
const ARTICLE_MAIN_COLOR = '#000000'
const ARTICLE_SECOND_COLOR = '#808080'
const NIGHT_ARTICLE_COLOR = '#e0e0e0'

//随机应变 逻辑完全和原app一样
const initialState = {
    articleFontSize: 18,
    fontSizeIndex: 1,
    articleBg: '#f7f7f7',
    bgIndex: 0,
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
                bgIndex: 0,
                articleBgStyleIndex: 0,
            })
        case MAIN_BG_2:
            return Object.assign({},state,{
                dayStyle: true,
                articleMainColor: ARTICLE_MAIN_COLOR,
                articleBg: MAIN_BGS[1],
                bgIndex: 1,
                articleBgStyleIndex: 1,

            })
        case MAIN_BG_3:
            return Object.assign({},state,{
                dayStyle: true,
                articleMainColor: ARTICLE_MAIN_COLOR,
                articleBg: MAIN_BGS[2],
                bgIndex: 2,
                articleBgStyleIndex: 2,
            })
        case MAIN_BG_4:
            return Object.assign({},state,{
                dayStyle: true,
                articleMainColor: ARTICLE_MAIN_COLOR,
                articleBg: MAIN_BGS[3],
                bgIndex: 3,
                articleBgStyleIndex: 3,
            })
        case STYLE_DAT:
            return Object.assign({},state,{
                dayStyle: true,
                articleMainColor: ARTICLE_MAIN_COLOR,
                articleBg: MAIN_BGS[state.articleBgStyleIndex],
            })
        case STYLE_NIGHT:
            return Object.assign({},state,{
                dayStyle: false,
                articleMainColor: NIGHT_ARTICLE_COLOR,
                articleBg: '#5d7986'
            })
    }

    return state

}