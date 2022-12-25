import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Tracking from '../screens/tracking/Tracking';
import DataList from '../screens/datalist/DataList';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Track"
        component={Tracking}
        options={{
          tabBarLabel: 'Track',
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialCommunityIcons focused={focused} name="track-light" size={size} color={color} />
          },
        }}
        
      />
      <Tab.Screen
        name="DataList"
        component={DataList}
        options={{
          tabBarLabel: 'Data',
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialCommunityIcons focused={focused} name="data-matrix" size={size} color={color} />
          },
        }}
        
      />
    </Tab.Navigator>
  )
};

export default TabNavigator;