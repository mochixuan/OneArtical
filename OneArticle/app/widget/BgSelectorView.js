import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
const {width} = Dimensions.get('window')

export default class BgSelectorView extends Component {

    render() {
        return (
            <View style={styles.container}>
                {this._renderItemView()}
            </View>
        )
    }

    _renderItemView() {
        return this.props.bgItems.map((item,index)=>{
            if (index == this.props.curIndex) {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={()=>{
                            if (this.props.onChangeItem != null) {
                                this.props.onChangeItem(index)
                            }
                    }}>
                        <View
                            style={[styles.item,{backgroundColor: item}]}>
                            <Image
                                style={styles.select_icon}
                                source={require('../data/img/select.png')}
                            />
                        </View>
                    </TouchableOpacity>
                )
            }
            return (
                <TouchableOpacity
                    key={index}
                    onPress={()=>{
                        if (this.props.onChangeItem != null) {
                            this.props.onChangeItem(index)
                        }
                    }}>
                    <View key={index} style={[styles.item,{backgroundColor: item}]}/>
                </TouchableOpacity>
            )
        })
    }
}

BgSelectorView.propTypes = {
    onChangeItem: PropTypes.func,
    bgItems: PropTypes.array,
    curIndex: PropTypes.number
}

const styles = StyleSheet.create({
    container: {
        width: width*0.72,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 32,
        position: 'absolute',
        right: 0,
    },
    item: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#949494'
    },
    select_icon: {
        width: 20,
        height: 20,
    }
})