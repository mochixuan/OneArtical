import {connect} from 'react-redux'
import ControlPanelView from '../components/ControlPanelView'
import {collect, nextArticle, preArticle, randomArticle, todayArticle,switchStylesModalState} from '../action/actions'
import {CONTROL1,CONTROL2,OTHERS} from '../constants/DataConstants'

const mapStateToProps = (state)=> ({
    controls: state.article.isToday?CONTROL1:[...CONTROL1,...CONTROL2],
    others:OTHERS,
    isCollected: state.article.isCollected
})

//这个类处理item逻辑
const mapDispatchToProps = (dispatch,ownProps) => ({
    onClickItem: (key)=> {
        ownProps.onCloseDrawer()
        dealtClickItem(dispatch,key,ownProps)
    }
})

const dealtClickItem = (dispatch,key,ownProps) => {
    switch (key) {
        case 0:
            dispatch(collect())
            break
        case 1:
            break
        case 2:
            dispatch(preArticle())
            break
        case 3:
            dispatch(randomArticle())
            break
        case 4:
            dispatch(nextArticle())
            break
        case 5:
            dispatch(todayArticle())
            break
        case 6:
            ownProps.navigation.navigate('CollectPage')
            break
        case 7:
            dispatch(switchStylesModalState(true))
            break
        case 8:
            break
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ControlPanelView)