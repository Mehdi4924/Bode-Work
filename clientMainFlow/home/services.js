import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  SmallText,
  SmallTitle,
  ButtonColored,
  CardWrapper,
  MediumText,
  LargeText,
  ButtonBordered,
  ButtonColoredss,
  HomeScheduleCard,
  StylesPastCard,
  ClientCompletedCard,
  ClientScheduleCard,
  ComponentWrapper,
  Spacer,
} from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, ToastMessage, appImages, fontFamily, sizes, appStyles } from '../../../themes';
import { height, totalSize, width } from 'react-native-dimension';
import ClientHeader from '../../../components/header/clientHeader';
import { routes } from '../../../services';
import {useFocusEffect} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import {
  completedBookings,
  scheduleBookings,
} from '../../../services/backend/booking';
import {
  cancelbookingData,
} from '../../../services/backend/user';
// const scheduleBookingList = [
//     {id: 1, price:'40',first_name:'Ahmad',name:'Hair Stylist', images: appImages.imageOne,stylist_id:'1',service_id:'1',time:'04:00 pm'},
//     {id: 2, price:'40',first_name:'Ahmad',name:'Hair Stylist',images: appImages.imageOne,stylist_id:'1',service_id:'1',time:'04:00 pm'},
//     {id: 3, price:'40',first_name:'Ahmad',name:'Hair Stylist',images: appImages.imageOne,stylist_id:'1',service_id:'1',time:'04:00 pm'},
//     {id: 4,price:'40',first_name:'Ahmad',name:'Hair Stylist' ,images: appImages.imageOne,stylist_id:'1',service_id:'1',time:'04:00 pm'},
//   ];
// const completedBookingList = [
//     {id: 1, price:'40',first_name:'Ahmad',name:'Hair Stylist',status:'Completed',images: appImages.imageOne,stylist_id:'1',service_id:'1',time:'04:00 pm'},
//     {id: 2, price:'40',first_name:'Ahmad',name:'Hair Stylist',status:'Completed',images: appImages.imageOne,stylist_id:'1',service_id:'1' ,time:'04:00 pm'},
//     {id: 3, price:'40',first_name:'Ahmad',name:'Hair Stylist',status:'Completed' ,images: appImages.imageOne,stylist_id:'1',service_id:'1',time:'04:00 pm'},
//     {id: 4, price:'40',first_name:'Ahmad',name:'Hair Stylist',status:'Completed',images: appImages.imageOne,stylist_id:'1',service_id:'1',time:'04:00 pm'},
//   ];
const monthDays = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
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
const Services = props => {
  const { navigate } = props.navigation;
  const { userDetail } = useSelector(state => state.user);
  console.log("ye i user id",userDetail.id);
  const [currentTabActive, setCurrentTabActive] = useState(true);
  const [pastTabActive, setPastTabActive] = useState(false);
  const [loader, setLoader] = useState(false);
  const [scheduleBookingList, setScheduleBookingList] = useState([]);
  const [completedBookingList, setCompletedBookingList] = useState([]);
  const [itemData, setitemData] = useState('');
  const [itemData1, setitemData1] = useState('');
  const [image, setImage] = useState("");
  console.log("image",image);
  console.log("itemData",JSON.stringify(itemData,null,2));
  const [isPauseAccountModalVisible, setIsPauseAccountModalVisible] = useState(false);
  const [isPauseAccountModalVisible1, setIsPauseAccountModalVisible1] = useState(false);
  // useEffect(() => {
  //   getScheduleBooking();
  //   getCompletedBooking();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      getScheduleBooking();
        getCompletedBooking();
    }, []),
  );
  const getScheduleBooking = () => {
    setLoader(true)
    try {
      const data = {
        user_id: userDetail?.id,
        // user_id: "97",
      };
      scheduleBookings(data).then((response) => {
        if (response?.success) {
          console.log("RESPONSE scheduleBookings=====> ", JSON.stringify(response?.data,null,2));
          setScheduleBookingList(response?.data);
          setImage(response?.data?.service?.image)
          setLoader(false)
        } else {
          setScheduleBookingList([]);
          setLoader(false)
        }
      })
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const getCompletedBooking = () => {
    try {
      const data = {
        user_id: userDetail?.id,
        month:'6',
        // user_id: "97",
        // boking_id: "20"
      };
      completedBookings(data).then((response) => {
        if (response?.success==true) {
          console.log("RESPONSE completedBookings=====> ", JSON.stringify(response?.data,null,2));
          setCompletedBookingList(response?.data);
        } else {
          setCompletedBookingList([]);
        }
      })
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const cancelBookingScheduled = () => {
    try {
      const data = {
        // stylist_id: userDetail?.id,
        user_id: itemData?.user_id,
        booking_id: itemData?.id,
      };
      cancelbookingData(data).then(response => {
        // console.log('showstylistscheduleData data22 =====> ', response);
        if (response?.success) {
          let a = scheduleBookingList.filter(itemm => itemm.id != itemData.id);
          setScheduleBookingList(a);
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
  const cancelBookingCompelted = () => {
  
    try {
      const data = {
        // stylist_id: userDetail?.id,
        user_id: itemData1.user_id,
        booking_id: itemData1.id,
      };
      cancelbookingData(data).then(response => {
        // console.log('showstylistscheduleData data22 =====> ', response);
        if (response?.success) {
          let a = completedBookingList.filter(itemm => itemm.id != itemData1.id);
          setCompletedBookingList(a);
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
          data={scheduleBookingList}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const d = new Date(item?.date);
            const a = monthDays[d.getUTCMonth()];
            const b = days[d.getUTCDay()];
            const e = (d.getDate());
          
            return (
              <ClientScheduleCard
            
                containerStyle={{ marginHorizontal: totalSize(4.5), paddingVertical: height(1) }}
                bgimage={(JSON.parse(item.service.image[0]!=null?item.service.image[0]:null))}
                image={item?.stylist?.profile_image!=null?item?.stylist?.profile_image:appImages.barber1}
                name={item?.stylist?.first_name}
                lastname={item?.stylist?.last_name}
                servicename={item?.service?.subservice?.name}
                price={item?.price}
                rating={item?.stylist_rating}
                date={`${b}, ${a} ${e}, ${d.getFullYear()}`}
                starttime={moment(item?.time?.split('-')[0], [
                    'HH:mm',
                  ]).format('hh:mm A') +
                    ' - ' +
                    moment(item?.time?.split('-')[1], [
                      'HH:mm',
                    ]).format('hh:mm A')}
                // endtime={item?.end_timeslot!=null?item?.end_timeslot:"06:00PM"}
                location={item?.stylist?.location!=null?item?.stylist?.location:'N/A'}
                onPress={() => { }}
                chatPress={() => navigate(routes.client.chatScreen,{rcvid:item.stylist.id,name:item.stylist.first_name,image:item.profile_image})}
                cancelPress={() => setIsPauseAccountModalVisible(!isPauseAccountModalVisible,setitemData(item))}
                // chatPress={() =>console.log("pressesd",JSON.stringify(item,null,2))}
              />
            );
          }}
        />
        <View style={{ marginBottom: totalSize(5) }}></View>
      </View>
    );
  };
  const RenderPastData = () => {
    return (
      <View>
        <FlatList
          //  contentContainerStyle={{ paddingVertical: height(2.5) }}
          data={completedBookingList}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const d = new Date(item?.date);
            const a = monthDays[d.getUTCMonth()];
            const b = days[d.getUTCDay()];
            const e = (d.getDate());
            return (
              <ClientCompletedCard
                containerStyle={{ marginHorizontal: width(4.5) }}
                bgimage={appImages.barber1}
                image={item?.stylist?.profile_image!=null?item?.stylist?.profile_image:appImages.barber1}
                name={item?.stylist?.first_name}
                servicename={item?.service?.name}
                price={item?.price}
                Status={item?.status}
                rating={item.rating}
                date={`${b}, ${a} ${e}, ${d.getFullYear()}`}
                time={moment(item?.start_timeslot?.split('-')[0], [
                  'HH:mm',
                ]).format('hh:mm A') +
                  ' - ' +
                  moment(item?.start_timeslot?.split('-')[1], [
                    'HH:mm',
                  ]).format('hh:mm A')}
                location={item?.stylist?.location!=null?item?.stylist?.location:'N/A'}
                // starttime={item?.booking_start!=null?item?.booking_start:'N/A'}
                // endtime={item?.booking_end!=null?item?.booking_end:'N/A'}
                // moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
                starttime={moment(item?.booking_start).format("ddd, MMM D - h:mm a")!=null?moment(item?.booking_start).format("ddd, MMM D - h:mm a"):"09:00pm"}
                endtime={moment(item?.booking_end).format("ddd, MMM D - h:mm a")!=null?moment(item?.booking_end).format("ddd, MMM D - h:mm a"):"09:00pm"}
                ReviewonPress={() => navigate(routes.client.postReview,{name:item?.stylist?.first_name,servicename:item?.service?.name,rating:item.rating,
                image:item?.stylist?.profile_image!=null?item?.stylist?.profile_image:appImages.barber1
                ,stylistid:item.stylist_id,serviceid:item.service_id})}
                cancelPress={() => setIsPauseAccountModalVisible1(!isPauseAccountModalVisible1,setitemData1(item))}
                // ReviewonPress={() => {console.log("pressed item",JSON.stringify(item,null,2)); }}
              />
            );
          }}
        />
        <View style={{ marginBottom: totalSize(2) }}></View>
      </View>
    );
  };

  return (
    <MainWrapperMatrial
      style2={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
      <ClientHeader
        heading={'Services'}
        notification={false}
        headingStyle={{ color: colors.appColor1 }}
        headerStyle={{ backgroundColor: '#FFF' }}
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setCurrentTabActive(true);
            setPastTabActive(false);
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            borderBottomWidth: currentTabActive ? 2 : 0,
            borderBottomColor: colors.appColor1,
            paddingVertical: height(2),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <SmallTitle style={{ color: colors.appColor1, textAlign: 'center' }}>
            Scheduled
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
            borderBottomWidth: pastTabActive ? 2 : 0,
            borderBottomColor: colors.appColor1,
            paddingVertical: height(2),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <SmallTitle style={{ color: colors.appColor1, textAlign: 'center' }}>
            Completed
          </SmallTitle>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper
          // animation="fadeInDown"
          style={{ marginTop: totalSize(1) }}>
          {currentTabActive ? (
            <>
              <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {loader ? (
                    <View
                      style={{
                        marginVertical: '10%',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                     <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
                    </View>
                  ) : scheduleBookingList?.length > 0 ? (
                    <RenderScheduleCurrent />
                  ) : (
                    <View
                      style={{
                        marginVertical: '75%',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <Text>No PastSchedule</Text>
                    </View>
                  )}
                </ScrollView>

              </View>
            </>
          ) : (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                {loader ? (
                  <View
                    style={{
                      marginVertical: '10%',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                   <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
                  </View>
                ) : completedBookingList?.length > 0 ? (
                  <RenderPastData />
                ) : (
                  <View
                    style={{
                      marginVertical: '75%',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <Text style={{color:'grey'}} >No Schedule</Text>
                  </View>
                )}
              </ScrollView>
            </>
          )}
        </Wrapper>

      </ScrollView>
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
                onPress={()=>{setIsPauseAccountModalVisible(!isPauseAccountModalVisible),cancelBookingScheduled()}}
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
                onPress={()=>{setIsPauseAccountModalVisible1(!isPauseAccountModalVisible1),cancelBookingCompelted()}}
              />
          </View>
            <Spacer height={sizes.baseMargin} />
          </CardWrapper>
        </Wrapper>
      </Modal>
    </MainWrapperMatrial>
  );
};

export default Services;
const styles = StyleSheet.create({
  wrapperStyle: {
    backgroundColor: '#FFF',
    marginHorizontal: totalSize(2.5),
    marginBottom: totalSize(2),
    borderRadius: 20,
    padding: totalSize(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 3,
  },
});
