import React,{Component} from 'react'
import {
    StyleSheet,
    Animated,
    Easing,
    Dimensions,
    PanResponder,
    View,
    Modal
} from 'react-native'
const {width,height} = Dimensions.get('window')

import PropTypes from 'prop-types';

export default class ModalView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            slide: new Animated.Value(0)
        }
    }

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShow) {
            Animated.timing(
                this.state.slide,
                {
                    toValue: 1,
                    easing: Easing.linear,
                    useNativeDriver:true,
                }
            ).start()
        } else {
            Animated.timing(
                this.state.slide,
                {
                    toValue: 0,
                    easing: Easing.linear,
                    useNativeDriver:true,
                }
            ).start()
        }
    }

    render() {
        return (
            /*<Animated.View
                style={[styles.container,{
                    transform: [
                        {
                            translateY: this.state.slide.interpolate({
                                inputRange: [0,1],
                                outputRange: [height,0]
                            })
                        }
                    ]
                }]}
                {...this._panResponder.panHandlers}
            >
                <View style={styles.children}>
                    {this.props.children}
                </View>
            </Animated.View>*/
            <Modal style={styles.container}
                   visible={this.props.isShow}
                   transparent = {true}
                   onRequestClose={()=>{

                   }}>

                <View  style={[styles.mask,{height:height-this.props.height}]} {...this._panResponder.panHandlers}/>
                <Animated.View
                    style={[styles.children,{
                        transform: [
                            {
                                translateY: this.state.slide.interpolate({
                                    inputRange: [0,1],
                                    outputRange: [this.props.height,0]
                                })
                            }
                        ]
                    }]}>
                        {this.props.children}
                </Animated.View>
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
        //必须要设置一个颜色
        backgroundColor: 'transparent'
    },
    children: {
        position: 'absolute',
        bottom: 0,
    }
})