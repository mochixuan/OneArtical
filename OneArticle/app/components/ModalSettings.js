import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Modal,
    Text,
    Dimensions,
    Animated
} from 'react-native'
import FontSelectorView from '../widget/FontSelectorView'
import BgSelectorView from '../widget/BgSelectorView'
import Switch from '../widget/Switch'
import {MAIN_BGS} from '../constants/DataConstants'
import ModalView from '../widget/ModalView'

const {width} = Dimensions.get('window')

export default class ModalSettings extends Component {

    render() {
        return (
            <ModalView isShow={this.props.styles.showStylesModal} height={210}>
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
            </ModalView>
        )
    }

}

const styles = StyleSheet.create({
    modal: {
        height: 210,
    },
    container: {
        height: 210,
        alignItems: 'center',
        width,
        borderTopWidth: 1,
        borderTopColor: '#666666'
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
    }
})