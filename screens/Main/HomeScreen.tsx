import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/navigation_types';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

interface Props {
    navigation: NavigationProp
}

const HomeScreen = ({ navigation }: Props) => {

    // const navigateDetails = () => {
    //     navigation.navigate('Details');
    // };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='Gitfolio' alignment='center' />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button >Welcome!</Button>
            </Layout>
        </SafeAreaView>
    );
};

export default HomeScreen;

