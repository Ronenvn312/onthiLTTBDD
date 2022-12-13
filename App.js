import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Home from './screens/Home';
import UpLoadScreen from './src/UpLoadScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  // new CloudinaryImage("cld-sample.jpg");
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='root_navigator' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={UpLoadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
