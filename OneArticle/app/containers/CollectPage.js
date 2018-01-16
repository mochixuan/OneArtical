import {connect} from 'react-redux'
import Collect from '../components/Collect'
import {changeArticle} from '../action/actions'

const mapStateToProps = (state) => ({
    collectArticles: state.article.collectArticles,
    articleMainColor: state.styles.articleMainColor,
    articleSecondColor: state.styles.articleSecondColor,
    articleBg: state.styles.articleBg,
    articleFontSize: state.styles.articleFontSize,
})

const mapDispatchToProps = (dispatch) => ({
    onClickItem: (article) => {
        dispatch(changeArticle(article))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Collect)