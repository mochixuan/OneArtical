import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import {connect} from 'react-redux'
import Drawer from 'react-native-drawer'
import ArticlePage from './ArticlePage'
import ControlPanel from '../containers/ControlPanel'

class MainDrawer extends Component {

    render() {
        return (
            <Drawer
                side= 'left'
                ref = {(c)=> this.drawer = c}
                openDrawerOffset = {0.6}
                panOpenMask={0.16}
                content = {<ControlPanel
                    onCloseDrawer={this.onCloseDrawer.bind(this)}
                    navigation = {this.props.navigation}
                />}>
                <ArticlePage/>
            </Drawer>
        )
    }

    isOpen() {
        return this.drawer._open
    }

    onPenDrawer() {
        this.drawer.open()
    }
    onCloseDrawer() {
        this.drawer.close()
    }

}

const mapStateToProps = (()=>{

})

const mapDispatchToProps = () => ({
    onPenDrawer: ()=>{

    },
    onCloseDrawer: ()=> {

    }
})

export default connect()(MainDrawer)