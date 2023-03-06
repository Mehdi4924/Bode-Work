import React, {Component, useEffect, useState} from 'react';
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
} from 'react-native';
import {
  Spacer,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

// import ModalDropdown from 'react-native-modal-dropdown';
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
    name: "John Doe",
    rating: '4.55',
    price: "40",
    title:'ahmad',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
    detail:'Lorem ipsum tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis.'
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: "John Doe",
    rating: '4.55',
    price: "40",
    title:'ahmad',
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
    detail:'Lorem ipsum tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis.'
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: "John Doe",
    rating: '4.55',
    price: "40",
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
    detail:'Lorem ipsum tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis.'
  },
  {
    bgImage: appImages.barber1,
    image: appImages.barber1,
    name: "John Doe",
    rating: '4.55',
    price: "40",
    location: '17 Johnson Ave, New York, NY 10018',
    date: 'Sat, Jul 3, 2022 12:00 AM - 12:00 PM',
    detail:'Lorem ipsum tellus in pellentesque mollis, mauris orci dignissim nisl, id gravida nunc enis nibh. Maecenas convallis eros a ante dignissim, vitae elementum metus facilisis.'
  }
];
const MyBusinessReview = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [userinfo, setUserInfo] = useState({});
  const [token, setToken] = useState('');
  const [buttonSelectedIndex, setButtonSelectedIndex] = useState(0);
  const [reviews, setReviews] = useState(Reviews);
  const [qualifies, setQualifies] = useState(Qualifies);
  const [currentTabActive, setCurrentTabActive] = useState(false);
  const [pastTabActive, setPastTabActive] = useState(true);
  const [TabActive, setTabActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setselectedImage] = useState("");
  const [modelActive, setmodelActive] = useState(false);
 
  console.log("ye i image",selectedImage);
  const toggleModal1 = () => {
    setModalVisible(!modalVisible);
  };
  const UpdateButtonIndex = buttonSelectedIndex => {
    setButtonSelectedIndex(buttonSelectedIndex);
  };
  const RenderSchedule = () => {
    return (

      <FlatList
        contentContainerStyle={{ paddingHorizontal: totalSize(1.5) }}
        data={scheduleData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <BusinessReviewCard
            name={item.name}
              bgimage={item?.bgImage}
              image={item?.image}
              rating={item.rating}
              detail={item.detail}
              title={item.title}
              onPress={() => {toggleModal1(),setselectedImage(item.bgImage)} }
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
  const monthData = [10, 59, 250, 220, 300, 400, 250, 200, 500, 300, 145, 367];
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
  const contentInset = {top: 20, bottom: 20};
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
    <MainWrapperMatrial style2={{ borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,}}>
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
                props.navigation.goBack()
            //   setCurrentTabActive(true);
            //   setPastTabActive(false);
            //   setTabActive(false);
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
                props.navigation.goBack()
            //   setCurrentTabActive(false);
            //   setPastTabActive(false);
            //   setTabActive(true);
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

        {/* {currentTabActive ? (
          <>
            <View style={styles.performanceContainer}>
              {performanceData.map((val, key) => {
                return (
                  <View style={{marginTop: height(2)}}>
                    <View style={styles.performaceCradView}>
                      <View
                        style={[
                          styles.percentageView,
                          {
                            borderColor:
                              val.status == 'blue' ? colors.appColor1 : null ||val.status=="green"?"#2FEC74":"#F3EE42",
                          },
                        ]}>
                        <Text style={styles.numberStyle}>100%</Text>
                      </View>
                      <View>
                        <Text style={styles.performancecardText1}>
                          Completed Jobs
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
              })}
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
                  <Text>{"\u2B24"}</Text>
                  <Text style={styles.tipsText2}>
                    Keep your calendar up-to-date and set pickup & return hours
                    so you only get trips that work for you.
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text>{'\u2B24'}</Text>
                  <Text style={styles.tipsText2}>
                  Adjust preferences for your listings, including advance notice and style duration settings.
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text styles={styles.bulletStyles}>{'\u2B24'}</Text>
                  <Text style={styles.tipsText2}>
                  Download the app and turn on notifications to keep up with your trip requests and schedule.
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text styles={styles.bulletStyles}>{'\u2B24'}</Text>
                  <Text style={styles.tipsText2}>
                  Download the app and turn on notifications to keep up with your trip requests and schedule.
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
              <RenderQualifiers />
            </View>
          </>
        ) : null} */}

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
            <View style={{flex:0.3}}>
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
              <Text style={styles.ratingTextStyle2} >Not Rated</Text>
              </View>
            </View>
            <View style={{flex:0.7}}>
            <View style={styles.ratingView}>
              <View style={styles.linebarratingView}>
              <View style={[styles.linebarratingView,{backgroundColor:colors.appColor1}]}>
                </View>
              </View>
              </View>
            <View style={styles.ratingView}>
              <View style={styles.linebarratingView}>
              <View style={[styles.linebarratingView,{backgroundColor:colors.appColor1,marginRight:width(10)}]}>
                </View>
              </View>
              </View>
            <View style={styles.ratingView}>
              <View style={styles.linebarratingView}>
              <View style={[styles.linebarratingView,{backgroundColor:colors.appColor1,marginRight:width(18)}]}>
                </View>
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
          <ButtonColored text="post a Review"
          onPress={()=>props.navigation.navigate(routes.provider.postReview)} />
          <Spacer height={sizes.baseMargin} />
            <Modal
                    isVisible={modalVisible}
                    toggleModal={toggleModal1}
                    transparent={true}
                    style={{backgroundColor:'rgba(0, 0, 0, 0.5)',width:'100%',marginLeft:-0.01}}
                    containerstyle={{height:"100%",width:"100%"}}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modelMainContainer}>
                     <Pressable onPress={() => toggleModal1()}
                     >
                     <Image source={{uri:selectedImage}} style={{height:height(100),width:width(100)}}/>
                     </Pressable>
                    </View>
                  </Modal>
          </View>
          
        ) : null}
        {/* {TabActive ? (
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
                  <View style={styles.dropMainView}>
                    <View>
                      <Text style={styles.dropdownTextStyle}>
                        Show Performance
                      </Text>
                    </View>
                    <Pressable
                      style={styles.dropDownsecondView}
                      // onPress={toggleModal1}
                    >
                      <Text
                        style={[
                          styles.dropdownTextStyle,
                          {color: colors.appColor1},
                        ]}>
                        Months
                      </Text>
                      <Ionicons
                        name={'chevron-down'}
                        size={totalSize(2)}
                        color={colors.lightgrey}
                        style={{marginTop: 3, marginLeft: width(1)}}
                      />
                    </Pressable>
                  </View>
                 
                  <Modal
                    isVisible={modalVisible}
                    toggleModal={toggleModal1}
                    transparent={true}
               
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
                      $999
                    </LargeTitle>
                    <Spacer height={sizes.smallMargin} />
                    <RegularText>{moment().format('MMMM, YYYY')}</RegularText>
                  </Wrapper>
                  <Wrapper style={[appStyles.center]}>
                    <LargeTitle style={[appStyles.textPrimaryColor]}>
                      999
                    </LargeTitle>
                    <Spacer height={sizes.smallMargin} />
                    <RegularText>Hours</RegularText>
                  </Wrapper>
                  <Wrapper style={[appStyles.center]}>
                    <LargeTitle style={[appStyles.textPrimaryColor]}>
                      399
                    </LargeTitle>
                    <Spacer height={sizes.smallMargin} />
                    <RegularText>Clients</RegularText>
                  </Wrapper>
                </RowWrapper>
                <Spacer height={sizes.baseMargin} />
                {buttonSelectedIndex === 0 ? (
                  <ComponentWrapper>
                    <RowWrapperBasic style={[{height: height(30)}]}>
                      <YAxis
                        data={weekData}
                        contentInset={contentInset}
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
                        style={{marginHorizontal: sizes.TinyMargin}}>
                     
                        <LineChart
                          style={{flex: 1}}
                          data={weekData}
                          svg={{stroke: colors.appColor1}}
                          contentInset={contentInset}>
                          <Grid />
                        </LineChart>
               

                        <XAxis
                         
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
                        data={monthData}
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
                          data={monthData}
                          spacingInner={0.4}
                          svg={{fill}}
                          contentInset={contentInset}>
                          <Grid />
                        </BarChart>
                        <XAxis
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
                    info={'100%'}
                    titleStyle={[styles.secondaryTitleStyle]}
                    infoStyle={[styles.secondaryInfoStyle]}
                  />
                  <Spacer height={sizes.TinyMargin} />
                  <TitleWithInfo
                    title="Acceptance"
                    info={'100%'}
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
                      $3556 Style Earnings
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
                      $3556 Style Earnings
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
                      $3556 Style Earnings
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
                      $3556 Style Earnings
                    </Text>
                  </View>
                </View>
                <Text style={styles.resourcesTextStyle}>RESOURCES</Text>
                <Text style={styles.viewTransaction}>
                  View Transaction History
                </Text>
              </KeyboardAvoidingScrollView>
            )}
          </>
        ) : null} */}
      </ScrollView>
    </MainWrapperMatrial>
  );
};

export default MyBusinessReview;
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
    fontSize: totalSize(2.1),
    marginLeft: width(10),
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
    fontSize: totalSize(1.3),
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
  tipsText2:{
    color: colors.lightBlack,
    fontFamily: fontFamily.gothicMidium,
    fontSize: totalSize(1.5),
    marginLeft:width(1)
    
  },
  bulletStyles:{
    color: colors.black,
    fontFamily: fontFamily.gothicMidium,
    fontSize: totalSize(1.5),
  },
  // >>>>>>>>>>>>>>>>>>>>>>review>>>>>>>>>>>>>>
  ratingtextStyle:{
    color: colors.lightBlack,
    fontFamily: fontFamily.gothicBold,
    fontSize: totalSize(1.9),
    marginVertical: height(0.5),
    marginHorizontal:width(7)
  },
  ratingTextStyle2:{
    color: colors.lightBlack,
    fontFamily: fontFamily.gothicMidium,
    fontSize: totalSize(1.9),
   
  },
  linebarratingView:{
    height:height(3),backgroundColor:"#EBE8E8",borderRadius:20,color:colors.appColor1
  },
  ratingView:{
    height:height(4),
    justifyContent:'center'
  },
  ratingOterView:{marginHorizontal:width(7),flexDirection:'row',flex:1,marginBottom:height(5)}
});
