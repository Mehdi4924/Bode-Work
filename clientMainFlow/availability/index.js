import React, {useState} from 'react';
import {View, Text, FlatList, StatusBar, ScrollView, Image} from 'react-native';
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
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors, appStyles, sizes, appImages, appIcons, fontFamily} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';
import MianHeader from '../../../components/header/mainHeader';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { routes } from '../../../services';

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

const Availability = (props) => {
    const DATA = [1, 2, 3, 4, 5];
    const [LeaveDates, setLeaveDates] = useState([]);
    const [AvailabilityModalStatus, setAvailabilityModalStatus] = useState(false);
    
    const availivilityToggleModal = () => {
        setAvailabilityModalStatus(!AvailabilityModalStatus);
    };

    return (
        <MainWrapperMatrial>
            <StatusBar backgroundColor={colors.appColor1} />
            <MianHeader heading={"Availability"} />
            <KeyboardAwareScrollView 
                style={{marginTop:height(3)}} 
                showsVerticalScrollIndicator={false}>
                <Wrapper animation="fadeInDown">
                    <ComponentWrapper
                        style={{
                            backgroundColor: colors.appBgColor2,
                            borderRadius: sizes.wrapperRadius,
                        }}>
                        <Calendar
                            theme={CalendarTheme}
                            markingType={'custom'}
                            current={new Date()}
                            minDate={new Date()}
                            markedDates={LeaveDates}
                            onDayPress={day => {
                                console.log("DAY =====> ", day);
                                props.navigation.navigate(routes.provider.charges)
                            }}
                        />
                    </ComponentWrapper>
                    <View style={{marginHorizontal:width(5),marginTop:height(3)}}>
                        <MediumTitle>June 2021</MediumTitle>
                    </View>
                </Wrapper>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {DATA.map((val, key) => {
                        return (
                            <Wrapper
                                key={key}
                                animation="fadeInDown" 
                                style={{
                                    backgroundColor:"#FFF",
                                    marginTop: totalSize(1),
                                    marginLeft: key === 0 ? width(5) : 0,
                                    marginRight: width(5),
                                    marginBottom: totalSize(3),
                                    borderRadius: 20,
                                    padding: totalSize(2),
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.37,
                                    shadowRadius: 7.49,
                                    elevation: 12,
                                }}>
                                <View style={{flexDirection:'row',borderBottomColor:"#00000029",borderBottomWidth:1,paddingBottom:totalSize(1)}}>
                                    <View>
                                        <Image 
                                            source={appImages.imageOne} 
                                            style={{height:totalSize(8),width:totalSize(8),resizeMode:'cover',borderRadius:100}}  
                                        />
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',marginLeft:totalSize(1)}}>
                                        <SmallTitle style={{color:"#000"}}>Jane Doe</SmallTitle>
                                        <Text>
                                            <Ionicons 
                                                name='star'
                                                size={totalSize(1.5)}
                                                color="#C9A858"
                                            />
                                            <SmallText style={{color:"#000000"}}> (4.9)</SmallText>
                                        </Text>
                                    </View>
                                    <View style={{justifyContent:'flex-start',marginLeft:totalSize(3)}}>
                                        <ButtonColored 
                                            text="Hair Cut"
                                            buttonStyle={{marginHorizontal:0,paddingHorizontal:width(5),borderRadius:100,height: height(5)}}
                                            // onPress={() => }
                                        />
                                        <MediumTitle style={{color:"#000000",marginTop:height(2),textAlign:"right"}}>$40</MediumTitle>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Time Slot</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>12:00 pm - 02:00 pm</MediumText>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Date</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>29th July, 2020</MediumText>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Location</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>17 Johnson Ave, NYC</MediumText>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Distance</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>6 miles away</MediumText>
                                    </View>
                                </View>
                            </Wrapper>
                        )
                    })}
                </ScrollView>
                <ButtonColored 
                    text="Update Availability"
                    buttonStyle={{marginTop:height(2),marginBottom:width(6),paddingHorizontal:width(5),borderRadius:10}}
                    onPress={availivilityToggleModal}
                />
            </KeyboardAwareScrollView>
            <ModalColored 
                isVisible={AvailabilityModalStatus}
                toggleModal={availivilityToggleModal}
                modalHeight={7}
                containerstyle={{backgroundColor:"#FFF"}}
                content={
                    <View>
                        <MediumTitle style={{textAlign:"center"}}>Update Availability</MediumTitle>
                        <MediumText style={{color:"#CECECE",paddingVertical:height(2),textAlign:"center",paddingHorizontal:width(4)}}>
                            Need to update your weekly Availability?
                        </MediumText>
                        <ButtonWithTextArrow 
                            text="Manage Ongoing Availability"
                            tintColor={"#FFF"}
                            onPress={() => {
                                availivilityToggleModal();
                                props.navigation.navigate(routes.provider.manageOngoingAvailability)
                            }}
                            textStyle={{color:"#FFF",textAlign:"center",textTransform:"uppercase"}}
                            buttonStyle={{backgroundColor:colors.appColor1,paddingLeft:width(2),borderRadius:10,paddingVertical:height(1.5)}}
                        />
                        <MediumText style={{color:"#CECECE",paddingVertical:height(2),textAlign:"center",paddingHorizontal:width(4)}}>
                            Taking break block off some time on your calendar.
                        </MediumText>
                        <ButtonWithTextArrow 
                            text="Manage Vacation Time"
                            tintColor={"#FFF"}
                            onPress={() => {
                                availivilityToggleModal();
                                props.navigation.navigate(routes.provider.manageVacationTime)
                            }}
                            textStyle={{color:"#FFF",textAlign:"center",textTransform:"uppercase"}}
                            buttonStyle={{backgroundColor:colors.appColor1,paddingLeft:width(2),borderRadius:10,paddingVertical:height(1.5)}}
                        />
                        <MediumText style={{color:"#CECECE",paddingVertical:height(2),textAlign:"center",paddingHorizontal:width(4)}}>
                            Need to make a one-time adjustment to your upcoming Availability?
                        </MediumText>
                        <ButtonWithTextArrow 
                            text="Adjust Coming Hour"
                            tintColor={"#FFF"}
                            onPress={() => {
                                availivilityToggleModal();
                                props.navigation.navigate(routes.provider.adjustComingHour)
                            }}
                            textStyle={{color:"#FFF",textAlign:"center",textTransform:"uppercase"}}
                            buttonStyle={{backgroundColor:colors.appColor1,paddingLeft:width(2),borderRadius:10,paddingVertical:height(1.5)}}
                        />
                    </View>
                }
            />
        </MainWrapperMatrial> 
    );
}

export default Availability;
