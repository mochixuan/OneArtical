import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Dimensions
} from 'react-native'
import {connect} from 'react-redux'
import Article from '../components/Article'
import SplashScreen from 'react-native-splash-screen'
import {REFRESH_ARTICLE_DONE,SPLASH_SHOW} from '../constants/ActionTypes'
import {todayArticle,hideSplash,changeFontSize,changeBgColor,changeModel} from '../action/actions'
import ModalSettings from '../components/ModalSettings'

const {width} = Dimensions.get('window')

class ArticlePage extends Component {

    componentDidMount() {
        this.props.todayArticle()
    }

    shouldComponentUpdate(nextProps,nextState) {
        if (nextProps.article.status == REFRESH_ARTICLE_DONE
            && nextProps.splash.splashState == SPLASH_SHOW) {
            this.props.hideSplash()
            SplashScreen.hide()
        }
        return true
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={true}
                    translucent={true}
                    networkActivityIndicatorVisible={false}
                />
                <Article
                    articleData = {this.props.article.articleData==null?null:this.props.article.articleData.data}
                    articleFontSize = {this.props.styles.articleFontSize}
                    articleMainColor =  {this.props.styles.articleMainColor}
                    articleSecondColor =  {this.props.styles.articleSecondColor}
                    dayStyle = {this.props.styles.dayStyle}
                    articleBg =  {this.props.styles.articleBg}/>
                <View style={styles.modal}>
                    <ModalSettings
                        styles = {this.props.styles}
                        changeFontSize = {this.props.changeFontSize}
                        changeBgColor = {this.props.changeBgColor}
                        changeModel = {this.props.changeModel}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
    },
    modal: {
        position: 'absolute',
        bottom: 0,
    }
})

const mapStateToProps = (state) => ({
    splash: state.splash,
    article: state.article,
    styles: state.styles
})

const mapDispatchToProps = (dispatch) => ({
    todayArticle: () => {
        dispatch(todayArticle())
    },
    hideSplash: () => {
        dispatch(hideSplash())
    },
    changeFontSize: (index) => {
        dispatch(changeFontSize(index))
    },
    changeBgColor: (index) => {
        dispatch(changeBgColor(index))
    },
    changeModel: () => {
        dispatch(changeModel())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(ArticlePage)