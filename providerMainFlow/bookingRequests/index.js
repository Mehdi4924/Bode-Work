import React, {Component, useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, Modal,} from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  TinyTitle,
  ComponentWrapper,
  Spacer,
  RowWrapper,
  LargeTitle,
  XXLTitle,
  RegularText,
  LargeText,
  ButtonColored,
  SmallText,
  ProviderServiceCard,
  CardWrapper,
  MainWrapper,
  BookingRequestCard
} from '../../../components';
import {
  colors,
  appStyles,
  sizes,
  appImages,
  ToastMessage,
  fontFamily,
} from '../../../themes';
import {width, totalSize, height} from 'react-native-dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveData, getData, addToArray} from '../../../backend/firebase/utility';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {routes} from '../../../services';
import Header from '../../../components/header/header';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  showstylistBokingRequest,
  cancelbookingData,
  acceptbookingData,
} from '../../../services/backend/user';

const bookingRequests = [
  {
    id: 0,
    name: 'Jone Doe',
    profileImage: appImages.barber1,
    rating: '4.5',
    service: 'Hair Cut',
    timeSlot: '12:00 pm - 02:00 pm',
    date: '29th July,2022',
    location: '17 Johnson Ave,NYC',
    distance: '6 miles away',
    price: '40',
    id: '########',
  },
];
const monthDays = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const BookingRequests = props => {
  const {userDetail} = useSelector(state => state.user);
  console.log('ye i  user id', userDetail?.id);
  const [loader, setLoader] = useState(false);
  const [dataSource, setDataSource] = useState('');
  const [itemData, setitemData] = useState('');
  console.log("itemData",JSON.stringify(itemData,null,2));
  const [isPauseAccountModalVisible, setIsPauseAccountModalVisible] = useState(false);
  const [isPauseAccountModalVisible1, setIsPauseAccountModalVisible1] = useState(false);
  // console.log('>>>>>>>>', JSON.stringify(dataSource, null, 2));
  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [])
  );
  // useEffect(() => {
  //   getUserData();
  // }, []);

  const getUserData = async() => {
    
    setLoader(true);
    try {
      const data = {
        stylist_id: userDetail?.id,
        // stylist_id: '5',
      };
      await showstylistBokingRequest(data).then(response => {
        // console.log('showstylistscheduleData data22 =====> ', response);
        if (response?.success) {
          console.log(
            ' showstylistscheduleData data =====> ',
            JSON.stringify(response.data, null, 2),
          );
          setDataSource(response?.data);
          setLoader(false);
        } else {
          setDataSource([]);
          setLoader(false);
        }
      });
    } catch (error) {
      console.log('ye chaal');
      ToastMessage(error.message);
      setLoader(false);
    }
  };
  const cancelbooking = () => {
   
    try {
      const data = {
        // stylist_id: userDetail?.id,
        user_id: itemData.user_id,
        booking_id: itemData.id,
      };
      console.log("form data on cncel",data);
      cancelbookingData(data).then(response => {
        // console.log('showstylistscheduleData data22 =====> ', response);
        if (response?.success) {
          // console.log(' cancelbookingData data =====> ', JSON.stringify(response.data,null,2));
          // setDataSource(response?.data);
          // const newdata = [...dataSource]
          // newdata[index].favorite_stylist = true
          let a = dataSource.filter(itemm => itemm.id != itemData.id);
          // console.log("filter k bad arry",JSON.stringify(a,null,2));
          setDataSource(a);
          ToastMessage('Rejected');
          // props.navigation.navigate(routes.provider.Chats);
          props.navigation.navigate(routes.provider.Chats);
        } else {
          // setDataSource([]);
        }
      });
    } catch (error) {
      console.log('ye chaal');
      ToastMessage(error.message);
    }
  };
  const confrmbooking = () => {
    try {
      const data = {
        // stylist_id: userDetail?.id,
        user_id: itemData.user_id,
        booking_id: itemData.id,
      };
      acceptbookingData(data).then(response => {
        // console.log('showstylistscheduleData data22 =====> ', response);
        if (response?.success==true) {
          // console.log(' cancelbookingData data =====> ', JSON.stringify(response.data,null,2));
          // setDataSource(response?.data);
          // const newdata = [...dataSource]
          // newdata[index].favorite_stylist = true
          let a = dataSource.filter(itemm => itemm.id != itemData.id);
          // console.log("canfirmbookingData filter k bad arry",JSON.stringify(a,null,2));
          setDataSource(a);
          ToastMessage('Accepted');
          props.navigation.navigate(routes.provider.Chats);
        } else {
          setDataSource([]);
        }
      });
    } catch (error) {
      console.log('ye chaal');
      ToastMessage(error.message);
    }
  };
  //  const newdate = new Date(dataSource?.date).toLocaleDateString('en-US', {
  //     weekday: 'short',
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //   })
  //   console.log("ye i new date",newdate);
  // async componentDidMount() {
  //   const {navigate} = this.props.navigation;
  //   // await AsyncStorage.getItem('Token').then(async data => {
  //   //   if (data) {
  //   //     let Bookings = await getData('Bookings', data);
  //   //     console.log(Bookings);
  //   //     this.setState({
  //   //       DataObj: Bookings,
  //   //       bookingRequests: Bookings.Request,
  //   //       isLoading: false,
  //   //     });
  //   //   }
  //   // });

  //   this.props.navigation.addListener('focus', async () => {
  //     this.GetData();
  //   });

  //   let token = await AsyncStorage.getItem('Token');
  //   await firestore()
  //     .collection('Bookings')
  //     .doc(token)
  //     .onSnapshot(async () => {
  //       this.GetData();
  //     });
  // }

  // GetData = async () => {
  //   const {navigate} = this.props.navigation;
  //   await AsyncStorage.getItem('Token').then(async data => {
  //     if (data) {
  //       console.log(data);
  //       //  alert("call")
  //       let Bookings = await getData('Bookings', data);
  //       console.log(Bookings);
  //       this.setState({
  //         DataObj: Bookings,
  //         bookingRequests: Bookings.Request,
  //         isLoading: false,
  //       });
  //     }
  //   });
  // };

  // async AcceptFn(index) {
  //   await AsyncStorage.getItem('Token').then(async data => {
  //     let OldList = this.state.bookingRequests;
  //     let DataObj = this.state.DataObj;
  //     if (DataObj.Confirmed) {
  //       DataObj.Confirmed = [OldList[index], ...DataObj.Confirmed];
  //     } else {
  //       DataObj.Confirmed = [OldList[index]];
  //     }
  //     let userId = OldList[index].UserId;
  //     let user = OldList[index];
  //     let saveObjData = {
  //       imageUrl:
  //         'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmVvN7-zVjZUOvMWUkyUaD_3-G-F_lGPhtpQ&usqp=CAU',
  //       liked: false,
  //       profileImage: OldList[index].ProviderprofileImage,
  //       name: OldList[index].ProviderName,
  //       rating: OldList[index].ProviderRating,
  //       service: OldList[index].Service,
  //       providerId: data,
  //     };
  //     OldList.splice(index, 1);
  //     this.setState({bookingRequests: OldList});

  //     await saveData('Bookings', data, {
  //       Request: this.state.bookingRequests,
  //       Confirmed: DataObj.Confirmed,
  //     }).then(() => {
  //       this.setState({isLoading: false});
  //     });

  //     let oldStyler = await getData('Stylers', userId, 'Details');
  //     if (oldStyler) {
  //       oldStyler.push(saveObjData);
  //       await saveData('Stylers', userId, {Details: oldStyler});
  //     } else {
  //       let oldStyler = [saveObjData];
  //       await saveData('Stylers', userId, {Details: oldStyler});
  //     }
  //     // await addToArray('Stylers', userId, 'Details', saveObjData);

  //     // Send Notification
  //     let OldNotification = await getData(
  //       'notifications',
  //       user.UserId,
  //       'notifications',
  //     );
  //     let ProviderData= await getData("Users",user.UserId);
  //   let fcmToken = ProviderData.token!== undefined ?ProviderData.token : "";
  //     let notificationsObj = {
  //       title: 'Request Accepted',
  //       time: moment().format(),
  //       token:fcmToken,
  //       details:
  //         user.ProviderName + ' hase accepted request for ' + user.Service,
  //     };
  //     if (OldNotification.length) {
  //       OldNotification.push(notificationsObj);
  //     } else {
  //       OldNotification = [notificationsObj];
  //     }
  //     // let newOldNotification= [notificationsObj].concat(OldNotification);
  //     await saveData('notifications', user.UserId, {
  //       notifications: OldNotification,
  //     });
  //     Toast.show('You have accepted the booking');
  //     this.props.navigation.navigate(routes.provider.home);
  //   });
  // }

  // async RejectFn(index) {
  //   await AsyncStorage.getItem('Token').then(async data => {
  //     let OldList = this.state.bookingRequests;
  //     let DataObj = this.state.DataObj;
  //     if (DataObj.Reject) {
  //       DataObj.Reject = [OldList[index], ...DataObj.Reject];
  //     } else {
  //       DataObj.Reject = [OldList[index]];
  //     }
  //     let user = OldList[index];
  //     OldList.splice(index, 1);
  //     this.setState({bookingRequests: OldList});
  //     await saveData('Bookings', data, {
  //       Request: this.state.bookingRequests,
  //       Rejected: DataObj.Reject,
  //     }).then(() => {
  //       this.setState({isLoading: false});
  //     });

  //     // Send Notification
  //     let OldNotification = await getData(
  //       'notifications',
  //       user.UserId,
  //       'notifications',
  //     );
  //     let ProviderData= await getData("Users",user.UserId);
  //   let fcmToken = ProviderData.token!== undefined ?ProviderData.token : "";
  //     let notificationsObj = {
  //       title: 'Request Rejected',
  //       time: moment().format(),
  //       token:fcmToken,
  //       details: user.ProviderName + ' hase cancel request for ' + user.Service,
  //     };
  //     if (OldNotification.length) {
  //       OldNotification.push(notificationsObj);
  //     } else {
  //       OldNotification = [notificationsObj];
  //     }
  //     // let newOldNotification= [notificationsObj].concat(OldNotification);
  //     await saveData('notifications', user.UserId, {
  //       notifications: OldNotification,
  //     });

  //     Toast.show('You have rejected the booking');
  //   });
  // }

  const RenderBookingRequests = () => {
    function ordinal_suffix_of(i) {
      var j = i % 10,
        k = i % 100;
      if (j == 1 && k != 11) {
        return i + 'st';
      }
      if (j == 2 && k != 12) {
        return i + 'nd';
      }
      if (j == 3 && k != 13) {
        return i + 'rd';
      }
      return i + 'th';
    }

    return (
      <Wrapper>
        <Wrapper
        // animation="fadeInUpBig"
        >
          {dataSource?.length > 0 ? (
           <View>
             <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={dataSource}
              // data={dataSource.filter(item=>item?.user?.profile_image!=item?.user?.profile_image)}
              // horizontal
              renderItem={({item, index}) => {
                const d = new Date(item?.date);
                const a = monthDays[d.getUTCMonth()];
                const b = days[d.getUTCDay()];
                const c = ordinal_suffix_of(d.getDate());
                const e = (d.getDate());
                return (
                  <BookingRequestCard
                  buttonViewStyle={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: width(8),
                  }}
                  // imagedata={DATA3}
                  containerStyle={{marginHorizontal: totalSize(5)}}
                  bgimage={item?.service?.primary_image!=null?item?.service?.primary_image:appImages.barber1}
                  name={item?.user?.first_name!=null?item?.user?.first_name:'N/A'}
                  lastname={item?.user?.last_name!=null?item?.user?.last_name:'N/A'}
                  image={item?.user?.profile_image!=null?item?.user?.profile_image:appImages.barber1}
                  price={item?.price}
                  serviceName={item?.user?.title!=null?item?.user?.title:"Makeup"}
                  rating={item.rating}
                  location={item?.user?.location!=null?item?.user?.location:'N/A'}
                  date={`${b}, ${a} ${e}, ${d.getFullYear()}`}
                  time={moment(item?.start_timeslot?.split('-')[0], [
                    'HH:mm',
                  ]).format('hh:mm A') +
                    ' - ' +
                    moment(item?.start_timeslot?.split('-')[1], [
                      'HH:mm',
                    ]).format('hh:mm A')}
                  onPress={() => {}}
                  // chatPress={()=> props.navigation.navigate(routes.provider.Chats)}
                  chatPress={() => setIsPauseAccountModalVisible1(!isPauseAccountModalVisible1,setitemData(item))}
                  // cancelPress={() => cancelbooking(item, index)}
                  cancelPress={() => setIsPauseAccountModalVisible(!isPauseAccountModalVisible,setitemData(item))}
                />
                  // <ProviderServiceCard
                  //   containerStyle={[
                  //     {
                  //       marginTop: index === 0 ? sizes.marginTop : 0,
                  //       marginBottom: sizes.marginBottom,
                  //     },
                  //   ]}
                  //   name={item?.user?.first_name}
                  //   image={
                  //     item?.user?.profile_image != null
                  //       ? item?.user?.profile_image
                  //       : appImages.user1
                  //   }
                  //   rating={item?.stylist_rating}
                  //   title={item?.service?.name}
                  //   timeSlot={item?.time}
                  //   date={`${c} ${a} ${d.getFullYear()}`}
                  //   location={
                  //     item?.user?.location != null
                  //       ? item?.user?.location
                  //       : 'N/A'
                  //   }
                  //   distance={
                  //     item?.user?.distance != null
                  //       ? item?.user?.distance
                  //       : 'N/A'
                  //   }
                  //   price={item?.price}
                  //   // id={item.id}
                  //   showButtons
                  //   onPressConfirm={() => confrmbooking(item, index)}
                  //   onPressReject={() => cancelbooking(item, index)}
                  //   // onPressConfirm={() => {
                  //   //   this.AcceptFn(index);
                  //   // }}
                  //   // onPressReject={() => {
                  //   //   this.RejectFn(index);
                  //   // }}
                  // />
                );
              }}
            />
            <View style={{marginBottom: height(43)}}></View>
           </View>
          ) : (
            <Text
              style={{
                marginTop:'50%',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              Data not found
            </Text>
          )}
        </Wrapper>
        <Modal
        visible={isPauseAccountModalVisible}
        transparent
        // animationType="slide"
        >
        <Wrapper flex={1} style={{justifyContent: 'center'}}>
          <CardWrapper style={[{}, appStyles.shadowColored]}>
          <ComponentWrapper>
              <Spacer height={sizes.baseMargin} />
              <Spacer height={sizes.baseMargin} />
              {/* <LargeText style={[appStyles.textPrimaryColor]}>
                Are You sure?
              </LargeText> */}
              <Text style={{color:colors.appColor1,fontFamily:fontFamily.appTextBold,textAlign:'center',fontSize:totalSize(2.5)}}>
              Are you sure you want to cancel this booking?
              </Text>
              <Spacer height={sizes.smallMargin} />
              <Spacer height={sizes.smallMargin} />
             
              <Spacer height={sizes.smallMargin} />
            </ComponentWrapper>
            <Spacer height={sizes.baseMargin} />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <ButtonColored
              text="No"
              buttonStyle={{width:width(35),height:height(5.5),borderRadius:10}}
              onPress={() => setIsPauseAccountModalVisible(!isPauseAccountModalVisible)}
            />
            <Spacer height={sizes.baseMargin} />
          
              <ButtonColored
                text="Yes"
                buttonStyle={{backgroundColor: colors.alert,width:width(35),height:height(5.5),borderRadius:10}}
                onPress={()=>{setIsPauseAccountModalVisible(!isPauseAccountModalVisible),cancelbooking()}}
              />
          </View>
            <Spacer height={sizes.baseMargin} />
          </CardWrapper>
        </Wrapper>
      </Modal>
        <Modal
        visible={isPauseAccountModalVisible1}
        transparent
        // animationType="slide"
        >
        <Wrapper flex={1} style={{justifyContent: 'center'}}>
          <CardWrapper style={[{}, appStyles.shadowColored]}>
          <ComponentWrapper>
              <Spacer height={sizes.baseMargin} />
              <Spacer height={sizes.baseMargin} />
              {/* <LargeText style={[appStyles.textPrimaryColor]}>
                Are You sure?
              </LargeText> */}
              <Text style={{color:colors.appColor1,fontFamily:fontFamily.appTextBold,textAlign:'center',fontSize:totalSize(2.5)}}>
              Are you sure you want to confirm this booking?
              </Text>
              <Spacer height={sizes.smallMargin} />
              <Spacer height={sizes.smallMargin} />
             
              <Spacer height={sizes.smallMargin} />
            </ComponentWrapper>
            <Spacer height={sizes.baseMargin} />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <ButtonColored
              text="No"
              buttonStyle={{width:width(35),height:height(5.5),borderRadius:10}}
              onPress={() => setIsPauseAccountModalVisible1(!isPauseAccountModalVisible1)}
            />
            <Spacer height={sizes.baseMargin} />
          
              <ButtonColored
                text="Yes"
                buttonStyle={{backgroundColor: colors.alert,width:width(35),height:height(5.5),borderRadius:10}}
                onPress={()=>{setIsPauseAccountModalVisible1(!isPauseAccountModalVisible1),confrmbooking()}}
              />
          </View>
            <Spacer height={sizes.baseMargin} />
          </CardWrapper>
        </Wrapper>
      </Modal>
      </Wrapper>
    );
  };

  return (
    <MainWrapper>
      <Header
        goBack={() => props.navigation.navigate(routes.provider.Chats)}
        heading={'Booking Requests'}
        color={colors.appColor1}
      />
      {loader ? (
        <View
          style={{
            marginVertical: '50%',
            alignItems: 'center',
            width: '100%',
          }}>
          <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
        </View>
      ) : (
        <RenderBookingRequests />
      )}
    </MainWrapper>
  );
};

export default BookingRequests;
