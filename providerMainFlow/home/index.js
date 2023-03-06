import React, { Component, useState } from 'react';
import { View, Text, StatusBar, ScrollView, Image, FlatList, StyleSheet,Modal} from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  ComponentWrapper,
  Spacer,
  CardWrapper,
  SmallText,
  SmallTitle,
  LargeTitle,
  MediumTitle,
  ButtonColored,
  ButtonColoredss,
  MediumText,
  NotificationCard,
  HomeScheduleCard,
  LargeText,
  RegularText,
  ButtonGradient,
} from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';
import { colors, appStyles, sizes, appImages, fontFamily, fontSize } from '../../../themes';
import { width, height, totalSize } from 'react-native-dimension';
import MianHeader from '../../../components/header/mainHeader';
import { useFocusEffect } from '@react-navigation/native';
import { routes } from '../../../services';
import {useSelector} from 'react-redux';
import {userHomeData,cancelbookingData} from '../../../services/backend/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const monthDays = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const DATA = [1, 2, 3, 4, 5, 6];
const scheduleData = [
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: "John Doe",
    rating: '4.55',
    price: "40",
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: "John Doe",
    rating: '4.55',
    price: "40",
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: "John Doe",
    rating: '4.55',
    price: "40",
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: "John Doe",
    rating: '4.55',
    price: "40",
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
  }
];

const Home = (props) => {
  const { navigate } = props.navigation;
  const [isLoading, setIsLoading] = useState(false);
  const [homeData, sethomeData] = useState("");
  const [erning, seterning] = useState("");
  const [reliability, setreliability] = useState("");
  const {userDetail} = useSelector(state => state.user);
  const [itemData, setitemData] = useState('');
  const [isPauseAccountModalVisible, setIsPauseAccountModalVisible] = useState(false);
  console.log("ye i user details",userDetail);
  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [])
  );
  const getUserData = () => {
    try {
      const data = {
        user_id: userDetail?.id,
        // user_id:"5",
      //  
      };
      userHomeData(data).then(response => {
        if (response?.success) {
          console.log('homedata =====> ', JSON.stringify(response.booking,null,2));
          sethomeData(response?.booking);
          seterning(response?.earning);
          setreliability(response?.reliability);
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
        user_id: itemData?.user_id,
        booking_id: itemData?.id,
      };
      cancelbookingData(data).then(response => {
        // console.log('showstylistscheduleData data22 =====> ', response);
        if (response?.success) {
          let a = homeData.filter(itemm => itemm.id != itemData.id);
          sethomeData(a);
          ToastMessage('Cancelled');
          // props.navigation.navigate(routes.provider.Chats);
        } else {
          // setDataSource([]);
        }
      });
    } catch (error) {
      console.log('ye chaal');
      ToastMessage(error.message);
    }
  };
  const RenderSchedule = () => {
    return (

      <FlatList
        contentContainerStyle={{ paddingHorizontal: totalSize(2.5) }}
        data={homeData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const d = new Date(item?.date);
          const a = monthDays[d.getUTCMonth()];
          const b = days[d.getUTCDay()];
          const e = (d.getDate());
          return (
            <HomeScheduleCard
            buttonViewStyle={{ flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: width(10),}}
            containerStyle={{marginHorizontal: totalSize(0.7)}}
              bgimage={item?.service?.primary_image!=null?item?.service?.primary_image:appImages.barber1}
              image={item?.user?.profile_image!=null?item?.user?.profile_image:appImages.barber1}
              name={item?.user?.first_name!=null?item?.user?.first_name:'N/A'}
              lastname={item?.user?.last_name!=null?item?.user?.last_name:'N/A'}
              serviceName={item?.service?.name!=null?item?.service?.name:'Hair Style'}
              price={item?.price!=null?item?.price:'50'}
              rating={item.rating!=null?item.rating:'5.0'}
              location={item?.user?.location!=null?item?.user?.location:'N/A'}
              date={`${b}, ${a} ${e}, ${d.getFullYear()}`}
              // time={item?.start_timeslot}
              time=  {moment(item?.start_timeslot?.split('-')[0], [
                'HH:mm',
              ]).format('hh:mm A') +
                ' - ' +
                moment(item?.start_timeslot?.split('-')[1], [
                  'HH:mm',
                ]).format('hh:mm A')}
              // onPress={() =>  console.log("presd",item)}
              // cancelPress={()=>cancelBooking(item,index)}
              cancelPress={() => setIsPauseAccountModalVisible(!isPauseAccountModalVisible,setitemData(item))}
              onPress={() =>  navigate(routes.provider.jobDetail,{data:item})}
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

    );
  };
  return (
    <MainWrapperMatrial >
      <StatusBar backgroundColor={colors.appColor1} />
      <MianHeader
        iconLeftOnPress={() => navigate(routes.provider.notifications)}
        heading={"home"}
        iconRightOnPress={() => navigate(routes.provider.Chats)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper
          // animation="fadeInDown"
          style={{
            backgroundColor: colors.appColor1,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            elevation: 2,
          }}>
          <View style={{ paddingHorizontal: totalSize(3) }}>
            <MediumTitle style={{ color: "#FFF", fontSize: totalSize(2.3) }}>Today's Schedule</MediumTitle>
          </View>
          {isLoading ? (
            <View
              style={{
                marginVertical: '50%',
                alignItems: 'center',
                width: '100%',
              }}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : homeData?.length > 0 ? (

            <RenderSchedule />

          ) : (
            <View
              style={{
                marginVertical: height(23),
                alignItems: 'center',
                width: '100%',
              }}>
              <Text>No Schedule</Text>
            </View>
          )}

        </Wrapper>
        <Wrapper
          // animation="fadeInDown"
          style={styles.wapperStyle}
        >
          <Spacer height={height(3.3)} />
          <MediumTitle style={styles.mudiumTittleStyle}>Business Updates</MediumTitle>
          <View style={styles.bUpdateMainView}>
            <View style={styles.businessViewStyle}>
              <LargeTitle style={styles.number}>${erning}</LargeTitle>
              <SmallTitle style={styles.reliabiltyTextStyle} >Reliability Rate</SmallTitle>
              <MediumText style={styles.detailsTextStyle}>Lorem ipsum{"\n"} werj wersop</MediumText>
            </View>
            <View style={styles.businessViewStyle}>
              <LargeTitle style={styles.number}>${reliability}</LargeTitle>
              <SmallTitle style={styles.reliabiltyTextStyle}>Monthly Earning</SmallTitle>
              <MediumText style={styles.detailsTextStyle}>10% more than{"\n"} last month</MediumText>
            </View>
          </View>
          <ButtonColored
            text="Create Reservation"
            buttonStyle={styles.buttonStyle}
            onPress={() => props.navigation.navigate(routes.provider.searchClient)}
          />
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
              Are you sure cancel booking?
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
                onPress={()=>{setIsPauseAccountModalVisible(!isPauseAccountModalVisible),cancelBooking()}}
              />
           </View>
          
            <Spacer height={sizes.baseMargin} />
          </CardWrapper>
        </Wrapper>
      </Modal>
    </MainWrapperMatrial>
  );
}

export default Home;
const styles = StyleSheet.create({
  // business update style>>>>>>>>>
  number: {
    fontSize:totalSize(4.5),
    color: colors.appColor1,
    textAlign: "center", marginBottom: height(1),
    fontFamily: fontFamily.appTextRegular
  },
  reliabiltyTextStyle: {
    color: "#000", textAlign: "center",
    marginBottom: height(1),
    fontFamily: fontFamily.appTextRegular,
    fontSize: fontSize.small
  },
  detailsTextStyle: {
    color: "#7F7F7F",
    textAlign: "center", marginBottom: height(1),
    fontFamily: fontFamily.appTextRegular,
    fontSize: totalSize(1.4)
  },
  buttonStyle: {
    marginTop: height(2),
    marginBottom: height(3),
    paddingHorizontal: width(5),
    borderRadius: 10
  },
  businessViewStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  mudiumTittleStyle: {
    color: "#000",
    fontSize: totalSize(2.3)
  },
  wapperStyle: {
    marginTop: -totalSize(2),
    paddingHorizontal: totalSize(2),
    paddingTop: totalSize(0.8),
    elevation: 1,
  },
  bUpdateMainView: {
    flexDirection: 'row',
    marginTop: height(2.5)
  }
})
