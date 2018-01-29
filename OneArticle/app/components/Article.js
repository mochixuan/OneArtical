import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native'
import {ParallaxScrollView,DEFAULT_NAVBAR_HEIGHT} from '../widget/ParallaxScrollView'

const {width,height}  = Dimensions.get('window')

export default class Article extends Component {

    render() {
        return (
            <ParallaxScrollView
                windowHeight={DEFAULT_NAVBAR_HEIGHT}
                navBarTitle={this.getArticleTitle()}
                navBarColor={this.props.articleBg}
                isShowLoading={this.props.isLoading}
                navBarTitleColor = {this.props.articleSecondColor}
                headerView={this._renderNavBarHeaderView()}>
                {this._renderMainView()}
            </ParallaxScrollView>
        )
    }



    _renderMainView() {
        let mainView = <View style={[styles.container_empty,{backgroundColor: this.props.articleBg}]}/>
        let maskLineColor = this.props.dayStyle?'#dcdcdc':'#454746'
        if (this.props.articleData != null) {
            mainView = (
                <View style={[styles.container,{
                    backgroundColor: this.props.articleBg}]}>
                    <Text style={[styles.title,{
                        fontSize: this.props.articleFontSize+4,
                        color: this.props.articleMainColor
                    }]}>{this.props.articleData.title}</Text>
                    <View style={[styles.mask,{backgroundColor:maskLineColor}]}/>
                    <Text style={[styles.author,{
                        fontSize: this.props.articleFontSize-4,
                        color: this.props.articleSecondColor
                    }]}>{this.props.articleData.author}</Text>
                    <Text style={[styles.content,{
                        fontSize: this.props.articleFontSize,
                        color: this.props.articleMainColor,
                        lineHeight: this.props.articleFontSize*1.6
                    }]}>{this.analysisContent(this.props.articleData.content)}</Text>
                    <View style={[styles.mask,{backgroundColor:maskLineColor}]}/>
                    <Text style={{
                        width,
                        height: 42,
                        fontSize: this.props.articleFontSize-4,
                        lineHeight: 17+this.props.articleFontSize/2,
                        textAlign: 'center',
                    }}>全文完  共{this.props.articleData.wc}字</Text>
                </View>
            )
        }
        return mainView
    }

    _renderNavBarLeftView() {
        return (<TouchableOpacity onPress={()=>{}}>
            <Image
                style={styles.icon}
                source={require('../data/img/menu_left.png')}
            />
        </TouchableOpacity>)
    }

    _renderNavBarRightView() {
        return (<TouchableOpacity onPress={()=>{

        }}>
            <Image
                style={styles.icon}
                source={require('../data/img/menu_right.png')}
            />
        </TouchableOpacity>)
    }

    _renderNavBarHeaderView() {
        return (
            <View style={{
                backgroundColor: this.props.articleBg,
                width,
                flex:1 }}/>
        )
    }

    getArticleTitle() {
        if (this.props.articleData == null) {
            return ""
        } else if (this.props.isLoading) {
            return "* * *"
        }
        return this.props.articleData.title
    }

    analysisContent(content) {
        return content.split('<p>')
                    .map((item)=> "        "+item)
                    .join('')
                    .split('</p>')
                    .join("\n\n");
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        alignItems: 'center',
        flexDirection: 'column',
        paddingLeft: 12,
        paddingRight: 12,

    },
    container_empty: {
        flex: 1,
        width,
        height,
        alignItems: 'center',
        flexDirection: 'column',
        paddingLeft: 12,
        paddingRight: 12,

    },
    icon: {
        width: 26,
        height: 26,
        resizeMode: 'contain'
    },
    title: {

    },
    mask: {
        backgroundColor: '#dcdcdc',
        alignSelf: 'center',
        height: 2,
        width: width*0.9,
        marginTop: 8,
        marginBottom: 6,
        borderRadius:1,
    },
    author: {
        marginBottom: 16
    },
    content: {
        lineHeight: 30,
        alignSelf: 'center',
    },
})
