import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native'

const itemHeight = 48
const {width,height} = Dimensions.get('window')

export default class Collect extends Component {

    _getLayoutItem(index) {
        return {length: itemHeight,offset: itemHeight*index,index}
    }

    _renderItemView(item) {
        const data = item.data
        return (
            <TouchableOpacity style={styles.item_touch} onPress={()=>{
                this.props.onClickItem(item)
                this.props.navigation.goBack()
            }}>
                <View style={[styles.item_view,{borderBottomColor: this.props.articleSecondColor}]}>
                    <View style={styles.item_content}>
                        <Text style={[styles.item_title,{
                            color: this.props.articleMainColor,
                            fontSize: this.props.articleFontSize - 2,
                        }]} numberOfLines = {1}>{data.title}</Text>
                        <Text style={[styles.item_author,{
                            color: this.props.articleSecondColor,
                            fontSize: this.props.articleFontSize - 4,
                        }]} numberOfLines = {1}>{data.author}</Text>
                    </View>
                    <Text style={[styles.item_date,{
                        color: this.props.articleSecondColor,
                        fontSize: this.props.articleFontSize - 4,
                    }]} numberOfLines = {1}>{data.date.curr.substring(0,4)}-{data.date.curr.substring(4,6)}-{data.date.curr.substring(6,8)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
              <View style={[styles.container,{backgroundColor: this.props.articleBg}]}>
                  <TouchableOpacity onPress={()=>{
                      this.props.navigation.goBack()
                  }}>
                      <View style={styles.header}>
                          <Image
                              style={styles.header_back}
                              source={require('../data/img/back.png')}
                              tintColor={this.props.articleSecondColor}/>
                      </View>
                  </TouchableOpacity>
                  <FlatList
                      data = {this.props.collectArticles}
                      keyExtractor = {(item,index)=>index}
                      renderItem = {
                          ({item}) => this._renderItemView(item)
                      }
                      getLayoutItem = {(data,index) => this._getLayoutItem(index)}
                      showVerticalScrollIndicator={false}
                  />
              </View>
        )
    }



}


const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    header: {
        height: 40,
        width,
        justifyContent: 'center',
        marginBottom: 20,
    },
    header_back: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    item_touch: {
        height: itemHeight,
        width
    },
    item_view: {
        height: itemHeight,
        width: width - 20,
        borderBottomWidth: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },
    item_content:{
        flexDirection: 'row',
        width: width - 20,
        alignItems: 'center',
        paddingLeft: 10,
    },
    item_title: {

    },
    item_author: {
        marginLeft: 10,
    },
    item_date: {
        marginTop: 2,
        alignSelf: 'flex-end',
        paddingRight: 10,
    }
})