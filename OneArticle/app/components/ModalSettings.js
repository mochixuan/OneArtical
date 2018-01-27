import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    Animated,
    TouchableOpacity,
} from 'react-native'
import FontSelectorView from '../widget/FontSelectorView'
import BgSelectorView from '../widget/BgSelectorView'
import Switch from '../widget/Switch'
import {MAIN_BGS,SHOW_STYLE_SETTING_MODAL,NO_SHOW_MODAL,SHOW_SHARE_MODAL} from '../constants/DataConstants'
import ModalView from '../widget/ModalView'

const {width} = Dimensions.get('window')

export default class ModalSettings extends Component {

    render() {
        const modalState = this.props.styles.modalState
        return (
            <ModalView
                isShow={modalState != NO_SHOW_MODAL}
                height={210}
                onTouchOutSide = {()=>{
                    this.props.switchStylesModalState(NO_SHOW_MODAL)
                }}>
                {modalState === SHOW_SHARE_MODAL ? this._renderShareView() : this._renderStyleSettingView()}
            </ModalView>
        )
    }

    _renderStyleSettingView() {
        return (
            <View style={[styles.container,{backgroundColor: this.props.styles.articleBg}]}>
                <View style={styles.item_view}>
                    <Text style={styles.item_descri}>字号</Text>
                    <FontSelectorView
                        defaultTextColor = {this.props.styles.dayStyle?'#333333':'#333333'}
                        textColor = {this.props.styles.dayStyle?'#f5f5f5':'#e0e0e0'}
                        bgColor = {this.props.styles.dayStyle?'#333333':'#444444'}
                        defaultBgColor = {this.props.styles.dayStyle?'#f5f5f5':'#949494'}
                        curIndex={this.props.styles.fontSizeIndex}
                        onChangeItem = {(index)=>{
                            this.props.changeFontSize(index)
                        }}
                    />
                </View>
                <View style={styles.item_view}>
                    <Text style={styles.item_descri}>背景</Text>
                    <BgSelectorView
                        bgItems={MAIN_BGS}
                        curIndex={this.props.styles.articleBgStyleIndex}
                        onChangeItem={(index)=>{
                            this.props.changeBgColor(index)
                        }}
                    />
                </View>
                <View style={styles.item_view}>
                    <Text style={styles.item_descri}>夜间</Text>
                    <Switch
                        width = {48}
                        height={28}
                        style={styles.switch}
                        value={!this.props.styles.dayStyle}
                        onAsyncPress={(callback)=>{
                            this.props.switchThemeModel()
                        }}
                    />
                </View>
            </View>
        )
    }

    _renderShareView() {
        return (
            <View style={[styles.container,{backgroundColor: this.props.styles.articleBg}]}>
                <Text style={styles.share_title}>分享</Text>
                <View style={styles.share_view}>
                    <TouchableOpacity onPress={()=>{

                    }}>
                        <View style={styles.share_item}>
                            <Image style={styles.share_icon} source={require('../data/img/wechat_moment.png')}/>
                            <Text style={styles.share_text}>朋友圈</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{

                    }}>
                        <View style={styles.share_item}>
                            <Image style={styles.share_icon} source={require('../data/img/wechat.png')}/>
                            <Text style={styles.share_text}>微信</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{

                    }}>
                        <View style={styles.share_item}>
                            <Image style={styles.share_icon} source={require('../data/img/copy.png')}/>
                            <Text style={styles.share_text}>复制</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: 210,
        alignItems: 'center',
        width,
    },
    item_view: {
        height: 60,
        flexDirection: 'row',
        width: width -20,
        alignItems: 'center'
    },
    item_descri: {
        fontSize: 16,
        color: '#666'
    },
    switch: {
        position: 'absolute',
        right: 0,
    },
    share_view: {
        height: 100,
        width: width*0.8,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    share_title: {
        fontSize: 16,
        color: '#666',
        height: 60,
        textAlign: 'center',
        lineHeight: 39,
    },
    share_item: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    share_icon: {
        width: 42,
        height: 42,
    },
    share_text: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
    }
})