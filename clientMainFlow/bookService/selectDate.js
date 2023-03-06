import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {
  MainWrapper,
  Wrapper,
  ComponentWrapper,
  RowWrapper,
  RegularText,
  TinyTitle,
  Spacer,
  ButtonBordered,
  ButtonColored,
} from '../../../components';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {colors, fontFamily, sizes} from '../../../themes';
import {totalSize, height} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import {routes} from '../../../services';
import {getData} from '../../../backend/firebase/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {SafeAreaView} from 'react-native';
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
const SelectedDateStyle = {
  container: {
    borderWidth: 1,
    borderColor: colors.appColor1,
    backgroundColor: 'transparent',
  },
  text: {
    color: colors.appColor1,
    fontFamily: fontFamily.appTextRegular,
  },
};
class SelectDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateSelected: false,
      availableDates: {
        // '2020-05-10': { selected: false, customStyles: SelectedDateStyle },
        // '2020-05-11': { selected: false, customStyles: SelectedDateStyle },
        // '2020-05-12': { selected: false, customStyles: SelectedDateStyle },
        // '2020-05-13': { selected: false, customStyles: SelectedDateStyle }
      },
      availableTimeSlots: [],
      LeaveDates: [],
      selectedTimeSlotIndex: null,
    };
  }

  async componentDidMount() {
    const {item} = this.props.route.params;
    // await AsyncStorage.getItem('Token').then(async data => {
    let LeaveDates = await getData('Availability', item.Id);
    this.setState({LeaveDates: LeaveDates.Available, loading: false});
    console.log(LeaveDates);
    // this.setState({availableDates: Availability.Available})
    this.forceUpdate();
    // });
  }

  renderTimeSlots = () => {
    const {availableTimeSlots, selectedTimeSlotIndex} = this.state;
    return (
      <Wrapper>
        <FlatList
          data={availableTimeSlots}
          renderItem={({item, index}) => {
            return (
              <Wrapper>
                {index === selectedTimeSlotIndex ? (
                  <ButtonColored
                    text={item.startTime + ' - ' + item.endTime}
                    buttonStyle={styles.availableTimeSlots}
                  />
                ) : (
                  <ButtonBordered
                    text={item.startTime + ' - ' + item.endTime}
                    onPress={() => {
                      this.setState({selectedTimeSlotIndex: index});
                      // console.log("Add time: ",moment(item.startTime,"hh:mm A"));
                      // let starttime= moment(item.startTime,"hh:mm A").format("hh:mm A");
                      // let endtime= moment(item.endTime,"hh:mm A");
                      // let CheckTime=moment(item.startTime,"hh:mm A");
                      // console.log("Check time: ",CheckTime);
                      // console.log("End time Without moment : ",item.endTime);
                      // console.log("End time: ",moment(item.endTime,"hh:mm A").format("hh:mm A"));
                      // for(let i=1;CheckTime<endtime;i++)
                      // {
                      //   CheckTime=moment(starttime,"hh:mm A").add(i*30,"minutes");
                      //   console.log("Add time: ",moment(CheckTime,"hh:mm A").format("hh:mm A"));

                      // }
                      // console.log("End time: ",moment(endtime,"h:mm A"));
                    }}
                    buttonStyle={styles.availableTimeSlots}
                  />
                )}
              </Wrapper>
            );
          }}
        />
      </Wrapper>
    );
  };
  render() {
    const {isDateSelected, availableDates, LeaveDates} = this.state;
    const {navigate} = this.props.navigation;
    const {item} = this.props.route.params;
    return (
      <MainWrapper>
        <ComponentWrapper>
          <TinyTitle>Select any available date</TinyTitle>
        </ComponentWrapper>
        <Spacer height={sizes.baseMargin} />
        <ComponentWrapper
          style={{
            backgroundColor: colors.appBgColor2,
            borderRadius: sizes.wrapperRadius,
          }}>
          <Calendar
            markingType={'custom'}
            current={new Date()}
            minDate={new Date()}
            markedDates={LeaveDates}
            // markedDates={availableDates}
            // Specify style for calendar container element. Default = {}
            style={
              {
                // borderWidth: 1,
                // borderColor: 'gray',
                //alignSelf: 'center',
                //height: height(40),
                // width: width(80)
              }
            }
            onDayPress={day => {
              // let oldList=LeaveDates;
              const _format = 'YYYY-MM-DD';
              const _selectedDay = moment(day.dateString).format(_format);
              const _SelectedDate = moment(day.dateString).format('YYYY-MM-DD');

              var dates = Object.keys(LeaveDates);
              let index = -1;
              let dateindex = -1;
              dates.forEach(element => {
                if (element === _selectedDay) {
                  if (index === -1) {
                    index += 1;
                  }
                  dateindex = index;
                }

                index += 1;
              });

              // console.log("_selectedDay : ",_selectedDay);
              // console.log("Dates Index: ",dateindex);
              // console.log("Dates: ",LeaveDates[_selectedDay].shifts);
              if (dateindex !== -1) {
                let availableTimeSlots = [];
                LeaveDates[_selectedDay].shifts.forEach(item => {
                  let starttime = moment(item.startTime, 'hh:mm A').format(
                    'hh:mm A',
                  );
                  let endtime = moment(item.endTime, 'hh:mm A');
                  let CheckTime = moment(item.startTime, 'hh:mm A');
                  console.log('Check time: ', CheckTime);
                  console.log('End time Without moment : ', item.endTime);
                  console.log(
                    'End time: ',
                    moment(item.endTime, 'hh:mm A').format('hh:mm A'),
                  );
                  for (let i = 1; CheckTime < endtime; i++) {
                    var startTime = moment(CheckTime, 'hh:mm A').format(
                      'hh:mm A',
                    );
                    CheckTime = moment(starttime, 'hh:mm A').add(
                      i * 30,
                      'minutes',
                    );
                    let CurrentTime = moment(new Date(), 'hh:mm');
                    var NewCurrentTime = moment(CurrentTime, 'hh:mm').format(
                      'HH:mm',
                    );
                    // alert(CurrentTime)
                    let endTime = moment(CheckTime, 'hh:mm A').format(
                      'hh:mm A',
                    );
                    let Obj = {
                      startTime: startTime,
                      endTime: endTime,
                    };
                    console.log(
                      'Check new time : ',
                      NewCurrentTime,
                      ' ',
                      endTime,
                      ' ',
                    );
                    var newstartTime = moment(CheckTime, 'hh:mm A').format(
                      'HH:mm',
                    );
                    // console.log('resutl', moment(NewCurrentTime).isBefore(newstartTime,"hour"));
                    var regExp = /(\d{1,2})\ (\d{1,2})\ (\w{2})/;
                    // if (
                    //   parseInt(NewCurrentTime.replace(regExp, '$1$2$3')) >
                    //   parseInt(startTime.replace(regExp, '$1$2$3'))
                    // ) {
                    //   // console.log('resutl', moment(NewCurrentTime).isBefore(newstartTime,"hour"));
                    // }
                    console.log("New Resuld: ",parseInt(NewCurrentTime.replace(regExp, '$1$2$3')) <
                    parseInt(newstartTime.replace(regExp, '$1$2$3')))
                    // if (NewCurrentTime.indexOf('PM' > -1)) {
                    if (parseInt(NewCurrentTime.replace(regExp, '$1$2$3')) <
                    parseInt(newstartTime.replace(regExp, '$1$2$3'))) {
                      availableTimeSlots.push(Obj);
                    }
                    // } else {
                    //   if (NewCurrentTime < startTime) {
                    //     availableTimeSlots.push(Obj);
                    //   } else {
                    //     // console.log(
                    //     //   'Add time: ',
                    //     //   moment(CheckTime, 'hh:mm A').format('hh:mm A',
                    //     //   CurrentTime),
                    //     // );
                    //   }
                    // }
                  }
                });

                this.setState({
                  _SelectedDate: _SelectedDate,
                  availableTimeSlots: availableTimeSlots,
                  isDateSelected: true,
                });
              } else {
                Toast.show('Provider Not Available on this date.', Toast.SHORT);
                this.setState({isDateSelected: false});
              }
            }}
            theme={CalendarTheme}
            // renderArrow={(right) => (<Icon name="email" />)}
            // renderHeader={(date) => {
            //   <RowWrapper style={[{ backgroundColor: 'red' }]}>
            //     <Icon name="email" />
            //     <RegularText>{date}</RegularText>
            //     <Icon name="email" />
            //   </RowWrapper>
            // }}
          />
        </ComponentWrapper>
        {isDateSelected ? (
          <Wrapper flex={1} marginVertical={height(18)}>
            <Spacer height={sizes.baseMargin} />
            <ComponentWrapper>
              <TinyTitle>Select any available time slot</TinyTitle>
            </ComponentWrapper>

            <Spacer height={sizes.baseMargin} />
            <this.renderTimeSlots />
            <Spacer height={sizes.baseMargin} />
            <ButtonColored
              text="Continue"
              onPress={async () => {
                if (
                  this.state.selectedTimeSlotIndex !== null &&
                  isDateSelected
                ) {
                  await AsyncStorage.getItem('Token').then(async token => {
                    if (token) {
                      let UserData = await getData('Users', token);
                      if (
                        UserData.CardList !== undefined &&
                        UserData.CardList.length
                      ) {
                        let obj = item;
                        obj.date = moment(this.state._SelectedDate).format(
                          'YYYY-MM-DD',
                        );

                        obj.timeSlot =
                          this.state.availableTimeSlots[
                            this.state.selectedTimeSlotIndex
                          ].startTime +
                          ' - ' +
                          this.state.availableTimeSlots[
                            this.state.selectedTimeSlotIndex
                          ].endTime;
                        console.log(obj);
                        navigate(routes.provider.confirmation, {item: obj});
                      } else {
                        console.log(
                          'Add time: ',
                          moment(
                            this.state.availableTimeSlots[
                              this.state.selectedTimeSlotIndex
                            ].startTime,
                          ).add(
                            this.state.availableTimeSlots[
                              this.state.selectedTimeSlotIndex
                            ].endTime,
                          ),
                        );
                        navigate(routes.provider.payment);
                        Toast.show(
                          'Please add payment method first to book service',
                          Toast.SHORT,
                        );
                      }
                    }
                  });
                } else {
                  Toast.show('Select Date and Time Slot first', Toast.SHORT);
                }
              }}
              // onPress={()=>navigate(routes.provider.confirmation)}
            />
            <Spacer height={sizes.doubleBaseMargin} />
          </Wrapper>
        ) : null}
        <SafeAreaView />
      </MainWrapper>
    );
  }
}

export default SelectDate;

const styles = StyleSheet.create({
  availableTimeSlots: {
    borderRadius: 50,
    height: height(6),
    elevation: 0,
    shadowColor: 'transparent',
    marginVertical: height(1),
  },
});
