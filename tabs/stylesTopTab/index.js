import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  ScheduledServices,
  CompletedServices,
  FavoriteStylers,
  PastStylers,
} from '../../clientMainFlow';
import {routes, tab} from '../../../services';
import {Icon} from 'react-native-elements';
import {sizes, colors} from '../../../themes';
import {MainWrapperMatrial} from '../../../components';
import {Current, Past} from '../../providerMainFlow';

const Tab = createMaterialTopTabNavigator();

const StylersTopTab = () => {
  const tabIconColor = colors.appColor1;
  const tabIconSize = sizes.appIcons.medium;
  return (
    <Tab.Navigator
      tabBarOptions={tab.stylesTopTabBarOptions}
      initialRouteName={routes.list}>
      <Tab.Screen
        name={routes.provider.currentStyles}
        component={Current}
        options={() => ({
          tabBarLabel: 'Current',
          // tabBarIcon: ({ focused,color }) => {
          //     return <Icon name="list-outline" type="ionicon" size={tabIconSize} color={color} />
          // },
        })}
      />
      <Tab.Screen
        name={routes.provider.pastStyles}
        component={Past}
        options={() => ({
          tabBarLabel: 'Past',
          // tabBarIcon: ({ focused,color }) => {
          //     return <Icon name="map-marker" type="font-awesome" size={tabIconSize} color={color} />
          // },
        })}
      />
    </Tab.Navigator>
  );
};

export default StylersTopTab;
