import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  ScheduledServices,
  CompletedServices,
  Awaiting,
} from '../../clientMainFlow';
import {routes, tab} from '../../../services';
import {Icon} from 'react-native-elements';
import {sizes, colors} from '../../../themes';

const Tab = createMaterialTopTabNavigator();

const ServicesTopTab = () => {
  const tabIconColor = colors.appColor1;
  const tabIconSize = sizes.appIcons.medium;
  return (
    <Tab.Navigator
      tabBarOptions={tab.servicesTopTabBarOptions}
      initialRouteName={routes.list}>
      <Tab.Screen
        name={routes.provider.awaitingServices}
        component={Awaiting}
        options={() => ({
          tabBarLabel: 'Awaiting',
          // tabBarIcon: ({ focused,color }) => {
          //     return <Icon name="list-outline" type="ionicon" size={tabIconSize} color={color} />
          // },
        })}
      />
      <Tab.Screen
        name={routes.provider.scheduledServices}
        component={ScheduledServices}
        options={() => ({
          tabBarLabel: 'Scheduled',
          // tabBarIcon: ({ focused,color }) => {
          //     return <Icon name="list-outline" type="ionicon" size={tabIconSize} color={color} />
          // },
        })}
      />
      <Tab.Screen
        name={routes.provider.completedServices}
        component={CompletedServices}
        options={() => ({
          tabBarLabel: 'Completed',
          // tabBarIcon: ({ focused,color }) => {
          //     return <Icon name="map-marker" type="font-awesome" size={tabIconSize} color={color} />
          // },
        })}
      />
    </Tab.Navigator>
  );
};

export default ServicesTopTab;
