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

  // TODO: abstract this out?
  const tryCacheSignIn = async () => {
    // const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(async (user) => {
      console.log('firebase.auth().currentUser', firebase.auth().currentUser === null)
      if (user) {
        setUser(user)
        // TODO: get user from FB
        console.log('[use effect in app auth changed] and now exists')
        // usersRef
        //   .doc(user.uid)
        //   .get()
        //   .then((document) => {
        //     const userData = document.data()
        //     setLoading(false)
        //     setUser(userData)
        //   })
        //   .catch((error) => {
      // setLoading(false)
        //   });
      } else {
        // console.log('[use effect in app auth changed] NO USER',)
        // setLoading(false)
      }
    });
  };

  useEffect(() => {
    tryCacheSignIn();
  }, []);

  const AppStack = createStackNavigator<HomeStackParamList>();

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <AppStack.Navigator headerMode='none' initialRouteName="Splash">
          {
            // (firebase.auth().currentUser === null)
            (user === {})
              ? (<>
                <AppStack.Screen name='Splash' component={SplashScreen} />
                <AppStack.Screen name='Login' component={LoginScreen} />
              </>)
              : <AppStack.Screen name='Home' component={HomeScreen} />
          }
        </AppStack.Navigator>
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
