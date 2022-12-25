import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tracking from '../screens/tracking/Tracking';
import TabNavigator from './TabNavigator';

interface Props {
}

const RootNavigation: React.FC<Props> = () => {
  const RootStack = createNativeStackNavigator();

  return (
    <>
      <RootStack.Navigator initialRouteName="UserTabNavigator">
        <RootStack.Screen
            name="UserTabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
      </RootStack.Navigator>
    </>
  );
}
export default RootNavigation;