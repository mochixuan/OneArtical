import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types';

export default class SelectorView extends View {

    render() {

        this.changeBgPosition()

        return (
            <View style={[styles.view,{borderColor: this.props.bgColor}]}>
                <TouchableOpacity onPress={()=>{
                    if (this.props.onChangeItem != null) {
                        this.props.onChangeItem(0)
                    }
                }}>
                    <Text style={[styles.text,{
                        backgroundColor: this.text0Bg,
                        borderTopLeftRadius: 2,
                        borderBottomLeftRadius: 2,
                        color: this.text0
                    }]}>小</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    if (this.props.onChangeItem != null) {
                        this.props.onChangeItem(1)
                    }
                }}>
                    <Text style={[styles.text,{
                        backgroundColor: this.text1Bg,
                        color: this.text1
                    }]}>中</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    if (this.props.onChangeItem != null) {
                        this.props.onChangeItem(2)
                    }
                }}>
                    <Text style={[styles.text,{
                        backgroundColor: this.text2Bg,
                        borderTopRightRadius: 2,
                        borderBottomRightRadius: 2,
                        borderRightWidth: 0,
                        color: this.text2
                    }]}>大</Text>
                </TouchableOpacity>
            </View>
        )
    }


    changeBgPosition() {
        this.text0 = this.props.defaultTextColor
        this.text1 = this.props.defaultTextColor
        this.text2 = this.props.defaultTextColor
        this.text0Bg = this.props.defaultBgColor
        this.text1Bg = this.props.defaultBgColor
        this.text2Bg = this.props.defaultBgColor
        switch (this.props.curIndex) {
            case 0:
                this.text0Bg = this.props.bgColor
                this.text0 = this.props.textColor
                break
            case 1:
                this.text1Bg = this.props.bgColor
                this.text1 = this.props.textColor
                break
            case 2:
                this.text2Bg = this.props.bgColor
                this.text2 = this.props.textColor
                break
        }
    }

}

SelectorView.defaultProps = {
    bgColor: '#333333',
    defaultBgColor: '#333333',
    textColor: '#f5f5f5',
    defaultTextColor: '#f5f5f5',
    curIndex: 0,
}

SelectorView.propTypes =  {
    bgColor: PropTypes.string,
    defaultBgColor: PropTypes.string,
    onChangeItem: PropTypes.func,
    defaultTextColor: PropTypes.string,
    textColor: PropTypes.string,
    curIndex: PropTypes.number,
}

const styles = StyleSheet.create({
    view: {
        width: 152,
        height: 32,
        borderRadius: 4,
        borderColor: '#444',
        borderWidth: 1,
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text: {
        width: 50,
        fontSize: 16,
        height: 29.5,
        lineHeight: 24,
        textAlign: 'center',
        borderRightWidth: 1,
        borderColor: '#444',
    }
})
