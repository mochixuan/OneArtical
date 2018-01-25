import {StackNavigator} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import MainDrawer from "./containers/MainDrawer";
import CollectPage from "./containers/CollectPage";
import AuthorPage from "./containers/AuthorPage";

const Router = StackNavigator({
    MainDrawer: {screen: MainDrawer},
    CollectPage: {screen: CollectPage},
    AuthorPage: {screen: AuthorPage}
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