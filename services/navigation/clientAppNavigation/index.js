import React, { Component } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BackIcon,
  LogoMain,
  TextInputColored,
  IconWithText,
  CustomIcon,
  BellIcon,
  ChatIcon,
  CloseIcon,
  RowWrapperBasic,
  ImageRound,
  Spacer,
  Wrapper,
  RegularText,
  TinyText,
} from '../../../components';
import { header, routes, tab } from '../..';
import { colors, appStyles, sizes, appIcons, appImages, fontSize } from '../../../themes';
import { Icon, Badge } from 'react-native-elements';
import { totalSize, width, height } from 'react-native-dimension';
import * as Animatable from 'react-native-animatable';
import Home from '../../../screens/clientMainFlow/home';
import { Notifications, NotificationSettings } from '../../../screens/clientMainFlow/notifications';
import Services from '../../../screens/clientMainFlow/home/services';
import Stylers from '../../../screens/clientMainFlow/stylers';
import SelectStylish from '../../../screens/clientMainFlow/stylers/selectStylish';
import ChatScreen from '../../../screens/clientMainFlow/chatScreen';
import SelectLocation from '../../../screens/clientMainFlow/location/selectLocation';
import SelectAddress from '../../../screens/clientMainFlow/bookService/selectAddress';
import JobDetail from '../../../screens/clientMainFlow/jobDetail';
import PostReview from '../../../screens/clientMainFlow/postReview';
import ChangePassword from '../../../screens/clientMainFlow/accountSettings/changePassword';
import { AddCard, Payment, Redemptions } from '../../../screens/clientMainFlow/payment';
import LocationSetting from '../../../screens/clientMainFlow/location/locationSetting';
import Promo from '../../../screens/clientMainFlow/promo';
import Support from '../../../screens/clientMainFlow/support';
import Faq from '../../../screens/clientMainFlow/support/faq';
import CustomerSupport from '../../../screens/clientMainFlow/support/customerSupport';
import EmailCustomerSupport from '../../../screens/clientMainFlow/support/emailCustomerSupport';
import BecomeStylist from '../../../screens/clientMainFlow/support/becomeStylist';
import PrivacyPolicy from '../../../screens/clientMainFlow/support/privacyPolicy';
import TermsAndCondition from '../../../screens/clientMainFlow/support/termsAndCondition';
import CancellationPolicy from '../../../screens/clientMainFlow/support/cancellationPolicy';
import LegalNotices from '../../../screens/clientMainFlow/support/legalNotices';
import Profile from '../../../screens/clientMainFlow/profile';
import { Signin, Signup } from '../../../screens/authFlow';
import StylistProfileNew from '../../../screens/clientMainFlow/stylers/stylistProfileNew';
import SelectDate from '../../../screens/clientMainFlow/home/selectDate';
import EditProfile from '../../../screens/clientMainFlow/editProfile';
import Confirmation from '../../../screens/clientMainFlow/bookService/confirmation';
import StylistProfile from '../../../screens/clientMainFlow/stylers/stylistProfile';

const HeaderTintColor = colors.appColor1;
const AppStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ServicesStack = createStackNavigator();
const StylesStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getHeaderTitle = route => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? routes.provider.mainTab;
  //console.log(routeName)
  switch (routeName) {
    case routes.client.homeTab:
      return 'Home';
    case routes.client.stylesTab:
      return 'Styles';
    case routes.client.availablilityTab:
      return 'Calendar';
    case routes.client.myBusinessTab:
      return 'My Business';
    case routes.client.profileTab:
      return 'Profile';
  }
};
const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={header.screenOptions}
    // initialRouteName="register"
    >
      <HomeStack.Screen
        name={routes.client.home}
        component={Home}
        options={({ navigation, route }) => ({
          // title: 'Home',
          headerShown: false,
          headerStyle: [appStyles.materialHeaderStyle],
          headerTitleStyle: [appStyles.materialHeaderTitleStyle],
          headerRight: () => (
            <BellIcon
              value={
                GlobalConstClient.NotificationCount !== '0'
                  ? GlobalConstClient.NotificationCount
                  : ''
              }
              style={[{ marginHorizontal: sizes.marginHorizontal }]}
              onPress={() => navigation.navigate(routes.client.notifications)}
            />
          ),
        })}
      />
      <HomeStack.Screen
        name={routes.client.notifications}
        component={Notifications}
        options={{
          title: 'Notifications',
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
const ServicesStackScreens = () => {
  return (
    <ServicesStack.Navigator
      screenOptions={header.screenOptions}
    // initialRouteName="register"
    >
      <ServicesStack.Screen
        name={routes.client.services}
        component={Services}
        options={{
          headerShown: false,
        }}
      />
    </ServicesStack.Navigator>
  );
};
const StylesStackScreens = () => {
  return (
    <StylesStack.Navigator
      screenOptions={header.screenOptions}
    // initialRouteName="register"
    >
      <StylesStack.Screen
        name={routes.client.stylers}
        component={Stylers}
        options={{
          headerShown: false,
        }}
      />
    </StylesStack.Navigator>
  );
};
const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={header.screenOptions}
    // initialRouteName="register"
    >
      <ProfileStack.Screen
        name={routes.client.profile}
        component={Profile}
        options={({ navigation, route }) => ({
          headerShown: false,
        })}
      />
    </ProfileStack.Navigator>
  );
};

const TabScreens = () => {
  const tabIconColor = colors.appTextColor6;
  const tabappIconsize = sizes.appIcons.medium;
  return (
    <Tab.Navigator
      tabBarOptions={tab.tabBarOptions}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.appTextColor6,
        tabBarInactiveTintColor: colors.appTextColor6,
        tabBarActiveBackgroundColor: "#00000040",
        tabBarStyle: {
          backgroundColor: colors.appColor1,
          height: sizes.tabBarHeight,
          borderRadius: 0,
        },
        tabBarLabelStyle: [
          { fontSize: fontSize.small, lineHeight: 14 }
        ],
      }}
      initialRouteName={routes.client.homeTab}
    >
      <Tab.Screen
        name={routes.client.homeTab}
        component={HomeStackScreens}
        options={() => ({
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => {
            return (
              <CustomIcon
                icon={appIcons.home}
                size={tabappIconsize}
                color={tabIconColor}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name={routes.client.servicesTab}
        component={ServicesStackScreens}
        options={() => ({
          headerShown: false,
          tabBarLabel: 'Services',
          tabBarIcon: ({ color, size }) => {
            return (
              <CustomIcon
                icon={appIcons.skin}
                size={tabappIconsize}
                color={tabIconColor}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name={routes.client.stylersTab}
        component={StylesStackScreens}
        options={() => ({
          headerShown: false,
          tabBarLabel: 'Stylers',
          tabBarIcon: ({ color, size }) => {
            return (
              <CustomIcon
                icon={appIcons.beauty}
                size={tabappIconsize}
                color={tabIconColor}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name={routes.client.profileTab}
        component={ProfileStackScreens}
        options={() => ({
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => {
            return (
              <CustomIcon
                icon={appIcons.user}
                size={tabappIconsize}
                color={tabIconColor}
              />
            );
          },
        })}
      />
    </Tab.Navigator>
  );
};

const ClientAppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={header.screenOptions}
    >
      <AppStack.Screen
        name={routes.client.mainTab}
        component={TabScreens}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.signin}
        component={Signin}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.signup}
        component={Signup}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.selectLocation}
        component={SelectLocation}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.selectAddress}
        component={SelectAddress}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.chatScreen}
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.jobDetail}
        component={JobDetail}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.postReview}
        component={PostReview}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.changePassword}
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.payment}
        component={Payment}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.locationSetting}
        component={LocationSetting}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.promo}
        component={Promo}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.notificationSettings}
        component={NotificationSettings}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.support}
        component={Support}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.faq}
        component={Faq}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.liveChat}
        component={CustomerSupport}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.emailCustomerSupport}
        component={EmailCustomerSupport}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.becomeStylist}
        component={BecomeStylist}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.privacyPolicy}
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.termsAndCondition}
        component={TermsAndCondition}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.canellationPolicy}
        component={CancellationPolicy}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.legalNoticies}
        component={LegalNotices}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.selectStylish}
        component={SelectStylish}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.stylistProfileNew}
        component={StylistProfileNew}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.stylistProfile}
        component={StylistProfile}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.selectdate}
        component={SelectDate}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.editProfile}
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.confirmation}
        component={Confirmation}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.addCard}
        component={AddCard}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={routes.client.redemptions}
        component={Redemptions}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

export default ClientAppNavigation;

