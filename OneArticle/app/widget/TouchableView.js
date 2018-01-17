import React,{Component} from 'react'

import {
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from 'react-native'
import PropTypes from 'prop-types';

export default class TouchableView extends Component {

    static propsTypes = {
        onPress: PropTypes.func,
    }


    constructor(props) {
        super(props);
    }

    render() {
        if (Platform.OS == 'ios') {
            return (
                <TouchableOpacity
                    onPress={this.props.onPress}
                >
                    {this.props.children}
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableNativeFeedback
                    onPress={this.props.onPress}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    {this.props.children}
                </TouchableNativeFeedback>
            )
        }

    }

}