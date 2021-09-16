//Pilha de navegação pos login
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IconButton } from 'react-native-paper';

import BrowseChannelsScreen from '../screens/BrowseChannelsScreen';
import ChatScreen from '../screens/ChatScreen';
import CreateChannelScreen from '../screens/CreateChannelScreen';
import HomeScreen from '../screens/HomeScreen';
import { getChannelDisplayName } from '../chatkitty';

const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function HomeStack() {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="ChatApp" component={ChatComponent} />
      <ModalStack.Screen name="CreateChannel" component={CreateChannelScreen} />
    </ModalStack.Navigator>
  );
}

function ChatComponent() {
  return (
    <ChatStack.Navigator
    //header de cima da tela home
    screenOptions={{
      headerStyle: {
        backgroundColor: '#5b3a70',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontSize: 22,
      },
    }}
  >
    <ChatStack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        headerRight: () => (
          <IconButton
            icon="plus"
            size={28}
            color="#ffffff"
            onPress={() => navigation.navigate('BrowseChannels')}
          />
        ),
      })}
    />
    <ChatStack.Screen
      name="BrowseChannels"
      component={BrowseChannelsScreen}
      options={({ navigation }) => ({
        headerRight: () => (
          <IconButton
            icon="plus"
            size={28}
            color="#ffffff"
            onPress={() => navigation.navigate('CreateChannel')}
          />
        ),
      })}
    />
    <ChatStack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: getChannelDisplayName(route.params.channel), 
      })}
    />
  </ChatStack.Navigator>
);
}