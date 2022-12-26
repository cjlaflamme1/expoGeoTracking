import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
import RootNavigation from './navigation/RootNavigation';
import { store } from './store';
import * as TaskManager from "expo-task-manager";
import * as Location from 'expo-location';

export default function App() {
  const [foreground, requestForeground] = Location.useForegroundPermissions();
  const [background, requestBackground] = Location.useBackgroundPermissions();
  useEffect(() => {
    (async () => {
      
      if (!foreground) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
      };
      if (!background) {
        await Location.requestBackgroundPermissionsAsync();
      };
    })();
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaView style={style.safeArea}>
        <Provider store={store}>
          <RootSiblingParent>
            {
              foreground &&
              background ?
              (<RootNavigation />) :
              (<View><Text>Permissions Needed</Text></View>)

            }
          </RootSiblingParent>
        </Provider>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
  }
})
