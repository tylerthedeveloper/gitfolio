import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/navigation_types';
import firebase from 'firebase';
import * as AuthSession from 'expo-auth-session';
// import * as WebBrowser from 'expo-web-browser';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Login'>;

interface Props {
    navigation: NavigationProp
}

// WebBrowser.maybeCompleteAuthSession()

const LoginScreen = ({ navigation }: Props) => {

    const discovery = {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        // TODO: process.env = f9b038b6a662f722268b
        revocationEndpoint: 'https://github.com/settings/connections/applications/f9b038b6a662f722268b',
    };

    const REDIRECT_URL = AuthSession.getRedirectUrl();
    const githubFields = ['user', 'public_repo', 'repo'];

    const GITHUB_ID = 'f9b038b6a662f722268b';
    const GITHUB_SECRET = '3501d7b70dd47986c35e8a5d56f42efc0ab9c1d8';

    // const [request, response, promptAsync] = AuthSession.useAuthRequest({
    //         clientId: 'f9b038b6a662f722268b',
    //         scopes: githubFields,
    //         // responseType: AuthSession.ResponseType.Token,
    //         // redirectUri: REDIRECT_URL
    //         redirectUri: AuthSession.makeRedirectUri({
    //             // preferLocalhost: true,
    //             // path: "redirect",
    //             useProxy: false,
    //         }),
    //     },
    //     discovery
    // );

    const _makeAuthUrlWithId = () => {
        return (
            `https://github.com/login/oauth/authorize` +
            `?client_id=${GITHUB_ID}` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
            `&scope=${encodeURIComponent(githubFields.join(' '))}`
        );
    }

    const _createTokenWithCode = async (code: string) => {
        const url =
            `https://github.com/login/oauth/access_token` +
            `?client_id=${GITHUB_ID}` +
            `&client_secret=${GITHUB_SECRET}` +
            `&code=${code}`;
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            return res.json();
        } catch (error) {
            console.log(error)
        }
    }


    const login = async () => {
        // const redirectUrl = AuthSession.getRedirectUrl({ useProxy: true });
        try {
            const res = await AuthSession.startAsync({
                authUrl: _makeAuthUrlWithId(),
            });
            const { access_token } = await _createTokenWithCode(res?.params.code);
            const credential = firebase.auth.GithubAuthProvider.credential(access_token);
            // firebase.auth.Auth.prototype.signInWithCredential
            const user = await firebase.auth().signInWithCredential(credential);
            console.log('user exists!!!')
        } catch (error) {
            console.log(error.message);
        }
    }

    const signup = () => {
        // navigation.navigate('Home');
    };

    // React.useEffect(() => {
    //     if (response?.type === 'success') {
    //         const { code } = response.params;
    //         console.log(response)
    //     } else {
    //         console.log('response did not succeed \n', response)
    //     }
    // }, [response]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={login}>Login</Button>
                <Button onPress={signup}>Signup???</Button>
            </Layout>
        </SafeAreaView>
    );
}

export default LoginScreen;
