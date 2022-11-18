import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import Register from '../screens/Register/Register';
import Login from '../screens/Login/login';
 import TabNavigation from './TabNavigation';
 import Comment from '../screens/Comment/Comment';


const Stack = createNativeStackNavigator();


function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={Register} options= {{ headerShown : false}}/>
        <Stack.Screen name='Login' component={Login} options= {{ headerShown : false}}/>
        <Stack.Screen name='TabNavigation' component={TabNavigation} options= {{ headerShown : false}}/>
        <Stack.Screen name='Comment' component={Comment} options= {{ headerShown : false}}/>
      </Stack.Navigator> 
    </NavigationContainer>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navigation;