import React, {Component} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
  LargeText ,
  RegularText,
  TinyText,
} from '../../../components';
import { height, totalSize, width } from 'react-native-dimension';
import {header, routes, tab} from '../..';
import {colors, appStyles, sizes, appIcons, appImages, fontSize} from '../../../themes';
import {Icon, Badge} from 'react-native-elements';

import * as Animatable from 'react-native-animatable';
import {
  ChangePassword,
  MyBusiness,
  Notifications,
  Chats,
  ManageLeaves,
  ScheduleByDate,
  Skills,
  AddSkill,
  EditRate,
  SelectWorkArea,
  DirectDeposit,
  Promo,
  AccountSettings,
  LocationSetting,
  LiveChat,
  EmailCustomerSupport,
  Terms,
  BookingRequests,
  EditProfile,
  JobProgress,
  BusinessPhotos,
  Support,
  Faq,
  PrivacyPolicy,
  ChatScreen,
  
  Home,
  Profile,
  AboutMe,
} from '../../../screens/providerMainFlow';
import {Platform, Keyboard} from 'react-native';
import {StylesTopTab} from '../../../screens/tabs';
// import GlobalConst from './GlobalConst';
import ManageOngoingAvailability from '../../../screens/providerMainFlow/availability/manageOngoingAvailability';
import ManageVacationTime from '../../../screens/providerMainFlow/availability/manageVacationTime';
import AdjustComingHour from '../../../screens/providerMainFlow/availability/adjustComingHour';
import SearchClient from '../../../screens/providerMainFlow/search';
import Services from '../../../screens/providerMainFlow/services/services';
import SelectDate from '../../../screens/providerMainFlow/selectDate';
import Charges from '../../../screens/providerMainFlow/charges';
import AddSkills from '../../../screens/providerMainFlow/addOrEditSkills/addSkills';
import EditSkills from '../../../screens/providerMainFlow/addOrEditSkills/editSkills';
import SetRate from '../../../screens/providerMainFlow/addOrEditSkills/setRate';
import TermsAndCondition from '../../../screens/providerMainFlow/support/termsAndCondition';
import Availability from '../../../screens/providerMainFlow/availability';
import Acknowledgements from '../../../screens/providerMainFlow/support/acknowledgements';
import Styles from '../../../screens/providerMainFlow/styles';
import ClosingMessage from '../../../screens/providerMainFlow/support/closingMessage';
import { Signin, Signup } from '../../../screens/authFlow';
import PostReview from '../../../screens/providerMainFlow/postReview/postReview';
import MyBusinessReview from '../../../screens/providerMainFlow/myBusinessReview';
import ProfileUpdate from '../../../screens/providerMainFlow/profileUpdate';
import editPricenewList from '../../../screens/providerMainFlow/addOrEditSkills/editPricelist';
import EditService from '../../../screens/providerMainFlow/addOrEditSkills/editService';
import JobDetail from '../../../screens/providerMainFlow/jobDetail';

const HeaderTintColor = colors.appColor1;
const AppStack = createStackNavigator();
const HomeStack = createStackNavigator();
const StylesStack = createStackNavigator();
const AvailabilityStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MyBusinessStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getHeaderTitle = route => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName =
    getFocusedRouteNameFromRoute(route) ?? routes.provider.mainTab;
  //console.log(routeName)
  switch (routeName) {
    case routes.provider.homeTab:
      return 'Home';
    case routes.provider.stylesTab:
      return 'Styles';
    case routes.provider.availablilityTab:
      return 'Calendar';
    case routes.provider.myBusinessTab:
      return 'My Business';
    case routes.provider.profileTab:
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
        name={routes.provider.home}
        component={Home}
        options={({navigation, route}) => ({
          headerShown: false,
        })}
      />
      <HomeStack.Screen
        name={routes.provider.notifications}
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={routes.provider.Chats}
        component={Chats}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};
const StylesStackScreens = () => {
  return (
    <StylesStack.Navigator
      screenOptions={header.screenOptions}
      // initialRouteName="register"
    >
      <StylesStack.Screen
        name={routes.provider.styles}
        component={Styles}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={routes.provider.notifications}
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={routes.provider.Chats}
        component={Chats}
        options={{
          headerShown: false,
        }}
      />
    </StylesStack.Navigator>
  );
};
const AvailibilityStackScreens = () => {
  return (
    <AvailabilityStack.Navigator
      screenOptions={header.screenOptions}
      // initialRouteName="register"
    >
      <AvailabilityStack.Screen
        name={routes.provider.availablilityTab}
        component={Availability}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={routes.provider.notifications}
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={routes.provider.Chats}
        component={Chats}
        options={{
          headerShown: false,
        }}
      />
    </AvailabilityStack.Navigator>
  );
};
const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={header.screenOptions}
      // initialRouteName="register"
    >
      <ProfileStack.Screen
        name={routes.provider.profile}
        component={Profile}
        options={({navigation, route}) => ({
          headerShown: false,
        })}
      />
    </ProfileStack.Navigator>
  );
};
const MyBusinessStackScreens = () => {
  return (
    <MyBusinessStack.Navigator
      screenOptions={header.screenOptions}
      // initialRouteName="register"
    >
      <MyBusinessStack.Screen
        name={routes.provider.myBusiness}
        component={MyBusiness}
        options={({navigation, route}) => ({
          headerShown: false,
        })}
      />
       <MyBusinessStack.Screen
        name={routes.provider.notifications}
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={routes.provider.Chats}
        component={Chats}
        options={{
          headerShown: false,
        }}
      />
    </MyBusinessStack.Navigator>
  );
};

const TabScreens = () => {
  const tabIconColor = colors.appTextColor6;
  const tabappIconsize = sizes.appIcons.medium;
  return (
    <Tab.Navigator
      tabBarOptions={tab.tabBarOptions}
      screenOptions={{
        tabBarActiveTintColor: colors.appTextColor6,
        tabBarInactiveTintColor: colors.appTextColor6,
        tabBarActiveBackgroundColor: "#00000040",
        // tabBarItemStyle:{
        //   height:50,borderRadius:20,marginTop:10
        // },
        tabBarStyle: {
          backgroundColor: colors.appColor1,
          height: sizes.tabBarHeight,
          borderRadius: 0,
        },
        tabBarLabelStyle: [
          {fontSize:totalSize(1.3)},
          {width:width(23)},
        ],
      }}
      initialRouteName={routes.provider.homeTab}
    >
      <Tab.Screen
        name={routes.provider.homeTab}
        component={HomeStackScreens}
        options={() => ({
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => {
            return (
              <CustomIcon
                icon={appIcons.home}
                size={tabappIconsize}
                color={tabIconColor}
                // containerStyle={{marginBottom:1}}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name={routes.provider.stylesTab}
        component={StylesStackScreens}
        options={() => ({
          headerShown: false,
          tabBarLabel: 'Styles',
          tabBarIcon: ({color, size}) => {
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
        name={routes.provider.availablilityTab}
        component={AvailibilityStackScreens}
        options={() => ({
          headerShown: false,
          tabBarLabel: 'Availibility',
          tabBarIcon: ({color, size}) => {
            return (
              <CustomIcon
                icon={appIcons.calendar}
                size={tabappIconsize}
                color={tabIconColor}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name={routes.provider.myBusiness}
        component={MyBusinessStackScreens}
        options={() => ({
          headerShown: false,
          tabBarLabel: 'My Business',
          tabBarIcon: ({color, size}) => {
            return (
              <CustomIcon
                icon={appIcons.briefcase1}
                size={totalSize(2.7)}
                color={tabIconColor}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name={routes.provider.profileTab}
        component={ProfileStackScreens}
        options={() => ({
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => {
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
const ProviderAppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={header.screenOptions}
      // initialRouteName="register"
    >
      <AppStack.Screen
        name={routes.provider.mainTab}
        component={TabScreens}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name={routes.signin}
        component={Signin}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name={routes.signup}
        component={Signup}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name={routes.provider.chatScreen}
        component={ChatScreen}
        options={({navigation, route}) => ({
          headerShown: false,
          // headerTitle: () => (
          //   <RowWrapperBasic>
          //     <ImageRound 
          //     size={totalSize(6)}
          //     source={{uri: appImages.barber1}} />
          //     <Spacer style={{width:width(1)}} />
          //     <Wrapper>
          //       <LargeText  style={[appStyles.textBold]}>
          //         {/* {route.params.item.name} */}
          //         Ahmad
          //       </LargeText >
          //       <TinyText style={[appStyles.textLightGray]}>
          //         Last seen 1h ago
          //       </TinyText>
          //     </Wrapper>
          //   </RowWrapperBasic>
          // ),
        })}
      />
      <AppStack.Screen
        name={routes.provider.manageOngoingAvailability}
        component={ManageOngoingAvailability}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.manageVacationTime}
        component={ManageVacationTime}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.adjustComingHour}
        component={AdjustComingHour}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.searchClient}
        component={SearchClient}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.services}
        component={Services}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.selectDate}
        component={SelectDate}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.charges}
        component={Charges}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.businessPhoto}
        component={BusinessPhotos}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.addSkills}
        component={AddSkills}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.editpricelistt}
        component={editPricenewList}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.editservice}
        component={EditService}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.editSkills}
        component={EditSkills}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.setRate}
        component={SetRate}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.faq}
        component={Faq}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.liveChat}
        component={LiveChat}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.emailCustomerSupport}
        component={EmailCustomerSupport}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.privacyPolicy}
        component={PrivacyPolicy}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.termsAndCondition}
        component={TermsAndCondition}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.acknowledgements}
        component={Acknowledgements}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.directDeposit}
        component={DirectDeposit}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.locationSetting}
        component={LocationSetting}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.aboutMe}
        component={AboutMe}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.closingMessage}
        component={ClosingMessage}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.promo}
        component={Promo}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.accountSettings}
        component={AccountSettings}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.changePassword}
        component={ChangePassword}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.support}
        component={Support}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.selectWorkArea}
        component={SelectWorkArea}
        options={{headerShown:false}}
      />
      {/* <AppStack.Screen
        name={routes.provider.Chats}
        component={Chats}
        options={{headerShown:false}}
      /> */}
      <AppStack.Screen
        name={routes.provider.bookingRequests}
        component={BookingRequests}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.postReview}
        component={PostReview}
        options={{headerShown:false}}
      />
      <AppStack.Screen
        name={routes.provider.myBusinessReview}
        component={MyBusinessReview}
        options={{headerShown:false}}
      />
       <AppStack.Screen
        name={routes.provider.profileUpdate}
        component={ProfileUpdate}
        options={{headerShown:false}}
      />
       <AppStack.Screen
        name={routes.provider.jobDetail}
        component={JobDetail}
        options={{headerShown:false}}
      />
    </AppStack.Navigator>
  );
};

export default ProviderAppNavigation;
