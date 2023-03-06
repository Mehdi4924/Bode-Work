import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  MainWrapperMatrial,
  SmallText,
  ModalColored,
  SmallTitle,
  ButtonColored,
  ButtonColoredss,
  Spacer,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, fontFamily, sizes, ToastMessage} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';
import {Calendar} from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Calender from '../../../components/Calender/Calender';
import {useDispatch, useSelector} from 'react-redux';
import {addVacationTime} from '../../../services/backend/user';
import {useFocusEffect} from '@react-navigation/native';
const CalendarTheme = {
  backgroundColor: 'transparent',
  calendarBackground: 'transparent',
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

const DATA = [{id: 1, day: 'Vacation Mode', status: false}];

const ManageVacationTime = props => {
  const {userDetail} = useSelector(state => state.user);
  console.log('user details', userDetail);
  const [calendarModalStatus, setCalendarModalStatus] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [breakData, setBreakData] = useState([]);
  const [LeaveDates, setLeaveDates] = useState([]);
  const [loader, setLoader] = useState(false);
  const [date1, setdate1] = useState('');
  const [date2, setdate2] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      setIsEnabled(false);
      console.log('useeffect chal;a');
    }, []),
  );
  useEffect(() => {
    console.log('breakData =====> ', breakData);
    setIsEnabled(false);
  }, [breakData]);
  const toggleSwitch = index => {
    if (DATA[index].status) {
      DATA[index].status = false;
      setIsEnabled(false);
    } else {
      DATA[index].status = true;
      setIsEnabled(true);
    }
  };
  const calendarToggleModal = () => {
    setCalendarModalStatus(!calendarModalStatus);
  };

  const availabilityUpload = async () => {
    const {navigate, replace} = props.navigation;
    try {
      setLoader(true);

      const data = {
        user_id: userDetail?.id,
        start_date: date1,
        end_date: date2,
      };

      // console.log("ye aya form data", JSON.stringify(a, null, 2));
      addVacationTime(data).then(response => {
        console.log('RESPONSEw =====> ', response);
        if (response?.success == true) {
          ToastMessage('Successfully update');
          setLoader(false);
        } else {
          ToastMessage('error');
          setLoader(false);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  return (
    <MainWrapperMatrial style={{backgroundColor: '#000'}}>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
          marginTop: height(0),
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.appColor1,
            paddingVertical: height(2),
            paddingHorizontal: width(8),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{justifyContent: 'center'}}>
            <Ionicons name="chevron-back" size={totalSize(3)} color="#fff" />
          </TouchableOpacity>
          <View
            style={{flex: 1, justifyContent: 'center', marginLeft: width(8)}}>
            <SmallTitle style={{color: '#FFF'}}>
              Manage Vacation Time
            </SmallTitle>
          </View>
        </View>
        <KeyboardAwareScrollView
          style={{marginTop: height(2)}}
          showsVerticalScrollIndicator={false}>
          {DATA.map((val, key) => {
            return (
              <>
                <View
                  key={key}
                  style={{
                    flexDirection: 'row',
                    borderColor: '#E9E9E9',
                    borderTopWidth: key === 0 ? 1 : 0,
                    borderBottomWidth: 1,
                    paddingHorizontal: width(6),
                    paddingVertical: height(2),
                  }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <SmallTitle
                      style={{
                        fontFamily: fontFamily.appTextMedium,
                        fontSize: totalSize(1.7),
                      }}>
                      {val.day}
                    </SmallTitle>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    {/* <Switch
                                            trackColor={{ false: "#E9E9E9", true: "#E9E9E9" }}
                                            thumbColor={val.status ? colors.appColor1 : "#B5B5B5"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => toggleSwitch(key)}
                                            value={val.status}
                                        /> */}

                    {!val.status ? (
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
                {val.status && (
                  <>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        borderColor: '#E9E9E9',
                        borderTopWidth: 0,
                        borderBottomWidth: 1,
                        paddingHorizontal: width(5),
                        paddingVertical: height(2),
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <SmallText
                            style={{
                              fontWeight: 'bold',
                              fontSize: totalSize(1.5),
                            }}>
                            STARTS ON
                          </SmallText>
                        </View>
                        <View style={{flex: 1}}>
                          <ButtonColoredss
                            onPress={calendarToggleModal}
                            text={date1 && date1 != null ? date1 : 'select'}
                            textStyle={{
                              fontSize: totalSize(1.5),
                              paddingHorizontal: totalSize(0.1),
                            }}
                            buttonStyle={{
                              marginLeft: totalSize(9.5),
                              borderRadius: 10,
                              height: height(4),
                              marginHorizontal: width(0),
                            }}
                          />
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        borderColor: '#E9E9E9',
                        borderTopWidth: 0,
                        borderBottomWidth: 1,
                        paddingHorizontal: width(5),
                        paddingVertical: height(2),
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                          <SmallText
                            style={{
                              fontWeight: 'bold',
                              fontSize: totalSize(1.5),
                            }}>
                            ENDS ON
                          </SmallText>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                          <ButtonColoredss
                            onPress={calendarToggleModal}
                            text={date2 && date2 != null ? date2 : 'select'}
                            textStyle={{
                              fontSize: totalSize(1.5),
                              paddingHorizontal: totalSize(0),
                              fontFamily: fontFamily.appTextRegular,
                            }}
                            buttonStyle={{
                              marginLeft: totalSize(9.5),
                              borderRadius: 10,
                              height: height(4),
                              marginHorizontal: width(0),
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </>
                )}
              </>
            );
          })}
          <Spacer height={sizes.baseMargin} />
          <Spacer height={sizes.baseMargin} />
          <Spacer height={sizes.baseMargin} />
          <Spacer height={sizes.baseMargin} />
          <Spacer height={sizes.baseMargin} />

          {isEnabled ? (
            <>
              {loader ? (
                <View>
                  <ActivityIndicator
                    size={totalSize(3)}
                    color={colors.appColor1}
                  />
                </View>
              ) : (
                <ButtonColored
                  onPress={() => availabilityUpload()}
                  text={'Save'}
                />
              )}
            </>
          ) : null}
          <Spacer height={sizes.baseMargin} />
          <Spacer height={sizes.baseMargin} />
        </KeyboardAwareScrollView>
      </View>
      <ModalColored
        isVisible={calendarModalStatus}
        toggleModal={calendarToggleModal}
        modalHeight={4}
        containerstyle={{backgroundColor: '#FFF'}}
        content={
          <View style={{paddingHorizontal: width(4)}}>
            {/* <Calendar
                            markingType={'custom'}
                            current={new Date()}
                            minDate={new Date()}
                            markedDates={LeaveDates}
                            onDayPress={day => {
                                console.log("DAY =====> ", day);
                            }}
                            theme={CalendarTheme}
                        /> */}
            {date1 == '' ? (
              <Calender
                onDatePress={date => {
                  setdate1(date.dateString),
                    console.log('datre in params', date);
                }}
              />
            ) : (
              <Calender
                onDatePress={date => {
                  setdate2(date.dateString),
                    console.log('datre in params', date);
                }}
              />
            )}
            <ButtonColored
              text="SET"
              onPress={calendarToggleModal}
              buttonStyle={{marginTop: height(52)}}
            />
          </View>
        }
      />
    </MainWrapperMatrial>
  );
};

export default ManageVacationTime;
