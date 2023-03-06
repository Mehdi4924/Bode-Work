import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, StatusBar, TouchableOpacity} from 'react-native';
import {
  Wrapper,
  MainWrapperMatrial,
  MainWrapper,
  NotificationCard,
  MediumTitle,
  TinyTitle,
} from '../../../components';
import {colors, sizes, ToastMessage} from '../../../themes';
import { routes } from '../../../services';
import { height, totalSize, width } from 'react-native-dimension';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { allNotifications } from '../../../services/backend/notification';

const notificationsArray = [
  {
    title: 'You received an order',
    detail: 'Lorem ipsum reik weye',
    time: '10:30 pm',
    status: "order",
  },
  {
    title: 'You received Payment',
    detail: 'Lorem ipsum reik weye',
    time: '10:30 pm',
    status: "payment",
  },
  {
    title: 'Booking Cancelled',
    detail: 'Lorem ipsum reik weye',
    time: '10:30 pm',
    status: "cancelled",
  },
  {
    title: 'You received a new message',
    detail: 'Lorem ipsum reik weye',
    time: '10:30 pm',
    status: "message",
  }
];

const Notifications = (props) => {
  const { userDetail } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   getAllNotifications();
  // }, []);
  // const getAllNotifications = () => {
  //   try {
  //     const data = {
  //       user_id: userDetail?.id,
  //     };
  //     allNotifications(data).then((response) => {
  //       if (response?.success) {
  //         console.log("RESPONSE =====> ", response?.unReadNotifications);
  //         setNotifications(response?.unReadNotifications);
  //       } else {
  //         setNotifications([]);
  //       }
  //     })
  //   } catch (error) {
  //     ToastMessage(error.message);
  //   }
  // };
  const RenderNotifications = () => {
    return (
      <FlatList
        data={notificationsArray}
        renderItem={({item, index}) => {
          return (
            <NotificationCard
              title={item.title}
              detail={item.detail}
              time={item.time}
              status={item.status}
              onPress={ () => { }}
            />
          );
        }}
      />
    );
  };

  return (
    <MainWrapperMatrial >
    <MainWrapper
      // animation="fadeInDown"
      style={{
        backgroundColor: colors.snow,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        elevation:2,
      }}>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <Wrapper 
        // animation="fadeInDown" 
        style={{flexDirection:'row',paddingVertical:height(3),paddingHorizontal:width(6)}}
      >
        <TouchableOpacity 
          onPress={() => props.navigation.goBack()}
          style={{justifyContent:'center',}}>
          <Feather
                name='x'
                size={totalSize(3.2)}
                color={colors.appColor1}
              />
        </TouchableOpacity>
        <View style={{flex:1,justifyContent:'center',marginLeft:width(6),marginBottom:totalSize(0.3)}}>
          <MediumTitle style={{color:colors.appColor1,fontSize:totalSize(2.55)}}>Notifications</MediumTitle>
        </View>
        {notificationsArray?.length > 0 && 
          <View style={{justifyContent:'center',marginLeft:width(6)}}>
            <TinyTitle style={{color:colors.appColor1}}>Clear All</TinyTitle>
          </View>
        }
      </Wrapper>
      {isLoading ? (
        <View
          style={{
            marginVertical: '50%',
            alignItems: 'center',
            width: '100%',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : notificationsArray?.length > 0 ? (
        <RenderNotifications />
      ) : (
        <View
          style={{
            marginVertical: '75%',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text>No Notification</Text>
        </View>
      )}
    </MainWrapper>
    </MainWrapperMatrial>
  );
}

export default Notifications;
