import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    WebView,
    Platform,
    BackHandler
} from 'react-native'

const WEB_VIEW = 'app_web_view'

export default class AppWebView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            canGoBack: false,
        }

    }

    componentWillMount() {
        if (Platform.OS === "android") {
            BackHandler.addEventListener('hardwareBackPress',this.onBackAndroid)
        }
    }

    componentWillUnMount() {
        if (Platform.OS === "android") {
            BackHandler.removeEventListener('hardwareBackPress')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    ref = {WEB_VIEW}
                    javaScriptEnabled = {true}
                    source = {{
                        uri: this.props.url
                    }}
                    startInLoadingState = {true}
                    onNavigationStateChange = {this.onNavigationStateChange.bind(this)}
                    onLoadStart = {this.onLoadStart.bind(this)}
                    onLoad = {this.onLoad.bind(this)}
                    onLoadEnd = {this.onLoadEnd.bind(this)}
                    onError = {this.onError.bind(this)}
                />
            </View>
        )
    }

    //监听原生返回键事件
    onBackAndroid = () => {
        if (this.state.canGoBack) {
            this.refs[WEB_VIEW].goBack();
            return true;
        } else {
            return false;
        }
    }

    //加载开始时调用
    onLoadStart(e) {

    }

    //加载成功时调用
    onLoad(e) {

    }

    onError(e) {

    }

    //加载结束时（无论成功或失败）调用
    onLoadEnd(e) {

    }

    //设置一个函数，返回一个视图用于显示错误
    renderError() {

    }

    //设置一个函数，返回一个加载指示器
    renderLoading() {

    }

    //导航栏改变: 导航状态发生改变时，如：(加载完成，加载中，加载错误)
    onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack
        })
    }

    //startInLoadingState: 初始化加载状态，（true：一打开页面，就加载、false：默认不加载）

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})