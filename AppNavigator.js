import { createStackNavigator, createAppContainer } from "react-navigation";
import DetailsScreen from './components/detailsScreen';
import CreateScreen from "./components/createScreen";
import HomeScreen from "./HomeScreen";

const AppNavigator = createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    Details: {
      screen: DetailsScreen
    },
    CreateScreen: {
      screen: CreateScreen
    }
  });
  
  export default createAppContainer(AppNavigator);