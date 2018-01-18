import React,{Component} from 'react'
import {
    StyleSheet,
    Animated,
    Easing,
    Dimensions
} from 'react-native'
const {width} = Dimensions.get('window')

import PropTypes from 'prop-types';

export default class ModalView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            slide: new Animated.Value(0)
        }
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
            <Animated.View
                style={[styles.container,{
                    transform: [
                        {
                            translateY: this.state.slide.interpolate({
                                inputRange: [0,1],
                                outputRange: [this.props.height,0]
                            })
                        }
                    ]
                }]}
            >
                {this.props.children}
            </Animated.View>
        )
    }



}

ModalView.defaultProps = {
    isShow: false,
    height: 200,
}

ModalView.propTypes = {
    isShow: PropTypes.bool,
    height: PropTypes.number
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width
    }
})