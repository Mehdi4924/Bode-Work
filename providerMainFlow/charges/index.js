import React, {useState} from 'react';
import {View, Text, StatusBar, Image, TouchableOpacity,StyleSheet} from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  SmallText,
  ModalColored,
  SmallTitle,
  MediumTitle,
  ButtonColored,
  MediumText,
  AbsoluteWrapper,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, appImages, fontFamily, ToastMessage} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';
import {routes} from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { makeReservation } from '../../../services/backend/user';
import { setUserDetail ,} from '../../../services/stores/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from "@react-native-community/blur";
const DATA = [1];
const monthDays = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const Charges = props => {
  const param =props.route.params.details
  console.log(" param on charges screen",JSON.stringify(param,null,2));
  const dispatch = useDispatch();
  const {userDetail} = useSelector(state => state.user);
console.log("userDetails on charges screen",userDetail);
  const [invitationModalStatus, setInvitationModalStatus] = useState(false);

  const invitationToggleModal = () => {
    setInvitationModalStatus(!invitationModalStatus);
  };
  const ReservationMake = () => {
    // const formdata = new FormData();
    // formdata.append('user_id', userDetail?.id,);
    // formdata.append('first_name', name);
    // formdata.append('last_name', "name");
    // formdata.append('email',email);
    // formdata.append('phone',phone);
    // formdata.append('zip_code',zipcode);
    // formdata.append('country',country );
    // formdata.append('about',"about description" );
    // formdata.append('user_id', '97');
    // formdata.append('stylist_id', '81');
    // formdata.append('service_id', '36');
    // formdata.append('date', '2022-05-02');
    // formdata.append('time', '12:00PM');
    // formdata.append('price', '34');
    const data ={
      // 'user_id': userDetail?.id,
      'user_id':param?.servicedetails?.clientdetails?.id,
      // 'user_id':"3",
      'stylist_id': userDetail?.id,
      // 'stylist_id': "5",
      'service_id': param?.servicedetails?.serviceid,
      // 'service_id': "10",
      'date': param?.date,
      // 'date':"2022-12-20",
      'timeslot': param?.slot,
      'price': param?.servicedetails?.price,
      "latitude":"73.0987654",
      "longitude":"-109.098765612",
      "address":"Lahore, pakistan",
      "travel_charges":userDetail?.travel_charges!=null?userDetail?.travel_charges:"60",
      "time":param?.servicedetails?.basetime
      
    }
    console.log('form data ', data);
    makeReservation(data).then(response => {
      if (response?.success==true) {
        // console.log('maked reservation =====> ', response.data);
        setInvitationModalStatus(true)
        // setDataSource(response?.data);
      }else{
        ToastMessage('error')
      }
    });
  };
  // function ordinal_suffix_of(i) {
  //   var j = i % 10,
  //     k = i % 100;
  //   if (j == 1 && k != 11) {
  //     return i + "st";
  //   }
  //   if (j == 2 && k != 12) {
  //     return i + "nd";
  //   }
  //   if (j == 3 && k != 13) {
  //     return i + "rd";
  //   }
  //   return i + "th";
  // }
  // const d = new Date(param?.date)
  // const a = monthDays[d.getUTCMonth()]
  // const c = ordinal_suffix_of(d.getDate())
  return (
    <MainWrapperMatrial style={{backgroundColor: '#FFF', borderTopLeftRadius: 30,
    borderTopRightRadius: 30,}}>
       {/* {!invitationModalStatus?
      <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={100}
          reducedTransparencyFallbackColor="white"
        />:null} */}
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.appColor1,
            paddingVertical: height(2),
            paddingHorizontal: width(8),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{justifyContent: 'center'}}>
            <Ionicons name="chevron-back" size={totalSize(3)} color="#fff" />
          </TouchableOpacity>
          <View
            style={{flex: 1, justifyContent: 'center', marginLeft: width(8)}}>
            <SmallTitle style={{color: '#FFF'}}>{param?.date}</SmallTitle>
          </View>
        </View>
        <KeyboardAwareScrollView
          style={{marginTop: height(2)}}
          showsVerticalScrollIndicator={false}>
          {DATA.map((val, key) => {
            return (
              <Wrapper
                key={key}
                // animation="fadeInDown"
                style={{
                  backgroundColor: '#FFF',
                  marginHorizontal: totalSize(2.5),
                  marginBottom: totalSize(3),
                  borderRadius: 20,
                  padding: totalSize(2),
                  shadowColor: colors.appColor1,
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
                    borderBottomColor: colors.appColor1,
                    borderBottomWidth: 2,
                    paddingBottom: totalSize(1),
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Image
                      source={{uri:param?.servicedetails?.clientdetails?.image&&param?.servicedetails?.clientdetails?.image?param?.servicedetails?.clientdetails?.image:appImages.barber1}}
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
                    <SmallTitle
                      style={{
                        color: '#000',
                        fontFamily: fontFamily.gothicBold,
                        marginBottom: height(1),
                      }}>
                      {param?.servicedetails?.clientdetails?.firstname&&param?.servicedetails?.clientdetails?.firstname?param?.servicedetails?.clientdetails?.firstname:'N/A'}
                    </SmallTitle>
                    <Text>
                      <SmallText style={{color: '#000000'}}>4.9 </SmallText>
                      <Ionicons
                        name="star"
                        size={totalSize(1.5)}
                        color="#C9A858"
                      />
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: 15,
                      fontFamily: fontFamily.gothicBold,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.black,
                      marginVertical: totalSize(1.2),
                    }}>
                    ABOUT ME
                  </Text>
                </View>
                <View style={{paddingHorizontal: width(3),height:height(10)}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      fontFamily: fontFamily.gothicRegular,
                      lineHeight: height(3),
                      color: 'grey',
                    }}>
                    {/* We like the sleek design and beautiful photos that complete
                    it. You find it fascinating too? Here is proof thatsimple
                    sites work... */}
                    {param?.servicedetails?.clientdetails?.about&&param?.servicedetails?.clientdetails?.about?param?.servicedetails?.clientdetails?.about:'N/A'}
                  </Text>
                </View>
                {/* <View style={{flexDirection:'row',borderBottomColor:"#00000029",borderBottomWidth:1,paddingBottom:totalSize(1)}}>
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
                                </View> */}
              </Wrapper>
            );
          })}
        </KeyboardAwareScrollView>
        <AbsoluteWrapper
          style={{bottom: width(6), left: width(6), right: width(6)}}>
          <ButtonColored
            text="Done"
            buttonStyle={{
              marginHorizontal: 0,
              paddingHorizontal: width(5),
              borderRadius: 10,
            }}
            onPress={ ()=>ReservationMake()}
          />
        </AbsoluteWrapper>
      </View>
      <ModalColored
        style={{backgroundColor: 'rgba(255,255,255,0.8)'}}
        isVisible={invitationModalStatus}
        toggleModal={invitationToggleModal}
        containerstyle={{backgroundColor: '#FFF'}}
        modalHeight={14}
        content={
          <View>
            <Ionicons
              name="checkmark-circle"
              size={totalSize(10)}
              color={colors.appColor1}
              style={{alignSelf: 'center', marginBottom: height(3)}}
            />
            <MediumTitle style={{textAlign: 'center', color: colors.appColor1}}>
              Reservation Invitation Sent
            </MediumTitle>
            <ButtonColored
              text="Done"
              buttonStyle={{
                paddingHorizontal: width(5),
                borderRadius: 10,
                marginTop: height(4),
              }}
              onPress={() => {
               
                invitationToggleModal();
                props.navigation.navigate(routes.provider.home);
              }}
            />
          </View>
        }
      />
    </MainWrapperMatrial>
  );
};

export default Charges;
const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})