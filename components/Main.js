import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from '../redux/actions/index'

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import SearchScreen from './main/Search'
import HomeScreen from '../src/screens/HomeScreen'

const Tab = createBottomTabNavigator();

const EmptyScreen = () => {
    return (null)
}

export class Main extends Component {
    componentDidMount() {
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }
    render() {
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={true} screenOptions={{
              headerShown: true, 
              tabBarInactiveTintColor: '#231F20', 
              tabBarActiveTintColor: '#ff007f',
              tabBarLabelPosition: 'below-icon',
            }}>
                <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="Categories" component={SearchScreen} navigation={this.props.navigation}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="category" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="Studio" component={FeedScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="tv" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="Explore" component={FeedScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="atom" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="Profile" component={ProfileScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                    }})}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        ),
                    }} />
            </Tab.Navigator>
        )
    }
}

// <Tab.Screen name="AddContainer" component={EmptyScreen}
//                     listeners={({ navigation }) => ({
//                         tabPress: event => {
//                             event.preventDefault();
//                             navigation.navigate("Add")
//                         }
//                     })}
//                     options={{
//                         tabBarIcon: ({ color, size }) => (
//                             <MaterialCommunityIcons name="plus-box" color={color} size={26} />
//                         ),
//                     }} />

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
