import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native'
import ControlItem from '../components/ControlItem'

export default class ControlPanelView extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.settings}>
                    {this._renderItems(this.props.others)}
                </View>
                <View style={styles.controls}>
                    {this._renderCollectItem(this.props.isCollected)}
                    {this._renderItems(this.props.controls)}
                </View>
            </View>
        )
    }

    _renderItems(data) {
        return data.map((item,index)=>{
            return (
                <ControlItem
                    key = {item.key}
                    onClickItem = {()=> {this.props.onClickItem(item.key)}} //直接这里调用这样方便点
                    icon={item.icon}
                    descri={item.descri}/>
            )
        })
    }

    _renderCollectItem(isCollect) {
        let icon = isCollect ? require('../data/img/collected.png') : require('../data/img/collect.png')
        return (
            <ControlItem
                key = {0}
                onClickItem = {()=> {this.props.onClickItem(0)}} //直接这里调用这样方便点
                icon={icon}
                descri="收藏"/>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292927',
        justifyContent: 'space-around'
    },
    settings: {
        borderTopWidth: 2,
        borderTopColor: '#1f1f1f',
    },
    controls: {
        borderTopWidth: 2,
        borderTopColor: '#1f1f1f',
    },
})