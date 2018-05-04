import { StackNavigator } from 'react-navigation'
import HomeScreen from '../pages/HomeScreen'
import Profile from '../pages/Profile'
import Checkpoints from '../pages/Checkpoints'
import StartGoals from '../pages/StartGoals'
import Health from '../pages/Health'
import UsePerks from '../pages/UsePerks'

export default StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  Profile: {
    screen: Profile,
  },
  Checkpoints: {
    screen: Checkpoints,
  },
  StartGoals: {
    screen: StartGoals,
  },
  Health: {
    screen: Health,
  },
  UsePerks: {
    screen: UsePerks,
  },
},
{
  initialRouteName: 'HomeScreen',
  headerMode: 'none'
});
