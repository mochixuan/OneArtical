import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Modal,
    Text,
    Dimensions
} from 'react-native'
import SelectorView from './SelectorView'

const {width} = Dimensions.get('window')

export default class ModalSettings extends Component {

    render() {
        return (
            <View style={[styles.container,{backgroundColor: this.props.styles.articleBg}]}>
                <View style={styles.item_view}>
                    <Text style={styles.item_descri}>字号</Text>
                    <SelectorView
                        defaultTextColor = '#333333'
                        textColor = '#f5f5f5'
                        bgColor = '#333333'
                        defaultBgColor = '#f5f5f5'
                        curIndex={this.props.styles.fontSizeIndex}
                        onChangeItem = {(index)=>{
                            this.props.changeFontSize(index)
                        }}
                    />
                </View>
                <View style={styles.item_view}>
                    <Text style={styles.item_descri}>背景</Text>
                </View>
                <View style={styles.item_view}>
                    <Text style={styles.item_descri}>夜间</Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: 180,
        alignItems: 'center',
        width
    },
    item_view: {
        height: 50,
        flexDirection: 'row',
        width: width -20,
        alignItems: 'center'
    },
    item_descri: {
        fontSize: 16,
        color: '#666'
    },
    item_one_selector: {
        width: 150,
        height: 32,
        borderRadius: 4,
        borderColor: '#444',
        borderWidth: 1,
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        flexDirection: 'row'
    },
    item_one_text: {
        width: 50,
        fontSize: 16,
        height: 30,
        lineHeight: 24,
        textAlign: 'center',
        borderRightWidth: 1,
        borderColor: '#444',
    }
})