import React, {useEffect, useState} from 'react';
import {View, StatusBar, Switch, TouchableOpacity} from 'react-native';
import {
  MainWrapperMatrial,
  TinyTitle,
  SmallText,
  ModalColored,
  SmallTitle,
  MediumTitle,
  ButtonColored,
  Spacer,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, fontFamily, sizes, ToastMessage} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';
import DatePicker from 'react-native-date-picker';
import {
  addComingHours,
  showallAvailability,
} from '../../../services/backend/user';
import {useDispatch, useSelector} from 'react-redux';
const dateToday = new Date();
const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const mL = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DATA = [
  {
    id: 0,
    day: weekDays[dateToday.getDay() + 0],
    date: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    is_working: false,
    start_time: '09:00AM',
    end_time: '06:00PM',
    is_break: false,
    break_start: '01:00PM',
    break_end: '02:00PM',
  },
  {
    id: 1,
    day: weekDays[dateToday.getDay() + 1],
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    is_working: false,
    start_time: '09:00AM',
    end_time: '06:00PM',
    is_break: false,
    break_start: '01:00PM',
    break_end: '02:00PM',
  },
  {
    id: 2,
    day: weekDays[dateToday.getDay() + 2],
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    is_working: false,
    start_time: '09:00AM',
    end_time: '06:00PM',
    is_break: false,
    break_start: '01:00PM',
    break_end: '02:00PM',
  },
  {
    id: 3,
    day: weekDays[dateToday.getDay() + 3],
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    is_working: false,
    start_time: '09:00AM',
    end_time: '06:00PM',
    is_break: false,
    break_start: '01:00PM',
    break_end: '02:00PM',
  },
  {
    id: 4,
    day: weekDays[dateToday.getDay() + 4],
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    is_working: false,
    start_time: '09:00AM',
    end_time: '06:00PM',
    is_break: false,
    break_start: '01:00PM',
    break_end: '02:00PM',
  },
  {
    id: 5,
    day: weekDays[dateToday.getDay() + 5],
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    is_working: false,
    start_time: '09:00AM',
    end_time: '06:00PM',
    is_break: false,
    break_start: '01:00PM',
    break_end: '02:00PM',
  },
  {
    id: 6,
    day: weekDays[dateToday.getDay() + 6],
    date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    is_working: false,
    start_time: '09:00AM',
    end_time: '06:00PM',
    is_break: false,
    break_start: '01:00PM',
    break_end: '02:00PM',
  },
];
var b = {};

const AdjustComingHour = props => {
  const {userDetail} = useSelector(state => state.user);
  const [invitationModalStatus, setInvitationModalStatus] = useState(false);
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [screenData, setScreenData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    showavailability();
  }, []);
  const showavailability = async () => {
    try {
      setLoader(true);
      const data = {
        user_id: userDetail?.id,
        // user_id: "22",
      };
      showallAvailability(data).then(response => {
        console.log('RESPONSEw showavailability =====> ', JSON.stringify(response,null,2));
        if (response?.success == true) {
          setScreenData(response?.data.length ? response.data : DATA);
          setLoader(false);
        } else {
          setLoader(false);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const Upload = async () => {
    const {navigate, replace} = props.navigation;
    try {
      const newData = screenData.map((item, index) => {
        // b[`day[${index}][day]`] = item.day;
        b[`days[${index}][date]`] = item.date;
        b[`days[${index}][is_working]`] = item.is_working;
        b[`days[${index}][is_break]`] = item.is_break;
        b[`days[${index}][start_time]`] = item.start_time;
        b[`days[${index}][end_time]`] = item.end_time;
        if (item.break_end) {
          b[`days[${index}][break_end]`] = item.break_end;
        }
        if (item.break_start) {
          b[`days[${index}][break_start]`] = item.break_start;
        }
      });
      
      setLoader(true);
      b.user_id = userDetail?.id;
      // b.user_id = "22";
      const data = {
        ...b,
      };
      console.log('ye aya form data', JSON.stringify(b, null, 2));
      addComingHours(data).then(response => {
        console.log('RESPONSEw =====> ', JSON.stringify(response,null,2));
        if (response?.success == true) {
          ToastMessage('Successfully update');
        } else {
          ToastMessage('error');
          setLoader(false);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const toggleSwitch = index => {
    const newData = screenData;
    if (newData[index].is_working) {
      newData[index].is_working = false;
    } else {
      newData[index].is_working = true;
    }
    setRefreshing(!refreshing);
    setScreenData(newData);
  };
  const invitationToggleModal = () => {
    setInvitationModalStatus(!invitationModalStatus);
  };
  const addBreakHandle = index => {
    const newData = screenData;
    newData[index].is_break = true;
    setRefreshing(!refreshing);
    setScreenData(newData);
  };
  const removeBreakHandle = index => {
    const newData = screenData;
    newData[index].is_break = false;
    setRefreshing(!refreshing);
    setScreenData(newData);
  };
  const buttonCheck = screenData.find(item => item.is_working == true);

  return (
    <MainWrapperMatrial style={{backgroundColor: '#FFF'}}>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
          marginTop: height(1),
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.appColor1,
            paddingVertical: height(2),
            paddingHorizontal: width(8),
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{justifyContent: 'center'}}>
            <Ionicons name="chevron-back" size={totalSize(3)} color="#fff" />
          </TouchableOpacity>
          <View
            style={{flex: 1, justifyContent: 'center', marginLeft: width(8)}}>
            <SmallTitle style={{color: '#FFF'}}>Adjust Coming Hour</SmallTitle>
          </View>
        </View>
        {screenData && screenData.length > 0 ? (
          <>
            <KeyboardAwareScrollView
              style={{marginTop: height(2)}}
              showsVerticalScrollIndicator={false}>
              {screenData.map((val, key) => {
                return (
                  <>
                    <View
                      key={key}
                      style={{
                        flexDirection: 'row',
                        borderColor: '#E9E9E9',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        paddingHorizontal: width(6),
                        paddingVertical: height(2),
                        marginBottom: height(3),
                      }}>
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <SmallTitle
                          style={{
                            fontSize: totalSize(1.7),
                            fontFamily: fontFamily.appTextMedium,
                          }}>
                          {/* {val.date} */}
                          {val.date2 = 
                           (((mL[date.getMonth()] > 8) ? (mL[date.getMonth()] + 0) : ('' + (mL[date.getMonth()]+" " ))) + '' + ((date.getDate() > 9) ? date.getDate() +key: ( + (date.getDate() + key))) + ',' + date.getFullYear())}
                        </SmallTitle>
                        <SmallText
                          style={{
                            marginTop: height(0.5),
                            fontSize: totalSize(1.5),
                            fontFamily: fontFamily.appTextRegular,
                          }}>
                          {val.day}
                        
                        </SmallText>

                      </View>
                      <View style={{justifyContent: 'center'}}>
                        {!val.is_working ? (
                          <View
                            style={{
                              height: height(2.5),
                              width: width(10.5),
                              backgroundColor: '#E9E9E9',
                              // backgroundColor: 'red',
                              borderRadius: 10,
                              flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                              onPress={() => toggleSwitch(key)}
                              style={{
                                height: height(3.3),
                                width: width(6.3),
                                backgroundColor: '#B5B5B5',
                                borderRadius: 50,
                                borderWidth: 1.5,
                                borderColor: '#fff',
                                marginTop: -3,
                                elevation: 3,
                              }}></TouchableOpacity>
                          </View>
                        ) : (
                          <View
                            style={{
                              height: height(2.6),
                              width: width(10),
                              backgroundColor: '#E9E9E9',
                              borderRadius: 10,
                              flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                              style={{
                                height: height(2.6),
                                width: width(5),
                                backgroundColor: '#E9E9E9',
                                borderRadius: 50,
                              }}></TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => toggleSwitch(key)}
                              style={{
                                height: height(3.3),
                                width: width(6.3),
                                backgroundColor: '#08C4BB',
                                borderRadius: 50,
                                borderWidth: 1.5,
                                borderColor: '#fff',
                                marginTop: -3,
                                elevation: 3,
                              }}></TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                    {val.is_working && (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            borderColor: '#E9E9E9',
                            borderTopWidth: 0,
                            borderBottomWidth: 1,
                            paddingHorizontal: width(6),
                            paddingVertical: height(2),
                          }}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              borderRightColor: '#000',
                              borderRightWidth: 1,
                              marginRight: width(3),
                              paddingRight: width(3),
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <View style={{flex: 1, justifyContent: 'center'}}>
                                <SmallText style={{fontWeight: 'bold'}}>
                                  HOURS
                                </SmallText>
                              </View>
                              <View style={{flex: 1, justifyContent: 'center'}}>
                                <ButtonColored
                                  text={'09:00 AM'}
                                  textStyle={{fontSize: totalSize(1.5)}}
                                  buttonStyle={{
                                    marginHorizontal: 0,
                                    borderRadius: 10,
                                    height: height(4),
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                              <View style={{flex: 1, justifyContent: 'center'}}>
                                <SmallText style={{fontWeight: 'bold'}}>
                                  TO
                                </SmallText>
                              </View>
                              <View style={{flex: 1, justifyContent: 'center'}}>
                                <ButtonColored
                                  text={'06:00 PM'}
                                  textStyle={{fontSize: totalSize(1.5)}}
                                  buttonStyle={{
                                    marginHorizontal: 0,
                                    borderRadius: 10,
                                    height: height(4),
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                        {val.is_break ? (
                          <View
                            key={key}
                            style={{
                              flexDirection: 'row',
                              borderColor: '#E9E9E9',
                              borderTopWidth: 0,
                              borderBottomWidth: 1,
                              paddingHorizontal: width(6),
                              paddingVertical: height(2),
                            }}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                borderRightColor: '#000',
                                borderRightWidth: 1,
                                marginRight: width(3),
                                paddingRight: width(3),
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}>
                                  <SmallText style={{fontWeight: 'bold'}}>
                                    BREAK
                                  </SmallText>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}>
                                  <ButtonColored
                                    text={val.break_start}
                                    textStyle={{fontSize: totalSize(1.5)}}
                                    buttonStyle={{
                                      marginHorizontal: 0,
                                      borderRadius: 10,
                                      height: height(4),
                                    }}
                                  />
                                </View>
                              </View>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                              <View style={{flexDirection: 'row'}}>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}>
                                  <SmallText style={{fontWeight: 'bold'}}>
                                    TO
                                  </SmallText>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                  }}>
                                  <ButtonColored
                                    text={val.break_end}
                                    textStyle={{fontSize: totalSize(1.5)}}
                                    buttonStyle={{
                                      marginHorizontal: 0,
                                      borderRadius: 10,
                                      height: height(4),
                                    }}
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        ) : null}
                        {!val.is_break ? (
                          <View
                            style={{
                              borderColor: '#E9E9E9',
                              borderBottomWidth: 1,
                              paddingVertical: height(1),
                            }}>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => addBreakHandle(key)}>
                              <TinyTitle
                                style={{
                                  color: colors.appColor1,
                                  textAlign: 'center',
                                }}>
                                ADD BREAK
                              </TinyTitle>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: '#E9E9E9',
                              borderBottomWidth: 1,
                              paddingVertical: height(1),
                            }}>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => removeBreakHandle(key)}
                              // onPress={()=>console.log("preesd itm",index)}
                            >
                              <TinyTitle
                                style={{color: 'red', textAlign: 'center'}}>
                                REMOVE BREAK
                              </TinyTitle>
                            </TouchableOpacity>
                          </View>
                        )}
                      </>
                    )}
                  </>
                );
              })}
              <Spacer height={sizes.baseMargin} />
              {buttonCheck ? (
                <ButtonColored
                     onPress={() => Upload()}
                  text={'Save'}
                />
              ) : null}
              <Spacer height={sizes.baseMargin} />
              <Spacer height={sizes.baseMargin} />
            </KeyboardAwareScrollView>
          </>
        ) : null}
      </View>
      <>
        {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </>
      <ModalColored
        isVisible={invitationModalStatus}
        toggleModal={invitationToggleModal}
        modalHeight={14}
        containerstyle={{backgroundColor: '#FFF'}}
        content={
          <View>
            <Ionicons
              name="star"
              size={totalSize(10)}
              color="#C9A858"
              style={{alignSelf: 'center', marginBottom: height(3)}}
            />
            <MediumTitle style={{textAlign: 'center', color: colors.appColor1}}>
              Reservation Invitation Sent
            </MediumTitle>
            <ButtonColored
              text="Done"
              buttonStyle={{
                paddingHorizontal: width(5),
                borderRadius: 20,
                marginTop: height(4),
              }}
              onPress={invitationToggleModal}
            />
          </View>
        }
      />
    </MainWrapperMatrial>
    // <MainWrapperMatrial style={{ backgroundColor: "#FFF" }}>
    //     <StatusBar backgroundColor={"#FFF"} barStyle={'dark-content'} />
    //     <View style={{ flex: 1, backgroundColor: "#FFF", borderTopLeftRadius: 45, borderTopRightRadius: 45, marginTop: height(1) }}>
    //         <View style={{
    //             flexDirection: 'row',
    //             backgroundColor: colors.appColor1,
    //             paddingVertical: height(2),
    //             paddingHorizontal: width(8),
    //             borderTopLeftRadius: 45,
    //             borderTopRightRadius: 45,
    //         }}>
    //             <TouchableOpacity
    //                 onPress={() => props.navigation.goBack()}
    //                 style={{ justifyContent: 'center' }}>
    //                 <Ionicons
    //                     name='chevron-back'
    //                     size={totalSize(3)}
    //                     color="#fff"
    //                 />
    //             </TouchableOpacity>
    //             <View style={{ flex: 1, justifyContent: 'center', marginLeft: width(8) }}>
    //                 <SmallTitle style={{ color: "#FFF" }}>Adjust Coming Hour</SmallTitle>
    //             </View>
    //         </View>
    //         <KeyboardAwareScrollView style={{ marginTop: height(2) }} showsVerticalScrollIndicator={false}>
    //             {DATA.map((val, key) => {
    //                 return (
    //                     <>
    //                         <View
    //                             key={key}
    //                             style={{
    //                                 flexDirection: 'row',
    //                                 borderColor: "#E9E9E9",
    //                                 // borderTopWidth:key===0?1:0,
    //                                 borderTopWidth: 1,
    //                                 borderBottomWidth: 1,
    //                                 paddingHorizontal: width(6),
    //                                 paddingVertical: height(2),
    //                                 // backgroundColor:'red'
    //                                 marginBottom: height(3)
    //                             }}
    //                         >
    //                             <View style={{ flex: 1, justifyContent: 'center' }}>
    //                                 <SmallTitle style={{ fontSize: totalSize(1.7), fontFamily: fontFamily.appTextMedium }}>{val.date}</SmallTitle>
    //                                 <SmallText style={{ marginTop: height(0.5), fontSize: totalSize(1.5), fontFamily: fontFamily.appTextRegular }}>{val.day}</SmallText>
    //                             </View>
    //                             <View style={{ justifyContent: 'center' }}>
    //                                 {/* <Switch
    //                                     trackColor={{ false: "#E9E9E9", true: "#E9E9E9" }}
    //                                     thumbColor={val.status ? colors.appColor1 : "#B5B5B5"}
    //                                     ios_backgroundColor="#3e3e3e"
    //                                     onValueChange={() => toggleSwitch(key)}
    //                                     value={val.status}
    //                                     borderColor={'red'}
    //                                     borderBottomWidth={3}

    //                                 /> */}
    //                                 {!val.status ?
    //                                     <View style={{ height: height(2.8), width: width(10), backgroundColor: '#E9E9E9', borderRadius: 10, flexDirection: 'row' }}>

    //                                         <TouchableOpacity
    //                                             onPress={() => toggleSwitch(key)}
    //                                             style={{ height: height(3.3), width: width(6.3), backgroundColor: '#B5B5B5', borderRadius: 50, borderWidth: 1.5, borderColor: '#fff', marginTop: -3, elevation: 3 }}>
    //                                         </TouchableOpacity>
    //                                     </View>
    //                                     : <View style={{ height: height(2.8), width: width(10), backgroundColor: '#E9E9E9', borderRadius: 10, flexDirection: 'row' }}>
    //                                         <TouchableOpacity
    //                                             // onPress={()=>settrackColor(false)}
    //                                             style={{ height: height(2.8), width: width(5), backgroundColor: '#E9E9E9', borderRadius: 50 }}>
    //                                         </TouchableOpacity>
    //                                         <TouchableOpacity
    //                                             onPress={() => toggleSwitch(key)}
    //                                             style={{ height: height(3.3), width: width(6.3), backgroundColor: '#08C4BB', borderRadius: 50, borderWidth: 1.5, borderColor: '#fff', marginTop: -3, elevation: 3 }}>
    //                                         </TouchableOpacity>
    //                                     </View>}
    //                             </View>
    //                         </View>
    //                         {val.status &&
    //                             <>
    //                                 <View style={{
    //                                     flexDirection: 'row',
    //                                     borderColor: "#E9E9E9",
    //                                     borderTopWidth: 0,
    //                                     borderBottomWidth: 1,
    //                                     paddingHorizontal: width(6),
    //                                     paddingVertical: height(2)
    //                                 }}>
    //                                     <View style={{ flex: 1, justifyContent: 'center', borderRightColor: "#000", borderRightWidth: 1, marginRight: width(3), paddingRight: width(3) }}>
    //                                         <View style={{ flexDirection: 'row' }}>
    //                                             <View style={{ flex: 1, justifyContent: 'center' }}>
    //                                                 <SmallText style={{ fontWeight: "bold" }}>HOURS</SmallText>
    //                                             </View>
    //                                             <View style={{ flex: 1, justifyContent: 'center' }}>
    //                                                 <ButtonColored
    //                                                     text={"09:00 AM"}
    //                                                     textStyle={{ fontSize: totalSize(1.5) }}
    //                                                     buttonStyle={{ marginHorizontal: 0, borderRadius: 10, height: height(5) }}
    //                                                 />
    //                                             </View>
    //                                         </View>
    //                                     </View>
    //                                     <View style={{ flex: 1, justifyContent: 'center' }}>
    //                                         <View style={{ flexDirection: 'row' }}>
    //                                             <View style={{ flex: 1, justifyContent: 'center' }}>
    //                                                 <SmallText style={{ fontWeight: "bold" }}>TO</SmallText>
    //                                             </View>
    //                                             <View style={{ flex: 1, justifyContent: 'center' }}>
    //                                                 <ButtonColored
    //                                                     text={"09:00 AM"}
    //                                                     textStyle={{ fontSize: totalSize(1.5) }}
    //                                                     buttonStyle={{ marginHorizontal: 0, borderRadius: 10, height: height(5) }}
    //                                                 />
    //                                             </View>
    //                                         </View>
    //                                     </View>
    //                                 </View>
    //                                 {breakData.map((item, index) => {
    //                                     return (
    //                                         <>
    //                                             {val.id === item.id &&
    //                                                 <View
    //                                                     key={index}
    //                                                     style={{
    //                                                         flexDirection: 'row',
    //                                                         borderColor: "#E9E9E9",
    //                                                         borderTopWidth: 0,
    //                                                         borderBottomWidth: 1,
    //                                                         paddingHorizontal: width(6),
    //                                                         paddingVertical: height(2)
    //                                                     }}
    //                                                 >
    //                                                     <View style={{ flex: 1, justifyContent: 'center', borderRightColor: "#000", borderRightWidth: 1, marginRight: width(3), paddingRight: width(3) }}>
    //                                                         <View style={{ flexDirection: 'row' }}>
    //                                                             <View style={{ flex: 1, justifyContent: 'center' }}>
    //                                                                 <SmallText style={{ fontWeight: "bold" }}>BREAK</SmallText>
    //                                                             </View>
    //                                                             <View style={{ flex: 1, justifyContent: 'center' }}>
    //                                                                 <ButtonColored
    //                                                                     text={item.breakStart}
    //                                                                     textStyle={{ fontSize: totalSize(1.5) }}
    //                                                                     buttonStyle={{ marginHorizontal: 0, borderRadius: 10, height: height(5) }}
    //                                                                 />
    //                                                             </View>
    //                                                         </View>
    //                                                     </View>
    //                                                     <View style={{ flex: 1, justifyContent: 'center' }}>
    //                                                         <View style={{ flexDirection: 'row' }}>
    //                                                             <View style={{ flex: 1, justifyContent: 'center' }}>
    //                                                                 <SmallText style={{ fontWeight: "bold" }}>TO</SmallText>
    //                                                             </View>
    //                                                             <View style={{ flex: 1, justifyContent: 'center' }}>
    //                                                                 <ButtonColored
    //                                                                     text={item.breakEnd}
    //                                                                     textStyle={{ fontSize: totalSize(1.5) }}
    //                                                                     buttonStyle={{ marginHorizontal: 0, borderRadius: 10, height: height(5) }}
    //                                                                 />
    //                                                             </View>
    //                                                         </View>
    //                                                     </View>
    //                                                 </View>
    //                                             }
    //                                         </>
    //                                     )
    //                                 })}
    //                                 {breakData.length < 1 ?
    //                                     <View style={{ borderColor: "#E9E9E9", borderBottomWidth: 1, paddingVertical: height(1) }}>
    //                                         <TouchableOpacity
    //                                             activeOpacity={.7}
    //                                             onPress={() => addBreakHandle(key)}
    //                                         // onPress={()=>console.log("preesd itm",index)}
    //                                         >
    //                                             <TinyTitle style={{ color: colors.appColor1, textAlign: "center" }}>
    //                                                 ADD BREAK
    //                                             </TinyTitle>
    //                                         </TouchableOpacity>
    //                                     </View>
    //                                     : <View style={{ borderColor: "#E9E9E9", borderBottomWidth: 1, paddingVertical: height(1) }}>
    //                                         <TouchableOpacity
    //                                             activeOpacity={.7}
    //                                             onPress={() => removeBreakHandle(key)}
    //                                         // onPress={()=>console.log("preesd itm",index)}
    //                                         >
    //                                             <TinyTitle style={{ color: "red", textAlign: "center" }}>
    //                                                 REMOVE BREAK
    //                                             </TinyTitle>
    //                                         </TouchableOpacity>
    //                                     </View>}
    //                             </>
    //                         }
    //                     </>
    //                 )
    //             })}
    //         </KeyboardAwareScrollView>
    //     </View>
    //     <ModalColored
    //         isVisible={invitationModalStatus}
    //         toggleModal={invitationToggleModal}
    //         modalHeight={14}
    //         containerstyle={{ backgroundColor: "#FFF" }}
    //         content={
    //             <View>
    //                 <Ionicons
    //                     name='star'
    //                     size={totalSize(10)}
    //                     color="#C9A858"
    //                     style={{ alignSelf: 'center', marginBottom: height(3) }}
    //                 />
    //                 <MediumTitle style={{ textAlign: "center", color: colors.appColor1 }}>Reservation Invitation Sent</MediumTitle>
    //                 <ButtonColored
    //                     text="Done"
    //                     buttonStyle={{ paddingHorizontal: width(5), borderRadius: 20, marginTop: height(4) }}
    //                     onPress={invitationToggleModal}
    //                 />
    //             </View>
    //         }
    //     />
    // </MainWrapperMatrial>
  );
};

export default AdjustComingHour;
