import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../features/cart/CartScreen';
import { Button } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Products',
            headerRight: () => (
              <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
            ),
          })}
        />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Your Cart' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator