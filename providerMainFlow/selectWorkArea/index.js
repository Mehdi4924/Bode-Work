import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
// import MapView, { Marker, Callout } from 'react-native-maps';
import { MainWrapper, CustomIcon, Wrapper, AbsoluteWrapper, TextInputBordered, ButtonColored, Spacer, RowWrapper, RegularText, RowWrapperBasic, MediumText, LargeText } from '../../../components';
import { colors, appIcons, appStyles, sizes, fontFamily } from '../../../themes';
import { height, totalSize, width } from 'react-native-dimension';
// import { totalSize, width } from 'react-native-dimension';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, saveData } from '../../../backend/firebase/utility';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import Header from '../../../components/header/header';
import { routes } from '../../../services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { mapKey } from '../../../services/constants';
import { useDispatch, useSelector } from 'react-redux';
import {setUserCordinates} from '../../../services/stores/actions/user';

const customStyle = [
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
];
const SelectLocation = (props) => {
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const { latitude, longitude, address } = useSelector((state) => state.user);
  const [location, setlocation] = useState("");
  const [region, setregion] = useState({
    latitude: 51.5347,
    longitude: 0.1246,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });
  const [marker, setMarker] = useState({
    title: 'Your location',
    description: 'Description',
    cooards: {
      latitude: 51.5447,
      longitude: 0.1246
    }
  });
  const LATLNG = {
    latitude: latitude,
    longitude: longitude
  }
  const circle = {
    center: {
      latitude: "LATITUDE + SPACE",
      longitude: "LONGITUDE + SPACE",
    },
  };
  const [Getregion, setGetregion] = useState(false);
  const [radius, setRadius] = useState(20);
  const markerMoveHandle = (eventName, e) => {
    if (eventName === "onDragEnd") {
      const lat = e.nativeEvent.coordinate.latitude;
      const lng = e.nativeEvent.coordinate.longitude;
      getLocationName(lat, lng);
    }
  };
  const getLocationName = async (lat, lng) => {
    try {
      await Geocoder.fallbackToGoogle(mapKey);
      let response = await Geocoder.geocodePosition({ lat, lng });
      let location = (response[0].formattedAddress);

      const data = {
        latitude: lat,
        longitude: lng,
        address: location,
      }
      console.log("location =====> ", location);
      dispatch(setUserCordinates(data));

    } catch (error) {
      // ToastMessage(error.message);
    }
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await Geocoder.init('AIzaSyCZZt0P_BztZPme1q5icvLe65i51PjxX3M'); // use a valid API key
  //     await AsyncStorage.getItem('Token').then(async token => {
  //       console.log(token);
  //       await getData('Provider', token).then(async userinfo => {
  //         // this.setState({ userinfo: userinfo });
  //         if(userinfo.radius!== undefined){
  //           setregion(userinfo.radius);
  //           setGetregion(true);
  //         }
  //         if(userinfo.region!== undefined){
  //           setregion(userinfo.region);
  //           setGetregion(true);
  //         }else{
  //           Geolocation.getCurrentPosition(
  //             info => {
  //               // let location = this.state.region;
  //               // this.state.region.latitude = info.coords.latitude;
  //               // this.state.region.longitude = info.coords.longitude;
  //               let location = {
  //                 latitude: info.coords.latitude,
  //                 longitude: info.coords.longitude,
  //                 latitudeDelta: 0.0922,
  //                 longitudeDelta: 0.0421
  //               };

  //               setregion(location);
  //               setGetregion(true);
  //               console.log(info.coords);
  //             },
  //             error => console.log(new Date(), error),
  //             {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
  //           );
  //         }
  //       });
  //     });
  //   }

  //   fetchData();
  // }, []);

  return (
    <MainWrapper style={[{ justifyContent: 'space-between', }]}>
      <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
      <AbsoluteWrapper style={[{ top: 0, right: 0, left: 0, bottom: 0, backgroundColor: colors.appBgColor2 }]}>
        {/* {Getregion &&
          <MapView
            region={region}
            style={styles.mapStyle}
            onRegionChangeComplete={result => {
              console.log('In e', result);
              let region={  
                latitude: result.latitude,
                longitude: result.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
              setregion(region);
            }}
          >
            <MapView.Circle
              center={region}
              radius={radius*100}
              strokeWidth={1}
              strokeColor={colors.appColor1}
              fillColor={colors.appColor1 + '80'}
            />
          </MapView>
        } */}
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={customStyle}
          region={{
            latitude: latitude&&latitude!=null?latitude:31.5522984,
                longitude: longitude&&longitude!=null?longitude:74.3470166,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          style={{ height: height(92), borderRadius: 30 }}
        >
          <Circle
            //   center={{
            //     latitude: 31.5522984,
            // longitude: 74.3470166,
            //   }}
            center={{
              latitude: parseFloat(latitude&&latitude!=null?latitude:31.5522984,), 
                longitude: parseFloat(longitude&&longitude!=null?longitude:74.3470166) 
              // latitude: parseFloat(37.78825,), 
              // longitude: parseFloat(-122.4324) 
            }}
            radius={1500}
            strokeWidth={1}
            strokeColor={colors.appColor1}
            fillColor="#CDF3F1"
          />
          <Marker
            coordinate={{
              latitude: parseFloat(latitude&&latitude!=null?latitude:31.5522984,), 
                longitude: parseFloat(longitude&&longitude!=null?longitude:74.3470166) 
              // latitude: parseFloat(37.78825,), 
              // longitude: parseFloat(-122.4324) 
            }}
            onSelect={e => markerMoveHandle('onSelect', e)}
            onDrag={e => markerMoveHandle('onDrag', e)}
            onDragStart={e => markerMoveHandle('onDragStart', e)}
            onDragEnd={e => markerMoveHandle('onDragEnd', e)}
            onPress={e => markerMoveHandle('onPress', e)}
            draggable
          >


            <CustomIcon
              icon={appIcons.mapMarker}
              size={totalSize(6)}
            />
          </Marker>
        </MapView>
      </AbsoluteWrapper>
      <Wrapper style={{ backgroundColor: colors.appBgColor1 }}>
        <Header
          goBack={() => props.navigation.goBack()}
          heading={"Select Work Area"}
          color={colors.appColor1}
        />
        <Spacer height={sizes.baseMargin} />
        <Wrapper style={{ backgroundColor: colors.appBgColor1 }}>
          <Spacer height={sizes.baseMargin} />
          <View style={{
            position: 'relative', marginTop: totalSize(0), marginBottom: height(1), borderWidth: 1, height: height(7), borderRadius: 15, paddingHorizontal: width(2),
            marginHorizontal: width(5), borderColor: colors.appColor1,
          }}>
            {/* <TextInputBordered
            placeholder={'Search location'}
            placeholderTextColor={'#21212180'}
            inputStyle={{color:"grey",fontFamily:fontFamily.appTextRegular}}
          /> */}
            <View style={styles.modalView}>
              <View style={styles.mapViewInput}>
                <GooglePlacesAutocomplete
                  placeholder='Search location'
                  textInputProps={{
                    placeholderTextColor: 'grey',
                   
                    // returnKeyType: "search"
                  }}
                  multiline={true}
                  autoFocus={true}
                  returnKeyType={'default'}
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    // setlocation(data.description)
                    console.log("DATA =====> ", data);
                    console.log("DETAILS =====> ", JSON.stringify(details.geometry, null, 2));
                    const datalocation = {
                      address: data.description,
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                    };
                    console.log('ye aya data', datalocation);
                    dispatch(setUserCordinates(datalocation));
                  
                    // AsyncStorage.setItem("currentLatitude", JSON.stringify(details.geometry.location.lat));

                    // // console.log("longitude =====> ", lng);
                    // AsyncStorage.setItem("currentLongitude", JSON.stringify(details.geometry.location.lng));
                  }}
                  query={{
                    key: mapKey,
                    language: 'en',
                  }}
                />
              </View>
            </View>
            <AbsoluteWrapper style={{ right: totalSize(2), top: totalSize(1.7) }}>
              <AntDesign
                name="search1"
                size={totalSize(2.5)}
                color={colors.appColor1}
              />
            </AbsoluteWrapper>
          </View>
          <Spacer height={sizes.baseMargin} />
        </Wrapper>
        {/* <View style={{ position: 'relative', marginTop: totalSize(3) }}>
          <TextInputBordered
          value={search}
          onChangeText={val => {
            {setsearch(val)
              // ,
              // getsearchData()
            }
          }}
            placeholder={'Search location'}
            placeholderTextColor={'#21212180'}
            inputStyle={{ color: "grey", fontFamily: fontFamily.appTextRegular }}
          />
          <AbsoluteWrapper style={{ right: totalSize(4), top: totalSize(1.4) }}>
            <TouchableOpacity 
            // onPress={()=>getsearchData()}
            >
            <AntDesign
              name="search1"
              size={totalSize(2.5)}
              color={colors.appColor1}
            />
            </TouchableOpacity>
          </AbsoluteWrapper>
        </View> */}
        {/* <TextInputBordered
          titleStyle={[appStyles.textWhite]}
          placeholder="Search location"
          iconName="ios-search"
          iconType="ionicon"
          inputStyle={{color: '#FFF',fontFamily:fontFamily.appTextRegular}}
          iconColor={colors.appColor1}
        /> */}
        {/* <Spacer height={sizes.baseMargin} /> */}
        <RowWrapper style={{zIndex:-5}}>
          <RegularText style={{ fontSize: (totalSize(2)) }}>Radius (miles)</RegularText>
          <RowWrapperBasic style={[styles.radiusCounterContainer]}>
            <TouchableOpacity style={[styles.iconContainer]}
              onPress={() => {
                if (radius < 500) {
                  setRadius(radius + 1)
                }
              }}>
              <Ionicons
                name='add'
                size={totalSize(3)}
                color="#fff"
              />
            </TouchableOpacity>
            <Spacer width={sizes.baseMargin} />
            <LargeText>{radius}</LargeText>
            <Spacer width={sizes.baseMargin} />
            <TouchableOpacity style={[styles.iconContainer]}
              onPress={() => {
                if (radius > 1) {
                  setRadius(radius - 1)
                }
              }}
            >
              <AntDesign
                name="minus"
                size={totalSize(3)}
                color={colors.appTextColor6}

              />
            </TouchableOpacity>
          </RowWrapperBasic>
        </RowWrapper>
        <Spacer height={sizes.baseMargin} />
      </Wrapper>
      <Wrapper>
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <ButtonColored
          text="Confirm"
          onPress={() => props.navigation.navigate(routes.provider.profile)}
          // style={{marginBottom:height(1)}}
        />
        <Spacer height={sizes.TinyMargin} />
      </Wrapper>
      <View
        style={{
          position: 'absolute',
          top: '44%',
          right: 0,
          left: '45%',
          bottom: 0,
        }}>
        {/* <CustomIcon
          icon={appIcons.mapMarker}
          size={totalSize(6)}
        /> */}
      </View>
    </MainWrapper>
  );
}

export default SelectLocation;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1
  },
  iconContainer: {
    height: totalSize(4),
    width: totalSize(4),
    ...appStyles.center,
    backgroundColor: colors.appColor1,
    borderRadius: 10
  },
  radiusCounterContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.appColor1
  },
  modalView: {
    // flex: 1,
    backgroundColor: "white",
    width: "100%",
    // height: Dimensions.get('window').height,
    borderRadius: 20,
    // borderWidth:1
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  mapViewInput: {
    position: "absolute",
    top: 1,
    right: 0,
    left: 0,
    zIndex: 999,
    // backgroundColor: "grey",
    borderRadius: 20,
    width: width(79),
    // marginHorizontal: 20,
    // marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    // elevation: 12,
    // borderWidth:1,
    // borderColor:colors.appColor1
  },
})