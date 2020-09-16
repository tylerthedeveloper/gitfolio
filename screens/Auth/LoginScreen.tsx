import React from 'react';
import { SafeAreaView, AsyncStorage } from 'react-native';
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

    const REDIRECT_URL = AuthSession.getRedirectUrl();
    const githubFields = ['user', 'public_repo', 'repo'];

    // TODO: move to server...
    const GITHUB_ID = 'f9b038b6a662f722268b';
    const GITHUB_SECRET = '3501d7b70dd47986c35e8a5d56f42efc0ab9c1d8';

    // TODO: move to helper file
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

    interface Github_Base_User {
        displayName: string;
        email: string;
        phoneNumber: string;
        photoURL: string;
        providerData: Array<any>;
        uid: string;
    }

    interface Github_User_Additional_Info_Profile {
        bio: string;
        blog: string;
        collaborators: number;
        company: string;
        events_url: string;
        followers: number;
        followers_url: string;
        following: number;
        following_url: string;
        gists_url: string;
        hireable: string | null;
        html_url: string;
        id: number;
        location: string | null;
        login: string;
        organizations_url: string;
        owned_private_repos: number;
        private_gists: number;
        public_gists: number;
        public_repos: number;
        received_events_url: string;
        repos_url: string;
        total_private_repos: number;
        twitter_username: string | null;
    }

    interface Gitfolio_User {
        github_info: Github_User_Additional_Info_Profile;
        user_info: Github_Base_User;
    }

    const login = async () => {
        // const redirectUrl = AuthSession.getRedirectUrl({ useProxy: true });
        try {
            const res = await AuthSession.startAsync({
                authUrl: _makeAuthUrlWithId(),
            }); // FB code to use for oauth
            // console.log('res', res)
            // TODO: type this params
            const { access_token } = await _createTokenWithCode(res?.params.code); //
            const credential = firebase.auth.GithubAuthProvider.credential(access_token); // oauth token
            // console.log('credential', credential.accessToken || '')
            await AsyncStorage.setItem('github_oauth', credential.accessToken || '');
            const githubUser = await firebase.auth().signInWithCredential(credential); // github user account
            // console.log('user exists!!! ', user);
            const { additionalUserInfo, user } = githubUser;
            const { displayName, email, phoneNumber, photoURL, uid } = user as Github_Base_User;
            const { bio, blog, collaborators, company, events_url, followers, followers_url, following, following_url, gists_url, hireable,
                html_url, id, location, login, organizations_url, owned_private_repos, private_gists, public_gists, public_repos,
                received_events_url, repos_url, total_private_repos, twitter_username
            } = additionalUserInfo?.profile as Github_User_Additional_Info_Profile;
            // console.log(displayName, email, phoneNumber, photoURL, providerData, uid);
            // console.log(bio, blog, collaborators, company, events_url, followers, followers_url, following, following_url, gists_url, hireable,
            //     html_url, id, location, login, organizations_url, owned_private_repos, private_gists, public_gists, public_repos,
            //     received_events_url, repos_url, total_private_repos, twitter_username)
            // console.log())
            const firebaseUser = {
                user_info: {
                    displayName, email, phoneNumber, photoURL, uid
                },
                github_info: {
                    bio, blog, collaborators, company, events_url, followers, followers_url, following, following_url, gists_url, hireable,
                    html_url, id, location, login, organizations_url, owned_private_repos, private_gists, public_gists, public_repos,
                    received_events_url, repos_url, total_private_repos, twitter_username
                }
            } as Gitfolio_User;
            await firebase.firestore().collection('users')
                .doc(uid)
                .set(firebaseUser)
                // .then(() => navigation.navigate('Home'))
                .catch((error: any) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
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
