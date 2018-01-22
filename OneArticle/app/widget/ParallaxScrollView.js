import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Animated,
    ScrollView,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';

const ScrollViewPropTypes = ScrollView.propTypes;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const DEFAULT_WINDOW_MULTIPLIER = 0.50;
const DEFAULT_NAVBAR_HEIGHT = 40; //解决iOS通知栏透明问题
import LoadingView from './LoadingView'

class ParallaxScrollView extends Component {
    constructor() {
        super();
        this.state = {
            scrollY: new Animated.Value(0)
        };
    }

    renderHeaderView() {
        var { windowHeight} = this.props;
        var { scrollY } = this.state;
        if (!windowHeight) {
            return null;
        }

        const newWindowHeight = windowHeight;

        return (
            <Animated.View
                style={{
                    opacity: scrollY.interpolate({
                        inputRange: [0, windowHeight],
                        outputRange: [1, 0.2]
                    })
                }}>
                <View style={{height: newWindowHeight, justifyContent: 'center', alignItems: 'center'}}>
                    {this.props.headerView}
                </View>
            </Animated.View>
        );
    }

    renderNavBarTitle() {
        if (this.props.isShowLoading) {
            return (
                <LoadingView
                    height={DEFAULT_NAVBAR_HEIGHT}
                    backgroundColor={this.props.navBarColor}
                />
            )
        } else {
            var { windowHeight, navBarTitleColor } = this.props;
            var { scrollY } = this.state;
            if (!windowHeight) {
                return null;
            }

            return (
                <Animated.View
                    style={{
                        opacity: scrollY.interpolate({
                            inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
                            outputRange: [0, 0, 1]
                        })
                    }}
                >
                    <Text style={{ fontSize: 14, color: navBarTitleColor || 'white' }}>
                        {this.props.navBarTitle}
                    </Text>
                </Animated.View>
            );
        }
    }

    renderNavBar() {
        var {
            windowHeight, leftView,
            rightView, navBarColor
        } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight) {
            return null;
        }

        return (
            <Animated.View
                style={{
                    height: DEFAULT_NAVBAR_HEIGHT,
                    width: SCREEN_WIDTH,
                    flexDirection: 'row',
                    position: 'absolute',
                    zIndex: 1,
                    backgroundColor: scrollY.interpolate({
                        //inputRange: [-windowHeight, windowHeight * DEFAULT_WINDOW_MULTIPLIER, windowHeight * 0.8],
                        inputRange: [0 ,windowHeight-DEFAULT_NAVBAR_HEIGHT,windowHeight],
                        outputRange: ['transparent',navBarColor,navBarColor]
                    })
                }}
            >
                {leftView &&
                <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                    {leftView}
                </View>
                }
                <View
                    style={{
                        flex: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        height: DEFAULT_NAVBAR_HEIGHT,
                    }}
                >
                    {this.renderNavBarTitle()}
                </View>
                {rightView &&
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {rightView}
                </View>
                }
            </Animated.View>
        );
    }

    render() {
        var { style, ...props } = this.props;

        return (
            <View style={[styles.container, style]}>
                {this.renderNavBar()}
                <ScrollView
                    ref={component => {
                        this._scrollView = component;
                    }}
                    {...props}
                    style={styles.scrollView}
                    onScroll={
                        Animated.event([
                            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
                        ])
                    }
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                >
                    {this.renderHeaderView()}
                    <View style={[styles.content, props.scrollableViewStyle]}>
                        {this.props.children}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

ParallaxScrollView.defaultProps = {
    windowHeight: SCREEN_HEIGHT * DEFAULT_WINDOW_MULTIPLIER,
    isShowLoading: false,
};

ParallaxScrollView.propTypes = {
    ...ScrollViewPropTypes,
    windowHeight: PropTypes.number,
    navBarTitle: PropTypes.string,
    navBarTitleColor: PropTypes.string,
    navBarColor: PropTypes.string,
    userTitle: PropTypes.string,
    headerView: PropTypes.node,
    leftView: PropTypes.element,
    rightView: PropTypes.element,
    isShowLoading: PropTypes.bool
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'transparent'
    },
    scrollView: {
        backgroundColor: 'transparent'
    },
    background: {
        position: 'absolute',
        backgroundColor: '#2e2f31',
        width: SCREEN_WIDTH,
        resizeMode: 'cover'
    },
    content: {
        shadowColor: '#222',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'column'
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listView: {
        backgroundColor: 'rgba(247,247, 250, 1)'
    },
    logoutText: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

export {ParallaxScrollView,DEFAULT_NAVBAR_HEIGHT}