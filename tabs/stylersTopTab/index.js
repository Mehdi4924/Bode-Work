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
// import Styles from '../../clientMainFlow/styles';
import Styles from '../../providerMainFlow/styles';

const Tab = createMaterialTopTabNavigator();

const StylersTopTab = () => {
  const tabIconColor = colors.appColor1;
  const tabIconSize = sizes.appIcons.medium;
  return (
    <Tab.Navigator
      tabBarOptions={tab.servicesTopTabBarOptions}
      initialRouteName={routes.list}>
      <Tab.Screen
        name={routes.provider.favoriteStylers}
        component={Styles}
        options={() => ({
          tabBarLabel: 'Favorite',
          // tabBarIcon: ({ focused,color }) => {
          //     return <Icon name="list-outline" type="ionicon" size={tabIconSize} color={color} />
          // },
        })}
      />
      <Tab.Screen
        name={routes.provider.pastStylers}
        component={PastStylers}
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
