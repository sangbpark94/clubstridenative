import { StackNavigator } from 'react-navigation'
import HomeScreen from '../pages/HomeScreen'
import Profile from '../pages/Profile'

export default StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  Profile: {
    screen: Profile,
  }
},
{
  initialRouteName: 'HomeScreen',
  headerMode: 'none'
});
