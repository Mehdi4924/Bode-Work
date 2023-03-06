import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
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
import {colors, fontFamily, sizes, ToastMessage} from '../../../themes';
import {totalSize, height} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import {routes} from '../../../services';
import {getData} from '../../../backend/firebase/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {SafeAreaView} from 'react-native';
import Header from '../../../components/header/header';
import Calender from '../../../components/Calender/Calender';
import { useSelector } from 'react-redux';
import {showTimeSlot} from '../../../services/backend/user';
import { updateBooking,getAvailableData } from '../../../services/backend/client';
const data = [
  {id: 1, startTime: '08:00 am', endTime: '09:00 am'},
  {id: 2, startTime: '09:00 am', endTime: '10:00 am'},
  {id: 3, startTime: '10:00 am', endTime: '11:00 am'},
  {id: 4, startTime: '11:00 am', endTime: '12:00 pm'},
  {id: 5, startTime: '12:00 pm', endTime: '13:00 pm'},
  {id: 6, startTime: '13:00 pm', endTime: '14:00 pm'},
];
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

const SelectDate = props => {
  const param = props.route.params.details;
  console.log('ye aya param', param);
  const {userDetail} = useSelector(state => state.user);
  console.log("userDetails on select detyails screen",userDetail);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState(null);
  const [LeaveDates, setLeaveDates] = useState([]);
  const [checked, setchecked] = useState(false);
  const [slecteditem, setslecteditem] = useState('');
  const [DataSource, setDataSource] = useState('');
  const [date, setdate] = useState('');
  const [slot, setSlot] = useState('');
  const [loader, setLoader] = useState(false);
  const [availableslot,setavailableslot]=useState([])
  console.log('availableslot value', availableslot);
  console.log('yyyyyy', slecteditem);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([
    {id: 1, startTime: '12:00 pm', endTime: '02:00pm'},
    {id: 2, startTime: '02:00 pm', endTime: '06:00pm'},
  ]);
  const getavialableslot = async(date) => {
    try {
      const data = {
        service_id: param?.serviceid,
        // user_id: "1",
        stylist_id:userDetail?.id,
        date: date
      };
      console.log("form data on slect date screen",data);
     await getAvailableData(data).then((response) => {
        console.log("getAvailableData 3333 =====> ", JSON.stringify(response, null, 2));
        if (response?.success==true) {
            let a = Object.assign([{}],response?.data);
      console.log('aaa', a);
          setavailableslot(a);
        } else {
            // setavailableslot([]);
            ToastMessage("Availability not found");
          console.log("error in getAvailableData");
        }
      })
    } catch (error) {
      ToastMessage(error.message);
    }
  }; 
  const RenderTimeSlots = () => {
    return (
      <Wrapper>
        <FlatList
               data={availableslot}
               renderItem={({ item, index,value }) => {
                   return (
                       <Wrapper>
                           <>
                           {item === slecteditem?(
                               <ButtonColored
                                   text={item}
                                   onPress={() => {
                                       // setchecked(!checked)  
                                       console.log("pressde",item);
                                      }}
                                   buttonStyle={styles.availableTimeSlots}
                               />
                           ) : (
                               <ButtonBordered
                                   text={item}
                                   onPress={() => {
                                   //  setchecked(!checked)  
                                   console.log("pressde",item);
                                   setslecteditem(item)
                                   }}
                                   buttonStyle={styles.availableTimeSlots}
                               />
                           )}
                           </>
                       </Wrapper>
                   );
               }}
           />
      </Wrapper>
    );
  };

  return (
    <MainWrapper>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <Header
        goBack={() => props.navigation.goBack()}
        heading={'Select Date'}
        color={colors.appColor1}
      />
      <ScrollView>
        <ComponentWrapper>
          <TinyTitle>Select any available date</TinyTitle>
        </ComponentWrapper>
        <Spacer height={sizes.baseMargin} />
        <ComponentWrapper
          style={{
            backgroundColor: colors.appBgColor2,
            borderRadius: sizes.wrapperRadius,
          }}>
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
          <Calender
            onDatePress={date => {
              setdate(date.dateString);
              getavialableslot(date?.dateString)
              console.log('datre in params', date);
            }}
          />
        </ComponentWrapper>
        {/* {isDateSelected ? ( */}
        <Wrapper flex={1} marginVertical={height(18)}>
          <Spacer height={sizes.baseMargin} />
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <TinyTitle>Select any available time slot</TinyTitle>
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin} />
          {availableslot != '' ? <RenderTimeSlots /> : null}
        </Wrapper>
        {/* ) : null} */}
      </ScrollView>
      <ButtonColored
        text="Continue"
        onPress={() =>
          slecteditem != '' && slecteditem != null
            ? props.navigation.navigate(routes.provider.charges, {
                details: {servicedetails: param, slot: slecteditem, date: date},
              })
            : ToastMessage('please select time slot')
        }
        buttonStyle={{marginBottom: height(3)}}
      />
    </MainWrapper>
  );
};

export default SelectDate;

const styles = StyleSheet.create({
  availableTimeSlots: {
    borderRadius: 17,
    height: height(6),
    elevation: 0,
    shadowColor: 'transparent',
    marginVertical: height(1),
  },
});
