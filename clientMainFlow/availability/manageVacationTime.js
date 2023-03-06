import React, {useEffect, useState} from 'react';
import {View, StatusBar,Switch, TouchableOpacity} from 'react-native';
import {
  MainWrapperMatrial,
  SmallText,
  ModalColored,
  SmallTitle,
  ButtonColored,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, fontFamily} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';
import { Calendar } from 'react-native-calendars';

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

const DATA = [{id: 1, day: "Vacation Mode", status: false}];

const ManageVacationTime = (props) => {
    const [calendarModalStatus, setCalendarModalStatus] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [breakData, setBreakData] = useState([]);
    const [LeaveDates, setLeaveDates] = useState([]);

    useEffect(() => {
        console.log("breakData =====> ", breakData);
    }, [breakData]);
    const toggleSwitch = (index) => {
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

    return (
        <MainWrapperMatrial style={{backgroundColor:"#FFF"}}>
            <StatusBar backgroundColor={"#FFF"} barStyle={'dark-content'} />
            <View style={{flex:1,backgroundColor:"#FFF",borderTopLeftRadius:45,borderTopRightRadius:45}}>
                <View style={{
                    flexDirection:'row',
                    backgroundColor:colors.appColor1,
                    paddingVertical:height(2),
                    paddingHorizontal:width(8),
                    borderTopLeftRadius:45,
                    borderTopRightRadius:45,
                }}>
                    <TouchableOpacity 
                        onPress={() => props.navigation.goBack()}
                        style={{justifyContent:'center'}}>
                        <FontAwesome
                            name='angle-left'
                            size={totalSize(3)}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                    <View style={{flex:1,justifyContent:'center',marginLeft:width(8)}}>
                        <SmallTitle style={{color:"#FFF"}}>Manage Vacation Time</SmallTitle>
                    </View>
                </View>
                <KeyboardAwareScrollView style={{marginTop:height(2)}} showsVerticalScrollIndicator={false}>
                    {DATA.map((val, key) => {
                        return (
                            <>
                                <View 
                                    key={key} 
                                    style={{
                                        flexDirection:'row',
                                        borderColor:"#E9E9E9",
                                        borderTopWidth:key===0?1:0,
                                        borderBottomWidth:1,    
                                        paddingHorizontal:width(6),
                                        paddingVertical:height(2)
                                    }}
                                >
                                    <View style={{flex:1,justifyContent:'center'}}>
                                        <SmallTitle>{val.day}</SmallTitle>
                                    </View>
                                    <View style={{justifyContent:'center'}}>
                                        <Switch
                                            trackColor={{ false: "#E9E9E9", true: "#E9E9E9" }}
                                            thumbColor={val.status ? "#B5B5B5" : "#B5B5B5"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => toggleSwitch(key)}
                                            value={val.status}
                                        />
                                    </View>
                                </View>
                                {val.status &&
                                    <>
                                        <View 
                                            style={{
                                                flex:1,
                                                justifyContent:'center',
                                                borderColor:"#E9E9E9",
                                                borderTopWidth:0,
                                                borderBottomWidth:1,    
                                                paddingHorizontal:width(6),
                                                paddingVertical:height(2)
                                            }}>
                                            <View style={{flexDirection:'row'}}>
                                                <View style={{flex:1,justifyContent:'center'}}>
                                                    <SmallText style={{fontWeight:"bold"}}>STARTS ON</SmallText>
                                                </View>
                                                <View style={{flex:1,justifyContent:'center'}}>
                                                    <ButtonColored 
                                                        onPress={calendarToggleModal}
                                                        text={"01/15/2022"}
                                                        textStyle={{fontSize:totalSize(1.5)}}
                                                        buttonStyle={{marginHorizontal:0,borderRadius:10,height:height(5)}}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        <View 
                                            style={{
                                                flex:1,
                                                justifyContent:'center',
                                                borderColor:"#E9E9E9",
                                                borderTopWidth:0,
                                                borderBottomWidth:1,    
                                                paddingHorizontal:width(6),
                                                paddingVertical:height(2)
                                            }}>
                                            <View style={{flexDirection:'row'}}>
                                                <View style={{flex:1,justifyContent:'center'}}>
                                                    <SmallText style={{fontWeight:"bold"}}>ENDS ON</SmallText>
                                                </View>
                                                <View style={{flex:1,justifyContent:'center'}}>
                                                    <ButtonColored 
                                                        onPress={calendarToggleModal}
                                                        text={"01/22/2022"}
                                                        textStyle={{fontSize:totalSize(1.5)}}
                                                        buttonStyle={{marginHorizontal:0,borderRadius:10,height:height(5)}}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                }
                            </>
                        )
                    })}
                </KeyboardAwareScrollView>
            </View>
            <ModalColored 
                isVisible={calendarModalStatus}
                toggleModal={calendarToggleModal}
                modalHeight={4}
                containerstyle={{backgroundColor:"#FFF"}}
                content={
                    <View style={{paddingHorizontal:width(4)}}>
                        <Calendar
                            markingType={'custom'}
                            current={new Date()}
                            minDate={new Date()}
                            markedDates={LeaveDates}
                            onDayPress={day => {
                                console.log("DAY =====> ", day);
                            }}
                            theme={CalendarTheme}
                        />
                        <ButtonColored
                            text="Set"
                            onPress={calendarToggleModal}
                            buttonStyle={{marginTop:height(4)}}
                        />
                    </View>
                }
            />
        </MainWrapperMatrial>
    )
}

export default ManageVacationTime;

