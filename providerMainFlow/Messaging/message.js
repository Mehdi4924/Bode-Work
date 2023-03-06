import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, StatusBar, TouchableOpacity} from 'react-native';
import {
  Wrapper,
  MainWrapper,
  NotificationCard,
  MediumTitle,
  TinyTitle,
} from '../../../components';
import {colors, sizes, ToastMessage} from '../../../themes';
import { routes } from '../../../services';
import { height, totalSize, width } from 'react-native-dimension';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { allNotifications } from '../../../services/backend/notification';

const notificationsArray = [
  {
    title: 'Your tasker is on his way',
    detail: 'Lorem ipsum detail about the notifications',
    time: '10:30 pm',
    status: "order",
  },
  {
    title: 'Your tasker is on his way',
    detail: 'Lorem ipsum detail about the notifications',
    time: '10:30 pm',
    status: "",
  },
  {
    title: 'Your tasker is on his way',
    detail: 'Lorem ipsum detail about the notifications',
    time: '10:30 pm',
    status: "",
  },
  {
    title: 'Your tasker is on his way',
    detail: 'Lorem ipsum detail about the notifications',
    time: '10:30 pm',
    status: "",
  }
];

const message = (props) => {
  const { userDetail } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     getAllNotifications();
//   }, []);
//   const getAllNotifications = () => {
//     try {
//       const data = {
//         user_id: userDetail?.id,
//       };
//       allNotifications(data).then((response) => {
//         if (response?.success) {
//           console.log("RESPONSE =====> ", response?.unReadNotifications);
//           setNotifications(response?.unReadNotifications);
//         } else {
//           setNotifications([]);
//         }
//       })
//     } catch (error) {
//       ToastMessage(error.message);
//     }
//   };
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
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <Wrapper 
        animation="fadeInDown" 
        style={{flexDirection:'row',paddingVertical:height(2),paddingHorizontal:width(6)}}
      >
        <TouchableOpacity 
          onPress={() => props.navigation.goBack()}
          style={{justifyContent:'center'}}>
          <Ionicons
                name='chevron-back'
                size={totalSize(3)}
                color={colors.appColor1}
              />
        </TouchableOpacity>
        <View style={{flex:1,justifyContent:'center',marginLeft:width(6)}}>
          <MediumTitle style={{color:colors.appColor1}}>Notifications</MediumTitle>
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
  );
}

export default message;
