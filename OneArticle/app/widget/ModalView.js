import React,{Component} from 'react'
import {
    StyleSheet,
    Dimensions,
    PanResponder,
    View,
    Modal
} from 'react-native'
const {width,height} = Dimensions.get('window')

import PropTypes from 'prop-types';

/**
 * 可以使用下面这个控件进行替代，但这里用自己的方法简单的实现了
 * yarn add react-native-popup-dialog
 */
export default class ModalView extends Component {

    componentWillMount() {
        this._panResponder = PanResponder.create({
            // 要求成为响应者
            onStartShouldSetPanResponder: (evt,gestureState) => true,
            //如果某个父View想要在触摸操作开始时阻止子组件成为响应者
            //onStartShouldSetPanResponderCapture: (evt,gestureState) => false,
            //开始手势操作
            onPanResponderGrant: (evt, gestureState) => {
                if (this.props.onTouchOutSide) {
                    this.props.onTouchOutSide()
                }
            }
        })
    }

    render() {
        return (
            <Modal style={styles.container}
                   animationType = {"slide"}
                   visible={this.props.isShow}
                   transparent = {true}
                   onRequestClose={()=>{

                   }}>
                <View  style={[styles.mask,{height:height-this.props.height}]} {...this._panResponder.panHandlers}/>
                <View style={styles.children}>
                    {this.props.children}
                </View>
            </Modal>
        )
    }



}

ModalView.defaultProps = {
    isShow: false,
}

ModalView.propTypes = {
    isShow: PropTypes.bool,
    height: PropTypes.number,
    onTouchOutSide: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: '#f00'
    },
    mask: {
        width,
        backgroundColor: 'transparent' //必须要设置一个颜色
    },
    children: {
        position: 'absolute',
        bottom: 0,
    }
})