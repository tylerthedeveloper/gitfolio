import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
// import { NavigationProp } from '@react-navigation/native';

interface Props {
    // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    // navigation: NavigationScreenProp<NavigationProp>;
    // navigation: StackNavigationProp<StackParamList, 'Home'>;
}

const SplashScreen = ({ navigation }: Props) => {

    const goTologinPage = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={goTologinPage}>Login here!</Button>
            </Layout>
        </SafeAreaView>
    );
};

export default SplashScreen;
