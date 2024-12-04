import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import RulesScreen from './screens/RulesScreen';
import GameScreen from './screens/GameScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  RulesScreen: undefined;
  GameScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Remover título
        />
        <Stack.Screen 
          name="RulesScreen" 
          component={RulesScreen} 
          options={{ headerShown: false }} // Remover título
        />
        <Stack.Screen 
          name="GameScreen" 
          component={GameScreen} 
          options={{ headerShown: false }} // Remover título
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
