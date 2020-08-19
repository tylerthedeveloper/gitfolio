import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
// import { NavigationProp } from '@react-navigation/native';

interface Props {
    // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    // navigation: NavigationScreenProp<NavigationProp>;
    // navigation: StackNavigationProp<StackParamList, 'Home'>;
}

const LoginScreen = ({ navigation }: Props) => {

    const login = () => {
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={login}>Login</Button>
            </Layout>
        </SafeAreaView>
    );
}

export default LoginScreen;
