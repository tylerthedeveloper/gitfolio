import React, { useEffect, useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen, LoginScreen } from './screens/Auth';
import { HomeScreen } from './screens/Main';
import { firebaseConfig } from './config/firebase';
import firebase from 'firebase';
import { HomeStackParamList } from './navigation/navigation_types';

// <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   <Text category='h1'>Welcome to Gitfolio!</Text>
// </Layout>

export default function App() {

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  } catch (e) {
    // TODO:
    // firebase.analytics();
    console.log(e.message);
  }
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const { Navigator, Screen } = createStackNavigator<HomeStackParamList>();

  const HomeNavigator = () => (
    <Navigator headerMode='none' initialRouteName="Splash">
      {
        // state.isLoading ?
        //   <AppStack.Screen name="ResolveAuth" component={ResolveAuthScreen}
        //     options={{ headerTransparent: true, headerTitle: null }}
        //   />
        //   // FIXME:: (state.authUser === null)
        (firebase.auth().currentUser === null)
          ? <>
            <Screen name='Splash' component={SplashScreen} />
            <Screen name='Login' component={LoginScreen} />
          </>
          : <Screen name='Home' component={HomeScreen} />
      }
    </Navigator>
  );

  // TODO: abstract this out?
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('[use effect in app auth changed] and now exists')
        // usersRef
        //   .doc(user.uid)
        //   .get()
        //   .then((document) => {
        //     const userData = document.data()
        //     setLoading(false)
        //     setUser(userData)
        //   })
        //   .catch((error) => {
        setLoading(false)
        //   });
      } else {
        // console.log('[use effect in app auth changed] NO USER',)
        setLoading(false)
      }
    });
  }, []);

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
