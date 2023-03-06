import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  MainWrapper,
  Spacer,
  ComponentWrapper,
  LineHorizontal,
  RowWrapperBasic,
  SmallTitle,
  RegularText,
  ButtonColoredSmall,
  ButtonColored,
  AbsoluteWrapper,
  TextInputBordered,
  KeyboardAvoidingScrollView,
  Wrapper,
  TinyTitle,
  SmallText,
} from '../../../components';
import {
  sizes,
  colors,
  fontFamily,
  ToastMessage,
  appIcons,
} from '../../../themes';
import {height, totalSize, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import Header from '../../../components/header/header';
import Feather from 'react-native-vector-icons/Feather';
import {routes} from '../../../services';
import VDropDown from '../../../components/VDropDown';
import {signUp} from '../../../services/backend/user';
import {useDispatch, useSelector} from 'react-redux';
import {setUserDetail} from '../../../services/stores/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import Geocoder from 'react-native-geocoder';
import {mapKey} from '../../../services/constants';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
// const{navigate} = props.navigation;
// data=[{id :1,}]
const StylistProfileDetail = props => {
  const param = props.route.params;
  console.log('ye param', param);
  const dispatch = useDispatch();
  const {latitude, longitude, address} = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const {userDetail} = useSelector(state => state.user);
  const [travel, settravel] = useState('');
  const [about, setabout] = useState('');
  const [birthday, setbirthday] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date());
  console.log('selected date', moment(date).format('YYYY-MM-DD'));
  const [open, setOpen] = useState(false);
  console.log('>>>>>', gender);
  const [addresss, setaddresss] = useState(address);
  //    useFocusEffect(
  //   React.useCallback(() => {
  //       getOneTimeLocation()
  //       getLocationName()

  //   }, [])
  // );
  useEffect(() => {
    getOneTimeLocation();
    getLocationName();
  }, []);
  useEffect(() => {
    getLocationName(parseFloat(latitude), parseFloat(longitude));
    console.log('address=====> ', address);
  }, [latitude, longitude, address]);
  const signUpHandle = async () => {
    const {navigate, replace} = props.navigation;
    try {
      const userType = await AsyncStorage.getItem('type');

      setLoader(true);
      const data = {
        first_name: param?.firstname,
        email: param?.email,
        password: param?.password,
        password_confirmation: param?.cpassword,
        user_type: userType,
        last_name: param?.lastname,
        date_of_birth: moment(date).format('YYYY-MM-DD'),
        phone_number: '0123456789',
        location: address,
        about: about,
        gender: gender,
        title: 'provider',
        travel_charges: travel,
        latitude: '',
        longitude: '',
      };
      console.log('form data', data);
      signUp(data).then(response => {
        console.log('RESPONSEw =====> ', response?.data);
        if (response?.success) {
          console.log('success ho gya');
          AsyncStorage.setItem('token', '1');
          AsyncStorage.setItem('userData', JSON.stringify(response?.data));
          dispatch(setUserDetail(response?.data));
          setLoader(false);
          if (userType === 'user') {
            replace(routes.clientApp);
          } else {
            // replace(routes.providerApp);
            navigate(routes.identityproof);
          }
        } else {
          ToastMessage('The email has already been taken');
          setLoader(false);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const getOneTimeLocation = () => {
    console.log('ye chala onetime location');
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Latitude from the location json
        const lat = position.coords.latitude;

        //getting the Longitude from the location json
        const lng = position.coords.longitude;

        // console.log("latitude =====> ", lat);
        AsyncStorage.setItem('currentLatitude', JSON.stringify(lat));

        // console.log("longitude =====> ", lng);
        AsyncStorage.setItem('currentLongitude', JSON.stringify(lng));

        getLocationName(parseFloat(lat), parseFloat(lng));
      },
      error => {},
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  const getLocationName = async (lat, lng) => {
    console.log('ye getname call howa');
    try {
      await Geocoder.fallbackToGoogle(mapKey);
      let response = await Geocoder.geocodePosition({lat, lng});
      let location = response[0].formattedAddress;

      const data = {
        latitude: lat,
        longitude: lng,
        address: location,
      };
      console.log('location =====> ', data);
      setaddresss(data.address);
      dispatch(setUserCordinates(data));
      // setaddresss(data.address)
    } catch (error) {
      // ToastMessage(error.message);
    }
  };
  return (
    <MainWrapper>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Header
        goBack={() => props.navigation.goBack()}
        heading={'Stylist Profile Details'}
        color={colors.appColor1}
      />
      <KeyboardAvoidingScrollView>
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <View style={{paddingHorizontal: width(5)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{
                  color: colors.appColor1,
                  fontFamily: fontFamily.appTextRegular,
                  fontSize: totalSize(1.4),
                  marginLeft: width(3),
                  marginVertical: height(0.5),
                }}>
                Birthday
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.appColor1,
                  borderRadius: 15,
                  height: height(6.7),
                  width: width(42),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: width(2),
                }}>
                <TextInput
                  placeholder="04/03/99"
                  placeholderTextColor={'grey'}
                  style={{
                    color: 'black',
                    fontFamily: fontFamily.appTextMedium,
                    fontSize: totalSize(1.7),
                  }}
                  value={moment(date).format('DD/MM/YYYY')}
                  onChangeText={val => {
                    setbirthday(val);
                  }}
                />
               <TouchableOpacity onPress={() => setOpen(true)} >
               <Image
                  source={appIcons.birthday}
                  resizeMode="cover"
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
               </TouchableOpacity>
              </View>
            </View>

            <VDropDown
              inputContainer={[
                styles.back2,
                {
                  justifyContent: 'space-between',
                },
              ]}
              // options={
              //   items.length > 0
              //     ? items.map((item) => item.description)
              //     : ["loading..."]
              // }
              title={'Gender'}
              options={['Male', 'Female']}
              defaultValue={'Select gender'}
              defaultTextStyle={{
                color: colors.lightgrey,
                fontSize: totalSize(1.5),
                fontFamily: fontFamily.appTextRegular,
              }}
              dropdownTextStyle={{
                color: 'black',
                width: width(40),
                textAlign: 'center',
                height: height(3),
                fontFamily: fontFamily.appTextRegular,
              }}
              dropDownContainer={styles.dropDownContainer}
              dropModal={styles.dropModal2}
              rightIconName={'down'}
              onSelect={(index, value) => {
                setGender(value);
              }}
            />
          </View>

          {/* <VDropDown
                    inputContainer={[
                        styles.back,
                        {
                            justifyContent: "space-between",
                        },
                    ]}
                    // options={
                    //   items.length > 0
                    //     ? items.map((item) => item.description)
                    //     : ["loading..."]
                    // }
                    title={"Location"}
                    options={["Lahore,Pakistan", "Sialkot,Pakistan", "Daska,Pakistan"]}
                    defaultValue={"Select location"}
                    defaultTextStyle={{ color: colors.lightgrey, fontSize: totalSize(1.5), fontFamily: fontFamily.appTextRegular }}
                    dropdownTextStyle={{ color: "black", width: width(80), textAlign: 'center', height: height(3) }}
                    dropDownContainer={styles.dropDownContainer}
                    dropModal={styles.dropModal}
                    rightIconName={"down"}
                    onSelect={(index, value) => {
                        //   setSelectedBloodFor(items[index]);
                    }}

                /> */}
        </View>
        {/* <Spacer height={sizes.baseMargin} /> */}
        {/* <TextInputBordered
                title="Location"
                titleStyle={{ color: colors.appColor1, fontFamily: fontFamily.appTextRegular, fontSize: totalSize(1.4) }}
                placeholder={"Select location"}
                value={addresss}
                onChangeText={val => {
                    setaddresss(val);
                }}
            /> */}
        <Wrapper
          // animation="fadeInDown"
          style={{
            backgroundColor: colors.snow,
            // elevation: 2,
            paddingBottom: totalSize(2),
            paddingTop: totalSize(1),
          }}>
          <TinyTitle
            style={{
              color: colors.appColor1,
              marginHorizontal: width(8),
              marginBottom: 2,
              fontSize: totalSize(1.5),
              fontFamily: fontFamily.appTextMedium,
            }}>
            Location
          </TinyTitle>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: width(5),
              borderColor: colors.appColor1,
              borderWidth: 1,
              borderRadius: sizes.inputRadius,
              paddingRight: 14,
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInputBordered
                // value={param?.flag=="Location"?param.location:addresss}
                value={
                  param?.locationAdress && param?.locationAdress != null
                    ? param?.locationAdress
                    : address
                }
                onChangeText={val => {
                  setaddresss(val);
                }}
                editable={false}
                placeholder={'17 Johnson Ave, NYC'}
                placeholderTextColor={'grey'}
                titleStyle={{color: '#FFF'}}
                inputStyle={{
                  color: 'grey',
                  fontFamily: fontFamily.appTextRegular,
                }}
                inputContainerStyle={{
                  borderWidth: 0,
                  marginHorizontal: 0,
                  borderRadius: 0,
                }}
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  props.navigation.navigate(routes.changelocation, {
                    data: {flag: 'home'},
                  })
                }
                style={{alignItems: 'center'}}>
                <SmallText style={{color: colors.appColor1}}>Change</SmallText>
              </TouchableOpacity>
            </View>
          </View>
        </Wrapper>
        <TextInputBordered
          title="Travel Charges"
          titleStyle={{
            color: colors.appColor1,
            fontFamily: fontFamily.appTextRegular,
            fontSize: totalSize(1.4),
          }}
          placeholder={'Add charges'}
          value={travel}
          onChangeText={val => {
            settravel(val);
          }}
        />
        <Spacer height={sizes.smallMargin} />

        <TextInputBordered
          title="About You"
          titleStyle={{
            color: colors.appColor1,
            fontFamily: fontFamily.appTextRegular,
            fontSize: totalSize(1.4),
          }}
          placeholder={'please enter dis '}
          pla
          value={about}
          onChangeText={val => {
            setabout(val);
          }}
          inputStyle={[{textAlignVertical: 'top', height: height(18)}]}
        />
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        {loader ? (
          <View style={{}}>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
          // <AbsoluteWrapper style={{ bottom: 30, left: 0, right: 0 }}>
          <ButtonColored
            text={'Next'}
            onPress={() =>
              travel != '' && travel != null && about != '' && about != null
                ? signUpHandle()
                : ToastMessage('Please fill all feilds')
            }
            // onPress={() => props.navigation.navigate(routes.identityproof)}
          />
          // </AbsoluteWrapper>
        )}
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <>
          {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              // setDate(moment(date).format("yyyy, MMM dd"));
              // moment(item?.booking_start).format("yyyy, MMM dd")
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </>
      </KeyboardAvoidingScrollView>
    </MainWrapper>
  );
};

export default StylistProfileDetail;
const styles = StyleSheet.create({
  dropDownContainer: {
    width: width(25),
    // backgroundColor:'red'
  },
  dropModal: {
    width: width(80),
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: height(2),
    alignItems: 'center',
    elevation: 5,

    // marginLeft: Theme.wp("-9%"),
  },
  dropModal2: {
    width: width(42.5),
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: height(2),
    alignItems: 'center',
    elevation: 5,
    marginRight: -58,
    paddingVertical: height(5),
    // marginLeft:-18
    // marginLeft: Theme.wp("-9%"),
  },
  back: {
    backgroundColor: colors.snow,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'space-between',
    height: height(7),
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.appColor1,
    paddingHorizontal: width(2.5),
    // backgroundColor:'red'
  },
  back2: {
    backgroundColor: colors.snow,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'space-between',
    height: height(7),
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.appColor1,
    width: width(43),
    paddingHorizontal: width(2.5),
    // backgroundColor:'red'
  },
});
