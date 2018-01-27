import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    Dimensions
} from 'react-native'
import PropTypes from 'prop-types';
const {width}  = Dimensions.get('window')

/*
* 效果不佳，为了性能暂时先这样
* 必须设置标记位，它动画类似安卓不会停的，类似内存泄漏问题
* */
let isShow = false
export default class LoadingView extends Component {

    componentWillMount() {
        this.isFinish = false
        this.anim = new Animated.Value(0.0)
        isShow = true
        this.startAnimation()
    }

    componentWillUnmount() {
        isShow = false
    }

    startAnimation() {
        Animated.timing(
            this.anim,
            {
                toValue: this.isFinish?0.0:1.0,
                easing: Easing.linear,
                duration: 600,

            }
        ).start(()=>{
            this.isFinish = !this.isFinish
            if (isShow) {
                this.startAnimation()
            }
        })
    }



    render() {
        return (
            <View style={[styles.container,{height:this.props.height,backgroundColor:this.props.backgroundColor}]}>
                <Animated.View style={[styles.circle_spot,{
                    opacity: this.anim,
                    transform: [{
                        scale: this.anim.interpolate({
                            inputRange:  [0.0 , 0.25 , 0.5 , 0.75 , 1.0],
                            outputRange:  [0.0 , 0.25 , 0.5 , 0.75 , 1.0]
                        })
                    }]
                }]}>
                    <View style={styles.circle_spot_children}/>
                </Animated.View>
                <Animated.View style={[styles.circle_spot,{
                    opacity: this.anim,
                    transform: [{
                        scale: this.anim.interpolate({
                            inputRange:  [0.0 , 0.25 , 0.5 , 0.75 , 1.0],
                            outputRange: [0.25 , 0.5 , 0.75 , 1.0 , 0.75]
                        })
                    }]
                }]}>
                    <View style={styles.circle_spot_children}/>
                </Animated.View>
                <Animated.View style={[styles.circle_spot,{
                    opacity: this.anim,
                    transform: [{
                        scale: this.anim.interpolate({
                            inputRange:  [0.0 , 0.25 , 0.5 , 0.75 , 1.0],
                            outputRange: [0.5 , 0.75 , 1.0 , 0.75 , 0.25]
                        })
                    }]
                }]}>
                    <View style={styles.circle_spot_children}/>
                </Animated.View>
            </View>
        )
    }

}

LoadingView.propTypes = {
    height: PropTypes.number,
    backgroundColor: PropTypes.string
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },
    circle_spot: {
        marginLeft: 4,
        marginRight: 4,
    },
    circle_spot_children: {
        width: 8,
        height: 8,
        borderRadius: 6,
        backgroundColor: '#666'
    }
})