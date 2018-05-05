import { StackNavigator } from 'react-navigation'
import HomeScreen from '../pages/HomeScreen'
import Profile from '../pages/Profile'
import Checkpoints from '../pages/Checkpoints'
import GoalPage from '../pages/GoalPage'
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
  GoalPage: {
    screen: GoalPage,
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
  headerMode: 'none',
  transitionConfig: () => ({
        screenInterpolator: (props) => {
            return fade(props)
        }
    })
});

const fade = (props) => {
    const {position, scene} = props

    const index = scene.index

    const translateX = 0
    const translateY = 0

    const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [1, 1, 1]
    })

    return {
        opacity,
        transform: [{translateX}, {translateY}]
    }
}
