import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen, LoginScreen } from './screens/Auth';
import { HomeScreen } from './screens/Main';

const { Navigator, Screen } = createStackNavigator();

// <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text category='h1'>Welcome to Gitfolio!</Text>
// </Layout>

const HomeNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Splash' component={SplashScreen} />
    <Screen name='Login' component={LoginScreen} />
    <Screen name='Home' component={HomeScreen} />
  </Navigator>
);

export default function App() {

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <HomeNavigator />
      </NavigationContainer>
    </ApplicationProvider>
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
