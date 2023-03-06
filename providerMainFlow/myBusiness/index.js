import React, {Component, useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native';
import {
  Spacer,
  MediumTitle,
  ComponentWrapper,
  SmallTitle,
  RowWrapper,
  Wrapper,
  RegularText,
  LargeTitle,
  TitleWithInfo,
  StylerReviewCard,
  ProviderReviewCard,
  KeyboardAvoidingScrollView,
  StylistQualifierCard,
  RowWrapperBasic,
  MainWrapperMatrial,
  BusinessReviewCard,
  HomeScheduleCard,
  ButtonColored,
  ToastMessage,
} from '../../../components';
import {sizes, appStyles, colors, appImages, fontFamily} from '../../../themes';
import {ButtonGroup} from 'react-native-elements';
import {width, height, totalSize} from 'react-native-dimension';
import {LineChart, YAxis, Grid, XAxis, BarChart} from 'react-native-svg-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData, saveData} from '../../../backend/firebase/utility';
import moment from 'moment';
import MianHeader from '../../../components/header/mainHeader';
import {routes} from '../../../services';
import {LogBox} from 'react-native';
import * as scale from 'd3-scale';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import VDropDown from '../../../components/VDropDown';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import {useSelector} from 'react-redux';
import {
  businessMonthlyData,
  showStylistReviewData,
  businessWeeklyData,
  stylesMonthlyData,
} from '../../../services/backend/user';
import LinearGradient from 'react-native-linear-gradient';
const performanceData = [
  {
    id: 1,
    percentage: '100',
    titale: 'Completed Jobs',
    detail: 'Your honored 3 out of 3 requests.',
    details1:
      'High five! You continually go the extra mile and give your guests the 5 star treatment.',
    status: 'blue',
  },
  {
    id: 2,
    percentage: '100',
    titale: 'Completed Jobs',
    detail: 'Your honored 3 out of 3 requests.',
    details1:
      'High five! You continually go the extra mile and give your guests the 5 star treatment.',
    status: 'green',
  },
  {
    id: 3,
    percentage: '100',
    titale: 'Completed Jobs',
    detail: 'Your honored 3 out of 3 requests.',
    details1:
      'High five! You continually go the extra mile and give your guests the 5 star treatment.',
    status: 'yellow',
  },
];
const Reviews = [
  {
    imageUrl: appImages.user3,
    name: 'Jackob Black',
    rating: '4.5',
    service: 'Hair Cut',
    comment:
      'Maecenas interdum lorem eleifend orci aliquam mollis. Aliquam non rhoncus magna. Suspendisse aliquet tincidunt enim, ut commodo elit feugiat et.',
  },
  // {
  //   imageUrl: appImages.user1,
  //   name: 'Jane Alex',
  //   rating: '4.6',
  //   service: 'Hair Cut',
  //   comment:
  //     'Maecenas interdum lorem eleifend orci aliquam mollis. Aliquam non rhoncus magna. Suspendisse aliquet tincidunt enim, ut commodo elit feugiat et.',
  // },
];
const Qualifies = [
  {
    title: 'Silver Stylist',
    subTitle: 'Keep 85% of what you make',
    type: 'silver',
    checks: [
      'Keep a 4 Stars or above from clients',
      'Complete 20 Jobs in your lifetime',
    ],
  },
  {
    title: 'Gold Stylist',
    subTitle: 'Keep 90% of what you make',
    type: 'gold',
    checks: [
      'Keep a 4.6 Stars or above from clients',
      'Complete 35 Jobs in your lifetime',
    ],
  },
];
const scheduleData = [
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    title: 'ahmad',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
    detail:
      'Lorem ipsum tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis.',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    title: 'ahmad',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
    detail:
      'Lorem ipsum tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis.',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
    detail:
      'Lorem ipsum tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis.',
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: 'John Doe',
    rating: '4.55',
    price: '40',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
    detail:
      'Lorem ipsum tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis.',
  },
];
const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const MyBusiness = props => {
  const {userDetail} = useSelector(state => state.user);
  const dropdown = useRef(null);
  const [selectedIdx, setselectedIdx] = useState(-1);
  const [defaultValue, setdefaultValue] = useState('Years');
  const itemHeight = height(11);

  const [isLoading, setIsLoading] = useState(false);
  const [userinfo, setUserInfo] = useState({});
  const [token, setToken] = useState('');
  const [buttonSelectedIndex, setButtonSelectedIndex] = useState(0);
  const [reviews, setReviews] = useState(Reviews);
  const [qualifies, setQualifies] = useState(Qualifies);
  const [currentTabActive, setCurrentTabActive] = useState(true);
  const [pastTabActive, setPastTabActive] = useState(false);
  const [TabActive, setTabActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setselectedImage] = useState('');
  const [modelActive, setmodelActive] = useState(false);
  const [starCount, setstarCount] = useState(2.5);
  const [monthdetails, setmonthdetails] = useState('');
  const [reviewdetails, setreviewdetails] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [monthdata, setMonthData] = useState('');
  const [weekdata, setWeekData] = useState('');
  const [performance, setPerformance] = useState('');
  const [currentMonthOrder, setcurrentMonthOrder] = useState('');
  const [currentMonthSale, setcurrentMonthSale] = useState('');
  const [currentMonthHours, setcurrentMonthHours] = useState('');
  const [complete, setComplete] = useState('');
  const [response, setResponse] = useState('');
  const [accept, setAccept] = useState('');
  console.log('weekdata', weekdata);
  console.log('ye i rview detail', reviewdetails);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     showmonthDetails();
  //     showstylistData();
  //     showweekDetails();
  //   }, []),
  // );
  useEffect(() => {
    showmonthDetails();
      showstylistData();
      showweekDetails();
  }, []);
  // useEffect(() => {
  const showmonthDetails = (value) => {
    console.log(" call onsclect");
    try {
      const data = {
        stylist_id: userDetail?.id,
        year:value
        // viewer_id: 1,
        // stylist_id: '5',
        // service_id:id
      };
      businessMonthlyData(data).then(response => {
        // console.log('businessMonthlyData =====> ', response);
        if (response?.success) {
          console.log('businessMonthlyData service  =====> ', JSON.stringify(response,null,2));
          setmonthdetails(response);
          setcurrentMonthOrder(response?.currentMonthOrder);
          setcurrentMonthSale(response?.currentMonthSale);
          setcurrentMonthHours(response?.currentMonthHours);
          setPerformance(response?.performance);
          setComplete(response?.performance?.complete_jobs);
          setResponse(response?.performance?.response_rate);
          setAccept(response?.performance?.acceptance_rate)
          let a = Object.values(response?.sales);
          console.log('aaa', a);
          setMonthData(a);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const showweekDetails = () => {
    try {
      const data = {
        stylist_id: userDetail?.id,
      };
      businessWeeklyData(data).then(response => {
        // console.log('businessMonthlyData =====> ', response);
        if (response?.success) {
          console.log('businessMonthlyData service  =====> ', response);
          setmonthdetails(response);
          setPerformance(response?.performance);
          let b = Object.values(response?.sales);
          console.log('aaa', b);
          setWeekData(b);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const showstylistData = () => {
    try {
      const data = {
        // user_id: userDetail?.id,
        stylist_id: userDetail?.id,
        // stylist_id: '81',
        // service_id:id
      };
      showStylistReviewData(data).then(response => {
        // console.log('showstylistreviews =====> ', response);
        if (response?.success) {
          console.log('showstylistreviews service  =====> ', JSON.stringify(response.data,null,2));
          setreviewdetails(response.data);
        }
      });
    } catch (error) {
      // ToastMessage(error.message);
    }
  };
  // >>>>>>>>>>. actice in active for bottom tab
  if (pastTabActive == true) {
    props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  } else {
    props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        backgroundColor: colors.appColor1,
        height: sizes.tabBarHeight,
        borderRadius: 0,
      },
    });
  }
  // }, []);

  const toggleModal1 = () => {
    setModalVisible(!modalVisible);
  };
  const UpdateButtonIndex = buttonSelectedIndex => {
    setButtonSelectedIndex(buttonSelectedIndex);
    setRefreshing(!refreshing);
  };
  const RenderSchedule = () => {
    return (
      <FlatList
        contentContainerStyle={{paddingHorizontal: totalSize(1.5)}}
        data={reviewdetails}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <BusinessReviewCard
              name={item?.user?.first_name}
              lastname={item?.user?.last_name}
              bgimage={item?.stylist?.profile_image!=null?item?.stylist?.profile_image:appImages.barber1}
              image={item?.image!=null?item?.image:appImages.barber1}
              rating={item?.rating}
              detail={item?.comment}
              title={item.title}
              backwordPress={() => {
                toggleModal1(), setselectedImage(appImages.barber1);
              }}
              forwordPress={() => {
                toggleModal1(), setselectedImage(appImages.barber1);
              }}
              // onPress={() => {
              //   toggleModal1(), setselectedImage(appImages.barber1);
              // }}
              // onPress={()=>console.log('pressed item',JSON.stringify(item,null,2))}
              onPress={() => {}}
            />
          );
        }}
      />
    );
  };
  const RenderReviews = () => {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={Reviews}
        renderItem={({item, index}) => {
          return (
            <ProviderReviewCard
              containerStyle={[
                {
                  marginVertical: sizes.smallMargin,
                  marginLeft: index === 0 ? width(5) : 0,
                },
              ]}
              image={item.imageUrl}
              name={item.name}
              rating={item.rating}
              title={item.service}
              detail={item.comment}
            />
          );
        }}
      />
    );
  };

  const RenderQualifiers = () => {
    return (
      <FlatList
        data={qualifies}
        renderItem={({item, index}) => {
          return (
            <StylistQualifierCard
              containerStyle={[
                {
                  marginBottom: sizes.baseMargin,
                  marginTop: index === 0 ? sizes.baseMargin : 0,
                },
              ]}
              title={item.title}
              subTitle={item.subTitle}
              checks={item.checks}
              type={item.type}
            />
          );
        }}
      />
    );
  };

  const fill = colors.appColor1;
  const Buttons = ['Daily', 'Monthly'];
  const weekData = [200, 250, 150, 125, 150, 350, 400];
  // const monthData = [10, 0, 20, 20, 300, 400, 250, 200, 500, 300, 145, 367];
  const contentInset = {top: 20, bottom: 20};
  const contentInset1 = {top: 20, bottom: 20};
  const displayBalance = [
    {balance: 22, dayName: 'Mon', dayNumber: 1},
    {balance: 20, dayName: 'Tue', dayNumber: 2},
    {balance: 20, dayName: 'Wed', dayNumber: 3},
    {balance: 20, dayName: 'Thu', dayNumber: 4},
    {balance: 20, dayName: 'Fri', dayNumber: 5},
    {balance: 25, dayName: 'Sat', dayNumber: 6},
    {balance: 25, dayName: 'Sun', dayNumber: 7},
  ];
  LogBox.ignoreAllLogs();
  return (
    <MainWrapperMatrial
      style2={{
        borderBottomLeftRadius: pastTabActive ? 0 : 20,
        borderBottomRightRadius: pastTabActive ? 0 : 20,
      }}>
      <StatusBar backgroundColor={colors.appColor1} />
      <MianHeader
        iconLeftOnPress={() =>
          props.navigation.navigate(routes.provider.notifications)
        }
        heading={'My Business'}
        // iconRightOnPress={() => }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            paddingRight: width(15),
            paddingLeft: width(5),
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setCurrentTabActive(true);
              setPastTabActive(false);
              setTabActive(false);
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
            <SmallTitle
              style={{
                color: colors.appColor1,
                textAlign: 'center',
                fontFamily: fontFamily.gothicBold,
                fontSize: totalSize(1.5),
              }}>
              Performance
            </SmallTitle>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              // props.navigation.navigate(routes.provider.myBusinessReview);
              setCurrentTabActive(false);
              setPastTabActive(true);
              setTabActive(false);
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
            <SmallTitle
              style={{
                color: colors.appColor1,
                textAlign: 'center',
                fontFamily: fontFamily.gothicBold,
                fontSize: totalSize(1.5),
              }}>
              Reviews
            </SmallTitle>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setCurrentTabActive(false);
              setPastTabActive(false);
              setTabActive(true);
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              borderBottomWidth: TabActive ? 2 : 0,
              borderBottomColor: colors.appColor1,
              paddingVertical: height(2),
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <SmallTitle
              style={{
                color: colors.appColor1,
                textAlign: 'center',
                fontFamily: fontFamily.gothicBold,
                fontSize: totalSize(1.5),
              }}>
              Earnings
            </SmallTitle>
          </TouchableOpacity>
        </View>

        {currentTabActive ? (
          <>
            <View style={styles.performanceContainer}>
              {/* {performanceData.map((val, key) => {
                return (
                  <View style={{marginTop: height(2)}}>
                    <View style={styles.performaceCradView}>
                    
                      <View
                        style={[
                          styles.percentageView,
                          {
                            borderColor:
                              val.status == 'blue'
                                ? colors.appColor1
                                : null || val.status == 'green'
                                ? '#2FEC74'
                                : '#F3EE42',
                          },
                        ]}>
                        <Text style={styles.numberStyle}>100%</Text>
                      </View>
                      <View>
                        <Text style={styles.performancecardText1}>
                          { val.status == 'blue'
                                ? "Completed Jobs"
                                : null || val.status == 'green'
                                ? 'Response Rate'
                                : 'Acceptance Rate'}
                          
                        </Text>
                        <Text style={styles.performancecardText2}>
                          Your honored 3 out of 3 requests.
                        </Text>
                        <Text style={styles.performancecardText2}>
                          High five! You continually go the extra mile and give
                          your {'\n'}guests the 5 star treatment.
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })} */}
              <View style={{marginTop: height(2)}}>
                <View style={styles.performaceCradView}>
                  <View
                    style={[
                      styles.percentageView,
                      {
                        borderColor: colors.appColor1,
                     
                      },
                    ]}>
                    <Text style={styles.numberStyle}>{parseFloat(complete!=null?complete:"0").toFixed()}%</Text>
                  </View>
                  <View>
                    <Text style={styles.performancecardText1}>
                      Completed Jobs
                    </Text>
                    <Text style={styles.performancecardText2}>
                      Your honored 3 out of 3 requests.
                    </Text>
                    <Text style={styles.performancecardText2}>
                      High five! You continually go the extra mile and give your{' '}
                      {'\n'}guests the 5 star treatment.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: height(2)}}>
                <View style={styles.performaceCradView}>
                  <View
                    style={[
                      styles.percentageView,
                      {
                        borderColor: '#2FEC74',
                      
                      },
                    ]}>
                    <Text style={styles.numberStyle}>{parseFloat(response!=null?response:'0').toFixed()}%</Text>
                  </View>
                  <View>
                    <Text style={styles.performancecardText1}>
                    Response Rate
                    </Text>
                    <Text style={styles.performancecardText2}>
                      Your honored 3 out of 3 requests.
                    </Text>
                    <Text style={styles.performancecardText2}>
                      High five! You continually go the extra mile and give your{' '}
                      {'\n'}guests the 5 star treatment.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: height(2)}}>
                <View style={styles.performaceCradView}>
                  <View
                    style={[
                      styles.percentageView,
                      {
                        borderColor: '#F3EE42',
                       
                      },
                    ]}>
                    <Text style={styles.numberStyle}>{parseFloat(accept!=null?accept:'0').toFixed()}%</Text>
                  </View>
                  <View>
                    <Text style={styles.performancecardText1}>
                    Acceptance Rate
                    </Text>
                    <Text style={styles.performancecardText2}>
                      Your honored 3 out of 3 requests.
                    </Text>
                    <Text style={styles.performancecardText2}>
                      High five! You continually go the extra mile and give your{' '}
                      {'\n'}guests the 5 star treatment.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.ImagemainView}>
                <Image
                  source={appImages.performance}
                  style={styles.performanceImageStyle}
                  resizeMode="contain"
                />
                <Text style={styles.imageinnerTextStyle}>Performance Tips</Text>
              </View>
              <View>
                <Text style={styles.tipsOneStyle}>
                  Great hosts are prepared, responsive, and always follow
                  through on accepted bookings. Follow these simple tips to
                  improve your performance:
                </Text>
              </View>
              <View style={{paddingHorizontal: width(4)}}>
                <View style={{flexDirection: 'row'}}>
                  <Text>{'\u2B24'}</Text>
                  <Text style={styles.tipsText2}>
                    Keep your calendar up-to-date and set pickup & return hours
                    so you only get trips that work for you.
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text>{'\u2B24'}</Text>
                  <Text style={styles.tipsText2}>
                    Adjust preferences for your listings, including advance
                    notice and style duration settings.
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text styles={styles.bulletStyles}>{'\u2B24'}</Text>
                  <Text style={styles.tipsText2}>
                    Download the app and turn on notifications to keep up with
                    your trip requests and schedule.
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text styles={styles.bulletStyles}>{'\u2B24'}</Text>
                  <Text style={styles.tipsText2}>
                    Download the app and turn on notifications to keep up with
                    your trip requests and schedule.
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.subHeading}>
                  Silver Stylist and Golden Stylist Qualifier
                </Text>
              </View>
              <View>
                <Text style={styles.thirdText}>
                  Make more from every job. Get a Silver or{'\n'} Gold Badge on
                  your profile
                </Text>
              </View>
              <Spacer height={sizes.smallMargin} />
              <ImageBackground
                source={appImages.silver}
                resizeMode="cover"
                style={{
                  height: height(26),
                  width: width(95),
                  alignSelf: 'center',
                  borderRadius: 25,
                  paddingVertical: height(2),
                  paddingLeft: width(8),
                }}
                imageStyle={{borderRadius: 15}}>
                <MediumTitle style={[appStyles.textWhite]}>
                  Silver Stylist
                </MediumTitle>
                <Spacer height={sizes.smallMargin} />
                <SmallTitle style={[appStyles.textWhite]}>
                  Keep 85% of what you make
                </SmallTitle>
                <Spacer height={sizes.doubleBaseMargin} />
                <RowWrapperBasic style={[{marginTop: sizes.smallMargin}]}>
                  <Wrapper flex={8}>
                    <RegularText style={[appStyles.textWhite]}>
                      Keep a 4 Stars or above from clients
                    </RegularText>
                  </Wrapper>
                  <Wrapper flex={2} style={[appStyles.center]}>
                    <MaterialIcons
                      name="check-circle"
                      // type="font-awesome"
                      size={sizes.appIcons.medium}
                      color={colors.appTextColor6}
                    />
                  </Wrapper>
                </RowWrapperBasic>
                <RowWrapperBasic style={[{marginTop: sizes.smallMargin}]}>
                  <Wrapper flex={8}>
                    <RegularText style={[appStyles.textWhite]}>
                      Complete 20 Jobs in your lifetime
                    </RegularText>
                  </Wrapper>
                  <Wrapper flex={2} style={[appStyles.center]}>
                    <MaterialIcons
                      name="check-circle"
                      // type="font-awesome"
                      size={sizes.appIcons.medium}
                      color={colors.appTextColor6}
                    />
                  </Wrapper>
                </RowWrapperBasic>
              </ImageBackground>
              <Spacer height={sizes.smallMargin} />
              <Spacer height={sizes.smallMargin} />
              <ImageBackground
                source={appImages.gold}
                resizeMode="cover"
                style={{
                  height: height(26),
                  width: width(95),
                  alignSelf: 'center',
                  borderRadius: 25,
                  paddingVertical: height(2),
                  paddingLeft: width(8),
                }}
                imageStyle={{borderRadius: 15}}>
                <MediumTitle style={[appStyles.textWhite]}>
                  Gold Stylist
                </MediumTitle>
                <Spacer height={sizes.smallMargin} />
                <SmallTitle style={[appStyles.textWhite]}>
                  Keep 90% of what you make
                </SmallTitle>
                <Spacer height={sizes.doubleBaseMargin} />
                <RowWrapperBasic style={[{marginTop: sizes.smallMargin}]}>
                  <Wrapper flex={8}>
                    <RegularText style={[appStyles.textWhite]}>
                      Keep a 4.6 Stars or above from clients
                    </RegularText>
                  </Wrapper>
                  <Wrapper flex={2} style={[appStyles.center]}>
                    <MaterialIcons
                      name="check-circle"
                      // type="font-awesome"
                      size={sizes.appIcons.medium}
                      color={colors.appTextColor6}
                    />
                  </Wrapper>
                </RowWrapperBasic>
                <RowWrapperBasic style={[{marginTop: sizes.smallMargin}]}>
                  <Wrapper flex={8}>
                    <RegularText style={[appStyles.textWhite]}>
                      Complete 35 Jobs in your lifetime
                    </RegularText>
                  </Wrapper>
                  <Wrapper flex={2} style={[appStyles.center]}>
                    <MaterialIcons
                      name="check-circle"
                      // type="font-awesome"
                      size={sizes.appIcons.medium}
                      color={colors.appTextColor6}
                    />
                  </Wrapper>
                </RowWrapperBasic>
              </ImageBackground>
              <Spacer height={sizes.smallMargin} />
              {/* <RenderQualifiers /> */}
            </View>
          </>
        ) : null}

        {pastTabActive ? (
          <View>
            {isLoading ? (
              <View
                style={{
                  marginVertical: '50%',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <ActivityIndicator size={'large'} />
              </View>
            ) : scheduleData?.length > 0 ? (
              <RenderSchedule />
            ) : (
              <View
                style={{
                  marginVertical: '75%',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text>No Schedule</Text>
              </View>
            )}
            <Text style={styles.ratingtextStyle}>Ratings (3)</Text>
            <View style={styles.ratingOterView}>
              <View style={{flex: 0.3}}>
                <View style={styles.ratingView}>
                  <Text style={styles.ratingTextStyle2}>5 Stars</Text>
                </View>
                <View style={styles.ratingView}>
                  <Text style={styles.ratingTextStyle2}>4 Stars</Text>
                </View>
                <View style={styles.ratingView}>
                  <Text style={styles.ratingTextStyle2}>3 Stars</Text>
                </View>
                <View style={styles.ratingView}>
                  <Text style={styles.ratingTextStyle2}>2 Stars</Text>
                </View>
                <View style={styles.ratingView}>
                  <Text style={styles.ratingTextStyle2}>1 Stars</Text>
                </View>
                <View style={styles.ratingView}>
                  <Text style={styles.ratingTextStyle2}>Not Rated</Text>
                </View>
              </View>
              <View style={{flex: 0.7}}>
                <View style={styles.ratingView}>
                  <View style={styles.linebarratingView}>
                    <LinearGradient
                      colors={['#01CED1', '#14B1E4', '#2992FB']}
                      style={[
                        styles.linebarratingView,
                        {backgroundColor: colors.appColor1},
                      ]}></LinearGradient>
                  </View>
                </View>
                <View style={styles.ratingView}>
                  <View style={styles.linebarratingView}>
                    <LinearGradient
                      colors={['#01CED1', '#14B1E4', '#2992FB']}
                      style={[
                        styles.linebarratingView,
                        {
                          backgroundColor: colors.appColor1,
                          marginRight: width(10),
                        },
                      ]}></LinearGradient>
                  </View>
                </View>
                <View style={styles.ratingView}>
                  <View style={styles.linebarratingView}>
                    <LinearGradient
                      colors={['#01CED1', '#14B1E4', '#2992FB']}
                      style={[
                        styles.linebarratingView,
                        {
                          backgroundColor: colors.appColor1,
                          marginRight: width(50),
                        },
                      ]}></LinearGradient>
                  </View>
                </View>
                <View style={styles.ratingView}>
                  <View style={styles.linebarratingView}></View>
                </View>
                <View style={styles.ratingView}>
                  <View style={styles.linebarratingView}></View>
                </View>
                <View style={styles.ratingView}>
                  <View style={styles.linebarratingView}></View>
                </View>
              </View>
            </View>
            {/* <ButtonColored text="Post a Review"
              onPress={() => props.navigation.navigate(routes.provider.postReview, { data: reviewdetails })} /> */}
            <Spacer height={sizes.baseMargin} />
            <Modal
              isVisible={modalVisible}
              toggleModal={toggleModal1}
              transparent={true}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                width: '100%',
                marginLeft: -0.01,
              }}
              containerstyle={{height: '100%', width: '100%'}}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modelMainContainer}>
                <Pressable onPress={() => toggleModal1()}>
                  <Image
                    source={{uri: selectedImage}}
                    style={{height: height(100), width: width(100)}}
                  />
                </Pressable>
              </View>
            </Modal>
          </View>
        ) : null}
        {TabActive ? (
          <>
            {isLoading ? (
              <View
                style={{
                  marginVertical: '50%',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <ActivityIndicator size={'large'} />
              </View>
            ) : (
              <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper style={styles.componentWraperStyle}>
                  <SmallTitle>Monthly Earning</SmallTitle>
                  <View>
                    <View style={styles.dropMainView}>
                      <View>
                        <Text style={styles.dropdownTextStyle}>
                          Show Performance
                        </Text>
                      </View>
                      <Pressable
                        style={styles.dropDownsecondView}
                        // onPress={toggleModal1}
                        // onPress={() => dropdown.current.show()}
                      >
                        {/* <Text
                          style={[
                            styles.dropdownTextStyle,
                            {color: colors.appColor1},
                          ]}>
                          Months
                        </Text> */}

                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <ModalDropdown
                           ref={dropdown}
                            options={[
                              'For How Long',
                              '2022',
                              '2021',
                              '2020',
                              '2019',
                              'All time',
                            ]}
                            dropdownStyle={{
                              width: width(45),
                              height: height(25),
                              alignItems: 'center',
                              borderRadius: 15,
                              elevation: 5,
                              paddingVertical: height(1),
                              marginTop: height(3),
                              marginRight: -20,
                            }}
                            textStyle={[
                              styles.dropdownTextStyle,
                              {color: colors.appColor1},
                            ]}
                            defaultValue={defaultValue}
                            // defaultTextStyle={{color:colors.appColor1}}
                            renderSeparator={() => {
                              return (
                                <View style={{width: 0, height: 0}}></View>
                              );
                            }}
                            renderRow={(option, index, seperator) => {
                              return (
                                <TouchableOpacity
                                  activeOpacity={0.5}
                                  onPress={() => {
                                    console.log(index);
                                    const a = [
                                      'For How Long',
                                      '2022',
                                      '2021',
                                      '2020',
                                      '2019',
                                      'All time',
                                    ];
                                    // dropdown.current.select(index),
                                    setselectedIdx(index);
                                    setdefaultValue(a[index]);
                                    dropdown.current.hide();
                                  }}
                                  style={[
                                    styles.itemContainer,
                                    {
                                      height: itemHeight / 2.8,
                                      backgroundColor:
                                        index == selectedIdx
                                          ? '#EFEFEF'
                                          : colors.snow,
                                    },
                                  ]}>
                                  {/* <FontAwesome
                                    name={index == selectedIdx ? "check-square" : "square-o"}
                                    size={21}
                                    color={"red"}
                                    style={{ marginHorizontal: width(4) }}
                                  /> */}
                                  <View>
                                    <Text
                                      style={[
                                        styles.dropdownTextStyle,
                                        {
                                          color:
                                            index == selectedIdx
                                              ? 'black'
                                              : 'black',
                                        },
                                      ]}>
                                      {option}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              );
                            }}
                            onSelect={(index, value) =>( onSelect(index, value),showmonthDetails(value))}
                            defaultTextStyle={[
                              props.defaultTextStyle,
                              {color: colors.appColor1},
                            ]}
                            showsVerticalScrollIndicator={false}
                            dropdownTextStyle={{
                              fontFamily: fontFamily.appTextRegular,
                              fontSize: 8,
                            }}
                            style={{borderWidth: 0}}
                            selectStyle={{borderWidth: 0}}
                          />
                          <Ionicons
                            name={'chevron-down'}
                            size={totalSize(1.6)}
                            color={colors.lightgrey}
                            style={{marginTop: 3, marginLeft: width(1)}}
                          />
                        </View>
                      </Pressable>
                    </View>
                    {/* {modelActive?
                  <View style={{position:'absolute',height:height(20),width:width(20),backgroundColor:"#fff",elevation:5,marginTop:height(5)}}>
                   <Text>ahmad</Text>
                  </View>
                  :null
                } */}
                  </View>

                  {/* <ModalDropdown options={['option 1', 'option 2']}/> */}
                  <Modal
                    isVisible={modalVisible}
                    toggleModal={toggleModal1}
                    transparent={true}
                    // style={{backgroundColor:'rgba(0, 0, 0, 0.5)'}}
                    containerstyle={{height: height(30)}}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modelMainContainer}>
                      <Pressable
                        onPress={() => toggleModal1()}
                        style={[
                          styles.modelSecondView,
                          {backgroundColor: '#E5F2F2'},
                        ]}>
                        <Text style={styles.modelTextStyle}>price</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => toggleModal1()}
                        style={styles.modelSecondView}>
                        <Text style={styles.modelTextStyle}>Rating</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => toggleModal1()}
                        style={styles.modelSecondView}>
                        <Text style={styles.modelTextStyle}>Reviews</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => toggleModal1()}
                        style={styles.modelSecondView}>
                        <Text style={styles.modelTextStyle}>Recommended</Text>
                      </Pressable>
                    </View>
                  </Modal>
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <RowWrapper>
                  <Wrapper style={[appStyles.center]}>
                    <LargeTitle style={[appStyles.textPrimaryColor]}>
                      {/* ${monthdetails?.currentMonthSale!=null?monthdetails?.currentMonthSale:'0'} */}
                      ${currentMonthSale != null ? currentMonthSale : '0'}
                    </LargeTitle>
                    <Spacer height={sizes.smallMargin} />
                    <RegularText>{moment().format('MMMM, YYYY')}</RegularText>
                  </Wrapper>
                  <Wrapper style={[appStyles.center]}>
                    <LargeTitle style={[appStyles.textPrimaryColor]}>
                      {/* {monthdetails?.currentMonthHours!=null?monthdetails?.currentMonthHours:'0'} */}
                      {currentMonthHours != null ? currentMonthHours : '0'}
                    </LargeTitle>
                    <Spacer height={sizes.smallMargin} />
                    <RegularText>Hours</RegularText>
                  </Wrapper>
                  <Wrapper style={[appStyles.center]}>
                    <LargeTitle style={[appStyles.textPrimaryColor]}>
                      {/* {monthdetails?.currentMonthOrder!=null?monthdetails?.currentMonthOrder:'0'} */}
                      {currentMonthOrder != null ? currentMonthOrder : '0'}
                    </LargeTitle>
                    <Spacer height={sizes.smallMargin} />
                    <RegularText>Clients</RegularText>
                  </Wrapper>
                </RowWrapper>
                <Spacer height={sizes.baseMargin} />
                {buttonSelectedIndex === 0 ? (
                  <ComponentWrapper>
                    <RowWrapperBasic style={{height: height(30)}}>
                      <YAxis
                        data={weekdata}
                        contentInset={contentInset1}
                        svg={{
                          fill: colors.appColor1,
                          fontSize: 10,
                        }}
                        numberOfTicks={5}
                        formatLabel={value => `$${value}`}
                        min={0}
                        max={400}
                      />
                      <Wrapper
                        flex={1}
                        style={{
                          marginHorizontal: sizes.TinyMargin,
                          // backgroundColor:'#000',
                          height: height(35),
                        }}>
                        {/* {buttonSelectedIndex === 0 ? ( */}
                        <LineChart
                          style={{
                            flex: 1,
                            // backgroundColor:'red',
                            marginTop: height(4),
                          }}
                          data={weekdata}
                          numberOfTicks={13}
                          svg={{
                            stroke: colors.appColor1,
                            backgroundColor: 'green',
                          }}
                          contentInset={contentInset1}>
                          <Grid />
                        </LineChart>
                        {/* ) : (
                    <BarChart
                      style={{flex: 1}}
                      data={monthData}
                      svg={{fill}}
                      // svg={{ stroke: 'rgb(134, 65, 244)' }}
                      contentInset={contentInset}>
                      <Grid />
                    </BarChart>
                  )} */}

                        <XAxis
                          // showEvenNumberXaxisLabel = {false}
                          key={2}
                          style={{marginHorizontal: 0}}
                          data={weekDays}
                          formatLabel={(value, index) => weekDays[index]}
                          scale={scale.scaleBand}
                          svg={{fill: colors.appColor1}}
                        />
                      </Wrapper>
                    </RowWrapperBasic>
                  </ComponentWrapper>
                ) : (
                  <ComponentWrapper>
                    <RowWrapperBasic style={[{height: height(31.5)}]}>
                      <YAxis
                        data={monthdata}
                        contentInset={contentInset}
                        svg={{
                          fill: colors.appColor1,
                          fontSize: 10,
                        }}
                        numberOfTicks={2}
                        formatLabel={value => `$${value}`}
                        min={0}
                        max={400}
                      />
                      <Wrapper
                        flex={1}
                        style={{marginHorizontal: sizes.TinyMargin}}>
                        <BarChart
                          style={{flex: 1, paddingHorizontal: width(1)}}
                          data={monthdata}
                          spacingInner={0.4}
                          svg={{fill}}
                          contentInset={contentInset}>
                          <Grid />
                        </BarChart>
                        <XAxis
                          key={1}
                          style={{marginHorizontal: 0}}
                          data={months}
                          formatLabel={(value, index) => months[index]}
                          scale={scale.scaleBand}
                          svg={{fontSize: 10, fill: 'black'}}
                        />
                      </Wrapper>
                    </RowWrapperBasic>
                  </ComponentWrapper>
                )}
                <Spacer height={sizes.baseMargin} />
                <ButtonGroup
                  buttons={Buttons}
                  onPress={UpdateButtonIndex}
                  containerStyle={styles.buttonGroupContainer}
                  selectedButtonStyle={styles.buttonGroupSelected}
                  selectedIndex={buttonSelectedIndex}
                  innerBorderStyle={{width: 0}}
                  textStyle={[styles.buttonGroupText]}
                />
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                  <SmallTitle>Current Metrics</SmallTitle>
                  <Spacer height={sizes.baseMargin} />
                  <TitleWithInfo
                    title="Response Rate"
                    info={parseFloat(
                      monthdetails?.performance?.response_rate != null
                        ? monthdetails?.performance?.response_rate
                        : '0',
                    ).toFixed()}
                    // /* ${parseFloat(dataSource?.avg_price!=null?dataSource?.avg_price:"N/A").toFixed()} */}
                    titleStyle={[styles.secondaryTitleStyle]}
                    infoStyle={[styles.secondaryInfoStyle]}
                  />
                  <Spacer height={sizes.TinyMargin} />
                  <TitleWithInfo
                    title="Acceptance"
                    info={parseFloat(
                      monthdetails?.performance?.acceptance_rate != null
                        ? monthdetails?.performance?.acceptance_rate
                        : '0',
                    ).toFixed()}
                    titleStyle={[styles.secondaryTitleStyle]}
                    infoStyle={[styles.secondaryInfoStyle]}
                  />
                  <Spacer height={sizes.TinyMargin} />
                  <TitleWithInfo
                    title="Reliability"
                    titleStyle={[styles.secondaryTitleStyle]}
                    infoStyle={[styles.secondaryInfoStyle]}
                  />
                  <Spacer height={sizes.TinyMargin} />
                  <TitleWithInfo
                    title="No Show"
                    info={'####'}
                    titleStyle={[
                      styles.secondaryTitleStyle,
                      {paddingLeft: width(3)},
                    ]}
                    infoStyle={[styles.secondaryInfoStyle]}
                  />
                  <Spacer height={sizes.TinyMargin} />
                  <TitleWithInfo
                    title="Late Cancel"
                    info={'####'}
                    titleStyle={[
                      styles.secondaryTitleStyle,
                      {paddingLeft: width(3)},
                    ]}
                    infoStyle={[styles.secondaryInfoStyle]}
                  />
                </ComponentWrapper>
                <Spacer height={sizes.baseMargin} />
                <View style={styles.erningMainView}>
                  <View style={styles.erningcolorView}></View>
                  <View>
                    <Text style={styles.erningTestStyle}>
                      $
                      {monthdetails?.performance?.earnings != null
                        ? monthdetails?.performance?.earnings
                        : '0'}{' '}
                      Style Earnings
                    </Text>
                  </View>
                </View>
                <View style={styles.erningMainView}>
                  <View
                    style={[
                      styles.erningcolorView,
                      {backgroundColor: '#7ED957'},
                    ]}></View>
                  <View>
                    <Text style={styles.erningTestStyle}>
                      $
                      {monthdetails?.performance?.upcoming != null
                        ? monthdetails?.performance?.upcoming
                        : '0'}{' '}
                      Upcoming Earnings
                    </Text>
                  </View>
                </View>
                <View style={styles.erningMainView}>
                  <View
                    style={[
                      styles.erningcolorView,
                      {backgroundColor: '#FF1616'},
                    ]}></View>
                  <View>
                    <Text style={styles.erningTestStyle}>
                      $
                      {monthdetails?.performance?.missed != null
                        ? monthdetails?.performance?.missed
                        : '0'}{' '}
                      Missed Earnings
                    </Text>
                  </View>
                </View>
                <View style={styles.erningMainView}>
                  <View
                    style={[
                      styles.erningcolorView,
                      {backgroundColor: '#FF914D'},
                    ]}></View>
                  <View>
                    <Text style={styles.erningTestStyle}>
                      $0 Reimbursements
                    </Text>
                  </View>
                </View>
                <Text style={styles.resourcesTextStyle}>RESOURCES</Text>
                <Text style={styles.viewTransaction}>
                  View Transaction History
                </Text>

                {/* <ComponentWrapper>
                <SmallTitle>Rating and Reviews</SmallTitle>
                <Spacer height={sizes.baseMargin} />
                <TitleWithInfo
                  title="Star Rating"
                  info={'5.0'}
                  titleStyle={[styles.secondaryTitleStyle]}
                  infoStyle={[styles.secondaryInfoStyle]}
                />
                <Spacer height={sizes.TinyMargin} />
                <TitleWithInfo
                  title="Reviews Count"
                  info={'399'}
                  titleStyle={[styles.secondaryTitleStyle]}
                  infoStyle={[styles.secondaryInfoStyle]}
                />
                <Spacer height={sizes.TinyMargin} />
                <TitleWithInfo
                  title="Reviews"
                  info="View All"
                  titleStyle={[styles.secondaryTitleStyle]}
                  infoStyle={[styles.secondaryInfoStyle]}
                  onPressInfo={() => {}}
                />
              </ComponentWrapper> */}
                {/* {reviews.length > 0 ? (
                <RenderReviews />
              ) : (
                <View
                  style={{
                    marginVertical: '10%',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text>No Review</Text>
                </View>
              )}

              <Spacer height={sizes.baseMargin} />
              <ComponentWrapper>
                <SmallTitle>
                  Silver Stylist and Gold Stylist Qualifier
                </SmallTitle>
                <Spacer height={sizes.smallMargin} />
                <RegularText style={[appStyles.textGray]}>
                  Make more from every job. Get a Silver or Gold Badge on your
                  profile
                </RegularText>
              </ComponentWrapper>
              
              <Spacer height={sizes.doubleBaseMargin} /> */}
              </KeyboardAvoidingScrollView>
            )}
          </>
        ) : null}
      </ScrollView>
    </MainWrapperMatrial>
  );
};

export default MyBusiness;
const styles = StyleSheet.create({
  // >>>>>>>>>>>>erning style>>>>>>>>>>>
  buttonGroupContainer: {
    borderRadius: 100,
    borderColor: colors.appColor1,
  },
  buttonGroupSelected: {
    backgroundColor: colors.appColor1,
    borderRadius: 100,
  },
  buttonGroupText: {
    ...appStyles.textRegular,
    color: colors.appColor1,
  },
  secondaryTitleStyle: {
    ...appStyles.textRegular,
  },
  secondaryInfoStyle: {
    ...appStyles.textRegular,
    color: colors.appColor1,
  },
  erningMainView: {
    flexDirection: 'row',
    marginHorizontal: width(15),
    paddingHorizontal: width(2),
    alignItems: 'center',
    // justifyContent:'center',
    marginTop: height(1),
  },
  erningcolorView: {
    height: height(2.5),
    width: width(5),
    borderRadius: 100,
    backgroundColor: colors.appColor1,
  },
  erningTestStyle: {
    color: colors.lightBlack,
    fontFamily: fontFamily.gothicMidium,
    fontSize: totalSize(1.9),
    marginLeft: width(10),
    // backgroundColor:'red'
  },
  resourcesTextStyle: {
    color: colors.lightBlack,
    fontFamily: fontFamily.gothicBold,
    fontSize: totalSize(3),
    textAlign: 'center',
    marginVertical: height(3),
  },
  viewTransaction: {
    color: '#08C4BB',
    fontFamily: fontFamily.gothicMidium,
    fontSize: totalSize(2),
    textAlign: 'center',
    marginBottom: height(1),
  },
  componentWraperStyle: {
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropMainView: {
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    height: height(6),
    alignItems: 'center',
    paddingHorizontal: width(3),
  },
  dropdownTextStyle: {
    color: colors.lightBlack,
    fontFamily: fontFamily.gothicMidium,
    fontSize: totalSize(1.2),
    textAlign: 'center',
    // marginVertical:height(3)
  },
  dropDownsecondView: {
    marginLeft: width(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // >>>>>>model style>>>>>>
  modelMainContainer: {
    backgroundColor: colors.snow,
    borderRadius: 20,
    // paddingBottom: height(3.8),
    paddingVertical: height(1),
    // height: height(50),
    // marginHorizontal: width(2),
    marginLeft: width(0),
    marginBottom: height(0),
    marginTop: height(2),
    // alignItems:'center',
    justifyContent: 'center',
  },
  modelSecondView: {
    height: 24,
    marginVertical: height(1),
    justifyContent: 'center',
    // backgroundColor:'#E5F2F2',
    marginHorizontal: width(3),
    paddingHorizontal: width(5),
    borderRadius: 20,
    alignItems: 'center',
  },
  modelTextStyle: {
    fontFamily: fontFamily.appTextRegular,
    color: colors.black,
    fontSize: totalSize(1.8),
  },

  // >>>>>>>>>>>Performance screen desigh>>>>>>>>>\
  performanceContainer: {
    marginHorizontal: width(4),
    marginTop: height(2),
  },
  performaceCradView: {
    flexDirection: 'row',
    backgroundColor: colors.snow,
    borderRadius: 15,
    elevation: 5,
    paddingHorizontal: width(2),
    paddingVertical: height(1),
  },
  percentageView: {
    height: height(10),
    width: width(20),
    borderRadius: 100,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width(2),
    borderColor: 'yellow',
  },
  performancecardText1: {
    color: colors.lightBlack,
    fontFamily: fontFamily.gothicBold,
    fontSize: totalSize(1.5),
  },
  performancecardText2: {
    color: colors.lightBlack,
    fontFamily: fontFamily.gothicBold,
    fontSize: totalSize(1.1),
  },
  numberStyle: {
    color: colors.black,
    fontFamily: fontFamily.gothicBold,
    fontSize: totalSize(2),
  },
  ImagemainView: {
    marginVertical: height(3),
    alignSelf: 'center',
    alignItems: 'center',
  },
  performanceImageStyle: {
    height: height(13),
    //  backgroundColor:'red'
  },
  imageinnerTextStyle: {
    color: colors.black,
    fontFamily: fontFamily.gothicBold,
    fontSize: totalSize(2.5),
    marginTop: height(1),
  },
  tipsOneStyle: {
    color: colors.black,
    fontFamily: fontFamily.gothicBold,
    fontSize: totalSize(1.45),
    textAlign: 'center',
    lineHeight: height(3),
  },
  subHeading: {
    color: colors.black,
    fontFamily: fontFamily.gothicBold,
    fontSize: totalSize(2.1),
    marginTop: height(1),
  },
  thirdText: {
    color: colors.lightBlack,
    fontFamily: fontFamily.appTextRegular,
    fontSize: totalSize(1.8),
    marginVertical: height(1),
  },
  tipsText2: {
    color: colors.lightBlack,
    fontFamily: fontFamily.gothicMidium,
    fontSize: totalSize(1.5),
    marginLeft: width(1),
  },
  bulletStyles: {
    color: colors.black,
    fontFamily: fontFamily.gothicMidium,
    fontSize: totalSize(1.5),
  },
  // >>>>>>>>>>>>>>>>>>>>>>review>>>>>>>>>>>>>>
  ratingtextStyle: {
    color: colors.lightBlack,
    fontFamily: fontFamily.gothicBold,
    fontSize: totalSize(1.9),
    marginVertical: height(0.5),
    marginHorizontal: width(7),
  },
  ratingTextStyle2: {
    color: colors.lightBlack,
    fontFamily: fontFamily.gothicMidium,
    fontSize: totalSize(1.9),
  },
  linebarratingView: {
    height: height(3),
    backgroundColor: '#EBE8E8',
    borderRadius: 20,
    color: colors.appColor1,
  },
  ratingView: {
    height: height(4),
    justifyContent: 'center',
  },
  ratingOterView: {
    marginHorizontal: width(7),
    flexDirection: 'row',
    flex: 1,
    marginBottom: height(5),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "space-between",
    justifyContent: 'center',
    width: width(40),
    // backgroundColor:'red',
    alignSelf: 'center',
    borderRadius: 25,
  },
});
// >>>>>>>>>>>>>>>>>>>>>>>
