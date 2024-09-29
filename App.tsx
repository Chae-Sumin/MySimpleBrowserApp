import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import WebviewScreen from './src/screens/WebviewScreen';
import 'react-native-url-polyfill/auto';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Webview" component={WebviewScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
