import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types';

export default class ControlItem extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onClickItem.bind(this)}>
                    <View style={styles.item}>
                        <Image
                            style={styles.item_icon}
                            source={this.props.icon}/>
                        <Text
                            style={styles.item_descri}>
                            {this.props.descri}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.divide_line}/>
            </View>
        )
    }

}

ControlItem.propTypes = {
    icon: PropTypes.any,
    descri: PropTypes.string
}

const styles = StyleSheet.create({
    container: {
    },
    item: {
        flexDirection: 'row',
        height: 42,
        alignItems: 'center',
    },
    item_icon: {
        marginLeft: 20,
        width: 20,
        height: 20,
    },
    item_descri: {
        color: '#838381',
        marginLeft: 10,
        fontSize: 14,
    },
    divide_line: {
        height: 2,
        backgroundColor: '#1f1f1f'
    }
})