import React, {Component} from 'react';
import {} from 'react-native';
import Login from './src/activities/Login';
import TestsList from './src/activities/TestsList';
import TestPage from './src/activities/TestPage';
import Test from './src/Test';
import { StackNavigator } from 'react-navigation';

export default MyProject = StackNavigator(
    {

        TestsList: {screen: TestsList},
        TestPage: {screen: TestPage},
        Login: {screen: Login, headerMode: 'screen'},
    },
    {headerMode: 'screen'},
    );
