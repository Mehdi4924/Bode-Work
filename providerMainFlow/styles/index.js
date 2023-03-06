import React, {Component, useState,useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  SmallText,
  SmallTitle,
  LargeTitle,
  MediumTitle,
  ButtonColored,
  MediumText,
  CardWrapper,
  LargeText,
  RegularText,
  ButtonColoredss,
  HomeScheduleCard,
  StylesPastCard,
  ComponentWrapper,
  Spacer,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, appImages, fontFamily, ToastMessage, appStyles, sizes,} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';
import MianHeader from '../../../components/header/mainHeader';
import {routes} from '../../../services';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  userstylesCurrentData,
  userstylesPastData,
  cancelbookingData,
} from '../../../services/backend/user';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const monthDays = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const DATA = [1, 2, 3, 4, 5];
const DATA2 = [
  {
    id: 1,
    Status: '',
  },
  {
    id: 2,
    Status: 'Rejected',
  },
];
const DATA3 = [
  {id: 1, title: 'Hair Stylist', images: appImages.haircut},
  {id: 2, title: 'Nail Art', images: appImages.nail},
  {id: 3, title: 'Barber', images: appImages.barber},
  {id: 4, title: 'Makeup', images: appImages.makeup},
];
const scheduleData = [
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  },
];
const pastData = [
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  },
];
const Styles = props => {
  const [currentTabActive, setCurrentTabActive] = useState(true);
  const [pastTabActive, setPastTabActive] = useState(false);
  const [loader, setLoader] = useState(false);
  const [CurrentDta, setCurrentDta] = useState('');
  const [PastData, setPastData] = useState('');
  const [erning, seterning] = useState('');
  const [reliability, setreliability] = useState('');
  const {userDetail} = useSelector(state => state.user);
  const [itemData, setitemData] = useState('');
  const [itemData1, setitemData1] = useState('');
  console.log("itemData",JSON.stringify(itemData,null,2));
  const [isPauseAccountModalVisible, setIsPauseAccountModalVisible] = useState(false);
  const [isPauseAccountModalVisible1, setIsPauseAccountModalVisible1] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      getUserData();
      getstylistPastData();
    }, []),
  );
//     useEffect( () => {
//      getUserData();
//           getstylistPastData();
// }, []);
  const getUserData = () => {
    setLoader(true)
    try {
      const data = {
        stylist_id: userDetail?.id,
        // stylist_id: '15',
      };
      console.log("curent fom data",data);
      userstylesCurrentData(data).then(response => {
      console.log('userstylesCurrentData2222 =====> ', response);
        if (response.success) {
          console.log('userstylesCurrentData =====> ', response);
          setCurrentDta(response?.data);
          setLoader(false)
        }
      });
    } catch (error) {
      ToastMessage(error.message);
      setLoader(false)
    }
  };
  const getstylistPastData = async() => {
    try {
      const data = {
        stylist_id: userDetail?.id,
        // stylist_id: '5',
        // month: '3',
      };
      await userstylesPastData(data).then(response => {
        if (response?.success) {
          console.log('userstylesPastData =====> ', JSON.stringify(response.data,null,2));
          setPastData(response?.data);
          setLoader(false)
        }
      });
    } catch (error) {
      ToastMessage(error.message);
      setLoader(false)
    }
  };
  const cancelBookingCurrent = () => {
    try {
      const data = {
        // stylist_id: userDetail?.id,
        user_id: itemData?.user_id,
        booking_id: itemData?.id,
      };
      cancelbookingData(data).then(response => {
        // console.log('showstylistscheduleData data22 =====> ', response);
        if (response?.success) {
          let a = CurrentDta.filter(itemm => itemm.id != itemData.id);
          setCurrentDta(a);
          ToastMessage('Cancelled');
          // props.navigation.navigate(routes.provider.Chats);
        } else {
          // setDataSource([]);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const cancelBooking = () => {
  
    try {
      const data = {
        // stylist_id: userDetail?.id,
        user_id: itemData1.user_id,
        booking_id: itemData1.id,
      };
      cancelbookingData(data).then(response => {
        // console.log('showstylistscheduleData data22 =====> ', response);
        if (response?.success) {
          let a = PastData.filter(itemm => itemm.id != itemData1.id);
          setPastData(a);
          ToastMessage('Cancelled');
          // props.navigation.navigate(routes.provider.Chats);
        } else {
          // setDataSource([]);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const RenderScheduleCurrent = () => {
    return (
      <View>
        <FlatList
          data={CurrentDta}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            const d = new Date(item?.date);
            const a = monthDays[d.getUTCMonth()];
            const b = days[d.getUTCDay()];
            const e = (d.getDate());
            return (
              <HomeScheduleCard
                buttonViewStyle={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: width(10),
                }}
                imagedata={DATA3}
                containerStyle={{marginHorizontal: totalSize(5)}}
                bgimage={appImages.barber1}
                name={item?.user?.first_name}
                lastname={item?.user?.last_name!=null?item?.user?.last_name:'N/A'}
                image={item?.user?.profile_image!=null?item?.user?.profile_image:appImages.barber1}
                price={item?.price}
                serviceName={item?.service?.name}
                rating={item.rating}
                location={item?.user?.location!=null?item?.user?.location:'N/A'}
                date={`${b}, ${a} ${e}, ${d.getFullYear()}`}
                time= {moment(item?.start_timeslot?.split('-')[0], [
                  'HH:mm',
                ]).format('hh:mm A') +
                  ' - ' +
                  moment(item?.start_timeslot?.split('-')[1], [
                    'HH:mm',
                  ]).format('hh:mm A')}
                onPress={() => {}}
                // chatPress={()=> props.navigation.navigate(routes.provider.Chats)}
                // cancelPress={()=>cancelBookingCurrent(item,index)}
                cancelPress={() => setIsPauseAccountModalVisible(!isPauseAccountModalVisible,setitemData(item))}
                chatPress={() => {
                  let newItem = {
                    UserId: item.user_id,
                    // providerId: this.state.token,
                    name:item?.user?.first_name!=null?item?.user?.first_name:"Ahmad"
                    // name:"Ahmad"
                  };
                  props.navigation.navigate(routes.provider.chatScreen, {
                    item: newItem,
                    index,
                  });
                }}
              />
             
            );
          }}
        />
        <View style={{marginBottom: totalSize(43)}}></View>
      </View>
    );
  };
  const RenderPastData = () => {
    return (
      <View>
        <FlatList
          //  contentContainerStyle={{ paddingVertical: height(2.5) }}
          data={PastData}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            const d = new Date(item?.date);
            const a = monthDays[d.getUTCMonth()];
            const b = days[d.getUTCDay()];
            const e = (d.getDate());
            return (
              <StylesPastCard
              buttonViewStyle={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: width(10),
              }}
                containerStyle={{marginHorizontal: totalSize(2)}}
                bgimage={appImages.barber1}
                image={item?.user?.profile_image!=null?item?.user?.profile_image:appImages.barber1}
                name={item?.user?.first_name}
                lastname={item?.user?.last_name!=null?item?.user?.last_name:'N/A'}
                price={item?.price}
                serviceName={item?.service?.name}
                status={item?.status}
                rating={item?.stylist_rating}
                date={`${b}, ${a} ${e}, ${d.getFullYear()}`}
                time= {moment(item?.start_timeslot?.split('-')[0], [
                  'HH:mm',
                ]).format('hh:mm A') +
                  ' - ' +
                  moment(item?.start_timeslot?.split('-')[1], [
                    'HH:mm',
                  ]).format('hh:mm A')}
                location={item?.user?.location}
                starttime={moment(item?.booking_start).format("ddd, MMM D - h:mm a")!=null?moment(item?.booking_start).format("ddd, MMM D - h:mm a"):"09:00pm"}
                endtime={moment(item?.booking_end).format("ddd, MMM D - h:mm a")!=null?moment(item?.booking_end).format("ddd, MMM D - h:mm a"):"09:00pm"}
                // rating={item.rating}
                onPress={() => {}}
                // chatPress={()=> props.navigation.navigate(routes.provider.Chats)}
                cancelPress={() => setIsPauseAccountModalVisible1(!isPauseAccountModalVisible1,setitemData1(item))}
                chatPress={() => {
                  let newItem = {
                    UserId: item.user_id,
                    // providerId: this.state.token,
                    name:item?.user?.first_name!=null?item?.user?.first_name:"Ahmad"
                    // name:"Ahmad"
                  };
                  props.navigation.navigate(routes.provider.chatScreen, {
                    item: newItem,
                    index,
                  });
                }}
              />
            );
          }}
        />
        <View style={{marginBottom: totalSize(18)}}></View>
      </View>
    );
  };
  return (
    <MainWrapperMatrial
      style2={{
        backgroundColor: colors.appBgColor1,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}>
      <StatusBar backgroundColor={colors.appColor1} />
      <MianHeader
        iconLeftOnPress={() =>
          props.navigation.navigate(routes.provider.notifications)
        }
        heading={'styles'}
        iconRightOnPress={() =>
          props.navigation.navigate(routes.provider.Chats)
        }
      />
      <View style={{flexDirection: 'row', backgroundColor: colors.appColor1}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setCurrentTabActive(true);
            setPastTabActive(false);
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: currentTabActive ? '#05B1A8' : colors.appColor1,
            paddingVertical: height(2),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <SmallTitle style={{color: '#FFF', textAlign: 'center'}}>
            Current
          </SmallTitle>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setCurrentTabActive(false);
            setPastTabActive(true);
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: pastTabActive ? '#05B1A8' : colors.appColor1,
            paddingVertical: height(2),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <SmallTitle style={{color: '#FFF', textAlign: 'center'}}>
            Past
          </SmallTitle>
        </TouchableOpacity>
      </View>

      <Wrapper
        // animation="fadeInDown"
        style={{
          elevation: 1,
        }}>
        {currentTabActive ? (
          <>
            <View>
              <View
                style={{
                  backgroundColor: '#E5D38E',
                  borderRadius: 15,
                  paddingHorizontal: width(13),
                  paddingVertical: height(1),
                  marginHorizontal: totalSize(3),
                  marginTop: totalSize(1.5),
                }}>
                <SmallTitle
                  style={{
                    color: '#FFF',
                    textAlign: 'center',
                    fontFamily: fontFamily.appTextRegular,
                  }}>
                  Update your Availability to receive new clients
                </SmallTitle>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {loader ? (
                  <View
                    style={{
                      marginVertical: '50%',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <ActivityIndicator size={'large'} color={colors.appColor1} />
                  </View>
                ) : CurrentDta?.length > 0 ? (
                  <RenderScheduleCurrent />
                ) : (
                  <View
                    style={{
                      marginVertical: '75%',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <Text style={{color:"grey"}}>No curentSchedule</Text>
                  </View>
                )}
              </ScrollView>
              <View
                style={{
                  position: 'absolute',
                  width: width(100),
                  marginTop: height(61.8),
                  backgroundColor: colors.snow,
                  alignSelf: 'center',
                }}>
                <ButtonColored
                  text="Update Availability"
                  buttonStyle={{
                    paddingHorizontal: width(5),
                    borderRadius: 15,
                    backgroundColor: colors.appColor1,
                    height: height(7),
                    marginVertical: height(2),
                  }}
                  onPress={() =>
                    props.navigation.navigate(routes.provider.availablilityTab)
                  }
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              {loader ? (
                <View
                  style={{
                    marginVertical: '50%',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <ActivityIndicator size={'large'} color={colors.appColor1} />
                </View>
              ) : PastData?.length > 0 ? (
                <RenderPastData />
              ) : (
                <View
                  style={{
                    marginVertical: '75%',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text style={{color:'grey'}}>No Schedule</Text>
                </View>
              )}
            </ScrollView>
          </>
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
                onPress={()=>{setIsPauseAccountModalVisible(!isPauseAccountModalVisible),cancelBookingCurrent()}}
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
              onPress={() => setIsPauseAccountModalVisible1(!isPauseAccountModalVisible1)}
            />
            <Spacer height={sizes.baseMargin} />
          
              <ButtonColored
                text="Yes"
                buttonStyle={{backgroundColor: colors.alert,width:width(35),height:height(5.5),borderRadius:10}}
                onPress={()=>{setIsPauseAccountModalVisible1(!isPauseAccountModalVisible1),cancelBooking()}}
              />
          </View>
            <Spacer height={sizes.baseMargin} />
          </CardWrapper>
        </Wrapper>
      </Modal>
    </MainWrapperMatrial>
  );
};

export default Styles;
