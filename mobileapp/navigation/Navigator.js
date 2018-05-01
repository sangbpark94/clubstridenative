import { StackNavigator } from 'react-navigation'
import HomeScreen from '../pages/HomeScreen'
import TestPage from '../pages/TestPage'

export default StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  TestPage: {
    screen: TestPage,
  },
},
{
  initialRouteName: 'HomeScreen',
  headerMode: 'none'
});
