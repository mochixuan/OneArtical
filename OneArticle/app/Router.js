import {StackNavigator} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import MainDrawer from "./containers/MainDrawer";
import CollectPage from "./containers/CollectPage";

const Router = StackNavigator({
    MainDrawer: {screen: MainDrawer},
    CollectPage: {screen: CollectPage}
},{
    navigationOptions: {
        gesturesEnabled: true
    },
    headerMode: 'none',
    transitionConfig:(()=>({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal
    }))
})

export default Router