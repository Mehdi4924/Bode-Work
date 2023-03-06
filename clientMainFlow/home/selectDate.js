import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, ScrollView ,ActivityIndicator} from 'react-native';
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
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { colors, fontFamily, sizes, ToastMessage } from '../../../themes';
import { totalSize, height } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { routes } from '../../../services';
import { getData } from '../../../backend/firebase/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { SafeAreaView } from 'react-native';
import Header from '../../../components/header/header';
import Calender from '../../../components/Calender/Calender';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { updateBooking,getAvailableData } from '../../../services/backend/client';
const data = [{ id: 1, startTime: "12:00 pm", endTime: "02:00pm" },
{ id: 2, startTime: "12:00 pm", endTime: "02:00pm" },]
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

const SelectDate = (props) => {
    const param = props.route.params
    console.log("ye aaya param SelectDate", JSON.stringify(param,null,2));
    const { userDetail } = useSelector(state => state.user);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState(null);
    const [LeaveDates, setLeaveDates] = useState([]);
    const [loader, setLoader] = useState(false);
    const [checked,setchecked]=useState(false);
    const [slecteditem,setslecteditem]=useState("")
    const [availableslot,setavailableslot]=useState("")
    // console.log(">>>>>>>>>>",availableslot);
    const [selectedDate, setSelectedDate] = useState();
    const [date1, setdate] = useState('');
    const [availableTimeSlots, setAvailableTimeSlots] = useState([
        { id: 1, startTime: "12:00 pm", endTime: "02:00pm" },
        { id: 2, startTime: "12:00 pm", endTime: "02:00pm" },
    ]);
    const getavialableslot = async(date2) => {

        console.log("dddddddd",date2);
        try {
          const data = {
            // service_id: param?.data?.sericeid,
            service_id: param?.data?.data?.sericeid,
            // user_id: "1",
            stylist_id: param?.data?.stylistid,
            date: date2
          };
          console.log("fomdata",data);
         await getAvailableData(data).then((response) => {
            console.log("getAvailableData 3333 =====> ", JSON.stringify(response, null, 2));
            if (response?.success==true) {
                let a = Object.assign([{}],response?.data);
          console.log('aaa', a);
              setavailableslot(a);
            } else if(response?.message=="Availability not found" ){
                setavailableslot("");
                ToastMessage("Availability not found");
              console.log("error in getAvailableData");
            }
          })
        } catch (error) {
        //   ToastMessage(error.message);
        }
      }; 
    const makeBooking = () => {
        setLoader(true);
        // const formdata = new FormData();
        // formdata.append('user_id', userDetail?.id,);
        // formdata.append('stylist_id',"81");
        // formdata.append('service_id', "36");
        // formdata.append('latitude',"108.987156");
        // formdata.append('longitude',"74.12769");
        // formdata.append('style_size',"small");
        // formdata.append('date',"2022-05-02");
        // formdata.append('timeslot',"10:05 AM" );
        // formdata.append('price',"40" );
        // formdata.append("address","Lahore Pakistan")
        const data ={
            'user_id': userDetail?.id,
            // 'user_id': "7",
            'stylist_id':param?.data?.stylistid,
            // 'service_id': param?.data?.sericeid,
            'service_id': "9",
            'latitude':"108.987156",
            'longitude':"74.12769",
            'style_size':"small",
            'date':date1,
            'timeslot':slecteditem!=""?slecteditem:'10:00AM-11:00AM',
            'price':"60",
            "address":"Lahore Pakistan"
        }
        console.log('form data select screen', data);
        updateBooking(data).then(response => {
            console.log('makeBooking response11111 =====> ', response);
          if (response?.success) {
            console.log('makeBooking response =====> ', response);
            props.navigation.navigate(routes.client.confirmation,{stlistid:param,AselectDate:date1,Aslot:slecteditem})
            setLoader(false);
            // setDataSource(response?.data);
          }else{
            ToastMessage(response?.message)
            setLoader(false);
          }
        });
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
            <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
            <Header
                goBack={() => props.navigation.goBack()}
                heading={"Select Date"}
                color={colors.appColor1}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
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
                    <Calender onDatePress={(date)=> {
                    setdate(date?.dateString);
                    getavialableslot(date?.dateString)
                    // console.log('datre in params',date)
                }
                }
                    // selectedDate={selectedDate}
                    />
                </ComponentWrapper>
                {/* {isDateSelected ? ( */}
                <Wrapper flex={1} marginVertical={height(5)}>
                    <Spacer height={sizes.baseMargin} />
                    <Spacer height={sizes.baseMargin} />
                    <ComponentWrapper>
                        <TinyTitle>Select any available time slot</TinyTitle>
                    </ComponentWrapper>
                    <Spacer height={sizes.baseMargin} />
                    {availableslot!=""?
                    <RenderTimeSlots />
                    :null}
                </Wrapper>
                {/* ) : null} */}
            </ScrollView>
            {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
            <ButtonColored
                text="Continue"
                onPress={()=>
                    availableslot!=""&&
                    availableslot!=null
                   ? makeBooking()
                   :ToastMessage("please select timeslot")
                }
                // onPress={() => props.navigation.navigate(routes.client.confirmation)}
                buttonStyle={{ marginBottom: height(2) }}
            />
        )}
        </MainWrapper>
    );
}

export default SelectDate;

const styles = StyleSheet.create({
    availableTimeSlots: {
        borderRadius: 20,
        height: height(6),
        elevation: 0,
        shadowColor: 'transparent',
        marginVertical: height(1),
    },
});
