import React, { useState } from 'react';
import { StyleSheet, StatusBar, Modal, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MainWrapper, CustomIcon, Wrapper, AbsoluteWrapper, TextInputBordered, ButtonColored, Spacer } from '../../../components';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors, appIcons, appStyles, sizes ,fontFamily} from '../../../themes';
import { height, totalSize, width } from 'react-native-dimension';
import ClientHeader from '../../../components/header/clientHeader';
import { routes } from '../../../services';
import { mapKey } from '../../../services/constants';
import Geocoder from 'react-native-geocoder';
import { setUserCordinates } from '../../../services/stores/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ChangeLocation = (props) => {
  const param =props.route.params
  console.log("param",param,);
  const { navigate, goBack } = props.navigation;
  const dispatch = useDispatch();
  const { latitude, longitude, address } = useSelector((state) => state.user);
  const [location, setlocation] = useState("");
  const [latitude1, setlatitude1] = useState(latitude);
  const [longitude1, setlongitude1] = useState(longitude);

  console.log("ye i location",latitude1,longitude1);

  
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState({
    // latitude: 37.78825,
    //   longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    latitude: latitude1&&latitude1!=null?latitude1:37.78825,
    longitude: longitude1&&longitude1!=null?longitude1:-122.4324,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
  });
  // const [marker, setMarker] = useState({
  //   // title: 'Your location',
  //   // description: 'Description',
  //   cooards: {
  //     latitude: latitude,
  //     longitude: longitude
  //   }
  // });

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
      let response = await Geocoder.geocodePosition({lat, lng});
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

  return (
    <>
      <StatusBar 
        backgroundColor={"#FFF"} 
        barStyle={'dark-content'} 
      />
      <ClientHeader
        backButton={true}
        goBack={() => goBack()}
        heading={"Select Location"} 
        notification={false}
        headingStyle={{color:colors.appColor1}}
        headerStyle={{backgroundColor:"#FFF"}}
      />
      <MainWrapper style={[{ justifyContent: 'space-between', }]}>
      <AbsoluteWrapper
          style={[
            {
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              backgroundColor: colors.appBgColor2,
            },
          ]}>
          <MapView
            region={{
              latitude: parseFloat(
                latitude && latitude != null ? latitude : 37.78825,
              ),
              longitude: parseFloat(
                longitude && longitude != null ? longitude : -122.4324,
              ),
              latitudeDelta: 0.035,
              longitudeDelta: 0.035,
            }}
            style={styles.mapStyle}>
            <Marker
              coordinate={{
                latitude: parseFloat(
                  latitude && latitude != null ? latitude : 37.78825,
                ),
                longitude: parseFloat(
                  longitude && longitude != null ? longitude : -122.4324,
                ),
                // latitude: parseFloat(37.78825,),
                // longitude: parseFloat(-122.4324)
              }}
              onSelect={e => markerMoveHandle('onSelect', e)}
              onDrag={e => markerMoveHandle('onDrag', e)}
              onDragStart={e => markerMoveHandle('onDragStart', e)}
              onDragEnd={e => markerMoveHandle('onDragEnd', e)}
              onPress={e => markerMoveHandle('onPress', e)}
              draggable>
              <CustomIcon icon={appIcons.mapMarker} size={totalSize(6)} />
            </Marker>
          </MapView>
        </AbsoluteWrapper>
        <Wrapper style={{ backgroundColor: colors.appBgColor1 }}>
        <Spacer height={sizes.baseMargin} />
        <View style={{position: 'relative', marginTop: totalSize(0),marginBottom:height(1),borderWidth:1,height:height(7),borderRadius:15,paddingHorizontal:width(2),
      marginHorizontal:width(5),borderColor:colors.appColor1}}>
          {/* <TextInputBordered
            placeholder={'Search location'}
            placeholderTextColor={'#21212180'}
            inputStyle={{color:"grey",fontFamily:fontFamily.appTextRegular}}
          /> */}
          <View style={styles.modalView}>
          <View style={styles.mapViewInput}>
            <GooglePlacesAutocomplete
              placeholder='Search location'
              autoFocus={true}
              returnKeyType={'default'}
              fetchDetails={true}
              onPress={(data, details = null) => {
                setlocation(data.description)
                console.log("DATA =====> ", data);
                console.log("DETAILS =====> ", JSON.stringify(details));
                const datalocation={
                  "address":data.description,"latitude":details.geometry.location.lat,"longitude":details.geometry.location.lng
                }
                console.log("ye aya data",datalocation);
                // setlatitude1(details.geometry.location.lat);
                // setlongitude1(details.geometry.location.lng);
                dispatch(setUserCordinates(datalocation));
              }}
              query={{
                key: mapKey,
                language: 'en',
              }}
            />
          </View>
        </View>
          <AbsoluteWrapper style={{right: totalSize(2), top: totalSize(1.7)}}>
            <AntDesign
              name="search1"
              size={totalSize(2.5)}
              color={colors.appColor1}
            />
          </AbsoluteWrapper>
        </View>
          <Spacer height={sizes.baseMargin} />
        </Wrapper>
        <Wrapper>
          <Spacer height={sizes.baseMargin} />
        
            <ButtonColored 
              onPress={() => props.navigation.navigate(routes.stylistdetails,{locationAdress:location})}
              // onPress={() => goBack()}
              text="Confirm Location" 
            />
           
          
            <Spacer height={sizes.doubleBaseMargin} />
        </Wrapper>
      </MainWrapper>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
      >
        <View style={styles.modalView}>
          <View style={styles.mapViewInput}>
            <GooglePlacesAutocomplete
              placeholder='Enter Location'
              autoFocus={true}
              returnKeyType={'default'}
              fetchDetails={true}
              onPress={(data, details = null) => {
                console.log("DATA =====> ", data);
                console.log("DETAILS =====> ", JSON.stringify(details.geometry,null,2));
              }}
              query={{
                key: mapKey,
                language: 'en',
              }}
            />
          </View>
        </View>
      </Modal> */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <GooglePlacesAutocomplete
              autoFocus={true}
              fetchDetails={true}
              styles={{
                textInputContainer: {
                  width: "100%",
                },
              }}            
              placeholder='Search'
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              query={{
                key: mapKey,
                language: 'en',
              }}
            />
          </View>
        </View>
      </Modal> */}
    </>
  );
}

export default ChangeLocation;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  // modalView: {
  //   backgroundColor: "#000",
  //   width: "100%",
  //   height: Dimensions.get('window').height,
  //   borderRadius: totalSize(4),
  //   padding: totalSize(3),
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5
  // },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: Dimensions.get('window').height,
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
    // backgroundColor: "red",
    borderRadius: 20,
    width:width(79),
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