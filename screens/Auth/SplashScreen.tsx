import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { HomeStackParamList } from '../../navigation/navigation_types';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Splash'>;

interface Props {
    navigation: NavigationProp
}

const SplashScreen = ({ navigation }: Props) => {

    const goTologinPage = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text category='h1'> I am the splash screen</Text>
                <Button onPress={goTologinPage}>Go to login</Button>
            </Layout>
        </SafeAreaView>
    );
};

export default SplashScreen;
