import React, {useState} from 'react';
import {View, Text, FlatList, StatusBar, ScrollView, Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import {
  ServiceIconCard,
  MainWrapperMatrial,
  Wrapper,
  TextInputBordered,
  Spacer,
  ComponentWrapper,
  TinyTitle,
  FeaturedServiceCard,
  SmallText,
  RegularText,
  ModalColored,
  ServiceIconCardNew,
  SmallTitle,
  LargeTitle,
  MediumTitle,
  ButtonColored,
  MediumText,
  LargeText,
  ButtonWithTextArrow,
  ButtonColoredss,
  HomeScheduleCard
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  colors,
  appStyles,
  sizes,
  appImages,
  appIcons,
  fontFamily,
  ToastMessage
} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';
import MianHeader from '../../../components/header/mainHeader';
// import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Calender from '../../../components/Calender/Calender';
import {routes} from '../../../services';
import { styles } from '../../authFlow/terms/styles';
import { useFocusEffect } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  stylesDateData,
  stylesMonthlyData,
} from '../../../services/backend/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const CalendarTheme = {
  arrowColor: 'white',
  'stylesheet.calendar.header': {
    week: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },

  backgroundColor: 'red',
  // calendarBackground: 'pink',
  textSectionTitleColor: colors.appColor1,
  selectedDayBackgroundColor: colors.appColor1,
  selectedDayTextColor: colors.appTextColor4,
  todayTextColor: colors.appColor1,
  dayTextColor: colors.appTextColor4,
  textDisabledColor: colors.appTextColor5,
  dotColor: colors.appColor1,
  selectedDotColor: colors.appColor1,
  arrowColor: colors.appTextColor1,
  disabledArrowColor: '#d9e1e8',
  monthTextColor: colors.appTextColor1,
  indicatorColor: colors.appTextColor1,
  textDayFontFamily: fontFamily.appTextRegular,
  textMonthFontFamily: fontFamily.appTextRegular,
  textDayHeaderFontFamily: fontFamily.appTextRegular,
  //textDayFontWeight: '300',
  //textMonthFontWeight: 'bold',
  //textDayHeaderFontWeight: '300',
  textDayFontSize: totalSize(1.5),
  textMonthFontSize: totalSize(1.5),
  textDayHeaderFontSize: totalSize(1.5),
}; 
// day: weekDays[dateToday.getDay() + 0],
const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dateToday = new Date();
var date = new Date();
    const datemonth=( date.getFullYear());
   const month= mL[dateToday.getMonth() + 0]
   console.log(">>.........",datemonth);
const Availability = props => {
  const DATA = [1, 2, 3, 4, 5];
  const [LeaveDates, setLeaveDates] = useState([]);
  const [AvailabilityModalStatus, setAvailabilityModalStatus] = useState(false);
  const [homeData, sethomeData] = useState("");
  const [erning, seterning] = useState("");
  const [PastData, setPastData] = useState('');
  const [loader, setLoader] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  console.log("selected date",selectedDate);
  const {userDetail} = useSelector(state => state.user);
  console.log("ye i user details",userDetail);
  useFocusEffect(
    React.useCallback(() => {
      getstylistPastData();
    }, [])
  );
  const getstylistPastData = () => {
    setLoader(true)
    try {
      const data = {
        // user_id: userDetail?.id,
        stylist_id: '81',
        // month: '3',
      };
      stylesMonthlyData(data).then(response => {
        if (response?.success==true) {
          console.log('stylesMonthlyData =====> ', response.data);
          setPastData(response?.data);
          setLoader(false)
        }else{
          setPastData("");
          setLoader(false)
        }
      });
    } catch (error) {
      ToastMessage(error.message);
      setLoader(false)
    }
  };
  const getByDateData = () => {
    setLoader(true)
    try {
      const data = {
        // user_id: userDetail?.id,
        stylist_id: '81',
        date: selectedDate?.dateString,
      };
      console.log("form data getByDateData",data);
      stylesDateData(data).then(response => {
        if (response?.success==true) {
          console.log('stylesDateData =====> ', response.data);
          setPastData(response?.data);
          setLoader(false)
        }else{
          setPastData("");
          setLoader(false)
        }
      });
    } catch (error) {
      ToastMessage(error.message);
      setLoader(false)
    }
  };
  
  const RenderSchedule = () => {
    return (

      <FlatList
        contentContainerStyle={{ paddingHorizontal: totalSize(2.5) }}
        data={PastData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <HomeScheduleCard
                buttonViewStyle={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: width(6),
                }}
                containerStyle={{marginHorizontal: totalSize(1)}}
                // bgimage={item?.service?.image}
                bgimage={appImages.barber1}
                name={item?.stylist?.first_name}
                image={item?.stylist?.profile_image}
                price={item?.price}
                serviceName={item?.service?.name}
                rating={item.rating}
                date={item?.date}
                time={item?.time}
                location={item?.user?.location}
                onPress={() => {}}
                chatPress={()=> props.navigation.navigate(routes.provider.Chats)}
              />
          );
        }}
      />

    );
  };
  const availivilityToggleModal = () => {
    setAvailabilityModalStatus(!AvailabilityModalStatus);
  };

  return (
    <MainWrapperMatrial>
      <StatusBar backgroundColor={colors.appColor1} />
      <MianHeader
        iconLeftOnPress={() =>
          props.navigation.navigate(routes.provider.notifications)
        }
        heading={'Availability'}
        iconRightOnPress={() =>
          props.navigation.navigate(routes.provider.Chats)
        }
      />
      <KeyboardAwareScrollView
        style={{marginTop: height(1)}}
        showsVerticalScrollIndicator={false}>
        <Wrapper
        //  animation="fadeInDown"
         >
          <ComponentWrapper
            style={{
              backgroundColor: colors.appBgColor2,
              borderRadius: sizes.wrapperRadius,
            }}>
            {/* <Calendar
                            theme={CalendarTheme}
                            markingType={'custom'}
                            current={new Date()}
                            minDate={new Date()}
                            markedDates={LeaveDates}
                            onDayPress={day => {
                                console.log("DAY =====> ", day);
                                props.navigation.navigate(routes.provider.charges)
                            }}
                        /> */}
            <Calender
            
            // onDatePress={(date)=> console.log('datre in params',date)}
            onDatePress={(date)=> {setSelectedDate(date),getByDateData()}}
            selectedDate={selectedDate}/>
          </ComponentWrapper>
          <View style={{marginHorizontal: width(5), marginTop:height(5)}}>
            
            <MediumTitle>{month}{" "}{datemonth}</MediumTitle>
          </View>
        </Wrapper>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {loader ? (
                  <View
                    style={{
                      // marginVertical: '20%',
                      marginHorizontal:width(25),
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <ActivityIndicator size={"small"} color={colors.appColor1}/>
                  </View>
                ) : PastData?.length > 0 ? (
        <RenderSchedule />
        ) : (
          <View
            style={{
              marginVertical: '15%',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={{color:"grey",marginLeft:width(40)}}>No Schedule</Text>
          </View>
        )}
          {/* {DATA.map((val, key) => {
            return (
              <Wrapper
                key={key}
                // animation="fadeInDown"
                style={{
                  backgroundColor: '#FFF',
                  marginTop: totalSize(1),
                  marginLeft: key === 0 ? width(5) : 0,
                  marginRight: width(5),
                  marginBottom: totalSize(3),
                  borderRadius: 20,
                  padding: totalSize(2),
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.37,
                  shadowRadius: 7.49,
                  elevation: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: '#00000029',
                    borderBottomWidth: 1,
                    paddingBottom: totalSize(1),
                  }}>
                  <View>
                    <Image
                      source={appImages.imageOne}
                      style={{
                        height: totalSize(8),
                        width: totalSize(8),
                        resizeMode: 'cover',
                        borderRadius: 100,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      marginLeft: totalSize(1),
                    }}>
                    <SmallTitle style={{color: '#000'}}>Jane Doe</SmallTitle>
                    <Text>
                      <Ionicons
                        name="star"
                        size={totalSize(1.5)}
                        color="#C9A858"
                      />
                      <SmallText style={{color: '#000000'}}> (4.9)</SmallText>
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      marginLeft: totalSize(3),
                    }}>
                    <ButtonColoredss
                      text="Hair Cut"
                      textStyle={{
                        fontSize: 12,
                        fontFamily: fontFamily.appTextBold,
                      }}
                      buttonStyle={{
                        marginHorizontal: 0,
                        paddingHorizontal: width(6),
                        borderRadius: 100,
                        height: height(4),
                      }}
                      // onPress={() => }
                    />
                    <MediumTitle
                      style={{
                        color: '#000000',
                        marginTop: height(2),
                        textAlign: 'right',
                      }}>
                      $40
                    </MediumTitle>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: totalSize(1.4)}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <RegularText style={{color: '#7F7F7F'}}>
                      Time Slot
                    </RegularText>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <RegularText style={{color: '#000000'}}>
                      12:00 pm - 02:00 pm
                    </RegularText>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: totalSize(0.5)}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <RegularText style={{color: '#7F7F7F'}}>Date</RegularText>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <RegularText style={{color: '#000000'}}>
                      29th July, 2020
                    </RegularText>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: totalSize(2)}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <RegularText style={{color: '#7F7F7F'}}>
                      Location
                    </RegularText>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <RegularText style={{color: '#000000'}}>
                      17 Johnson Ave, NYC
                    </RegularText>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: totalSize(0.5)}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <RegularText style={{color: '#7F7F7F'}}>
                      Distance
                    </RegularText>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <RegularText style={{color: '#000000'}}>
                      6 miles away
                    </RegularText>
                  </View>
                </View>
              </Wrapper>
            );
          })} */}
        </ScrollView>
       
      </KeyboardAwareScrollView>
      <ModalColored
        style={{backgroundColor: 'rgba(255,255,255,0.9)'}}
        isVisible={AvailabilityModalStatus}
        toggleModal={availivilityToggleModal}
        modalHeight={7}
        containerstyle={{backgroundColor: '#FFF'}}
        content={
          <View>
            <MediumTitle style={{textAlign: 'center'}}>
              Update Availability
            </MediumTitle>
            <MediumText
              style={{
                color: '#CECECE',
                paddingVertical: height(2),
                textAlign: 'center',
                paddingHorizontal: width(4),
              }}>
              Need to update your weekly Availability?
            </MediumText>
            <TouchableOpacity
              onPress={() => {
                availivilityToggleModal();
                props.navigation.navigate(routes.provider.manageOngoingAvailability)
            }}
              style={{
                backgroundColor: colors.appColor1,
                borderRadius: 15,
                paddingVertical: height(1.5),
                justifyContent: 'space-between',
                marginHorizontal: width(5),
                flexDirection:'row',alignItems:'center',
            
              }}>
              <View style={{width:width(79),alignSelf:'center',marginLeft:width(4),alignItems:'center'}}>
                <Text
                  style={{
                    color: '#FFF',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontFamily: fontFamily.appTextRegular,
                    fontSize: totalSize(1.75),
                    marginVertical:height(0.6)

                  }}>
                  MANAGE ONGOING AVAILABILITY
                </Text>
              </View>
              <View style={{width:width(7)}} >
                <Ionicons
                  name={ 'chevron-forward'}
                  size={ totalSize(2)}
                  color={ "#fff"}
                />
              </View>
            </TouchableOpacity>
            {/* <ButtonWithTextArrow 
                            text="Manage Ongoing Availability"
                            tintColor={"#FFF"}
                            onPress={() => {
                                availivilityToggleModal();
                                props.navigation.navigate(routes.provider.manageOngoingAvailability)
                            }}
                            textStyle={{color:"#FFF",textAlign:"center",textTransform:"uppercase"}}
                            buttonStyle={{backgroundColor:colors.appColor1,paddingLeft:width(2),borderRadius:10,paddingVertical:height(1.5),justifyContent:'center'}}
                        /> */}
            <MediumText
              style={{
                color: '#CECECE',
                paddingVertical: height(2),
                textAlign: 'center',
                paddingHorizontal: width(4),
              }}>
              Taking break block off some time on your calendar.
            </MediumText>
            <TouchableOpacity
               onPress={() => {
                availivilityToggleModal();
                props.navigation.navigate(routes.provider.manageVacationTime);
              }}
              style={{
                backgroundColor: colors.appColor1,
                borderRadius: 15,
                paddingVertical: height(1.5),
                justifyContent: 'space-between',
                marginHorizontal: width(5),
                flexDirection:'row',alignItems:'center',
            
              }}>
              <View style={{width:width(79),alignSelf:'center',marginLeft:width(4),alignItems:'center'}}>
                <Text
                  style={{
                    color: '#FFF',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontFamily: fontFamily.appTextRegular,
                    fontSize: totalSize(1.75),
                    marginVertical:height(0.6)

                  }}>
                  Manage Vacation Time
                </Text>
              </View>
              <View style={{width:width(7)}} >
                <Ionicons
                  name={ 'chevron-forward'}
                  size={ totalSize(2)}
                  color={ "#fff"}
                />
              </View>
            </TouchableOpacity>
            {/* <ButtonWithTextArrow
              text="Manage Vacation Time"
              tintColor={'#FFF'}
              onPress={() => {
                availivilityToggleModal();
                props.navigation.navigate(routes.provider.manageVacationTime);
              }}
              textStyle={{
                color: '#FFF',
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
              buttonStyle={{
                backgroundColor: colors.appColor1,
                paddingLeft: totalSize(11),
                borderRadius: 10,
                paddingVertical: height(1.5),
              }}
            /> */}
            <MediumText
              style={{
                color: '#CECECE',
                paddingVertical: height(2),
                textAlign: 'center',
                paddingHorizontal: width(4),
              }}>
              Need to make a one-time adjustment to your upcoming Availability?
            </MediumText>
            <TouchableOpacity
               onPress={() => {
                availivilityToggleModal();
                props.navigation.navigate(routes.provider.adjustComingHour);
              }}
              style={{
                backgroundColor: colors.appColor1,
                borderRadius: 15,
                paddingVertical: height(1.5),
                justifyContent: 'space-between',
                marginHorizontal: width(5),
                flexDirection:'row',alignItems:'center',
            
              }}>
              <View style={{width:width(79),alignSelf:'center',marginLeft:width(4),alignItems:'center'}}>
                <Text
                  style={{
                    color: '#FFF',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontFamily: fontFamily.appTextRegular,
                    fontSize: totalSize(1.75),
                    marginVertical:height(0.6)

                  }}>
                  Adjust Coming Hour</Text>
              </View>
              <View style={{width:width(7)}} >
                <Ionicons
                  name={ 'chevron-forward'}
                  size={ totalSize(2)}
                  color={ "#fff"}
                />
              </View>
            </TouchableOpacity>
            {/* <ButtonWithTextArrow
              text="Adjust Coming Hour"
              tintColor={'#FFF'}
              onPress={() => {
                availivilityToggleModal();
                props.navigation.navigate(routes.provider.adjustComingHour);
              }}
              textStyle={{
                color: '#FFF',
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
              buttonStyle={{
                backgroundColor: colors.appColor1,
                borderRadius: 10,
                paddingVertical: height(1.5),
                paddingLeft: totalSize(11.6),
              }}
            /> */}
          </View>
        }
      />
       <ButtonColored
          text="Update Availability"
          buttonStyle={{
            marginTop: height(2),
            marginBottom: width(3),
            paddingHorizontal: width(5),
            borderRadius: 10,
          }}
          onPress={availivilityToggleModal}
        />
    </MainWrapperMatrial>
  );
};

export default Availability;
