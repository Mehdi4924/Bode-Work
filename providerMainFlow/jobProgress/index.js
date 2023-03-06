import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Linking} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {
  MainWrapper,
  CustomIcon,
  Wrapper,
  AbsoluteWrapper,
  TextInputBordered,
  ButtonColored,
  Spacer,
  TinyTitle,
  RowWrapper,
  RegularText,
  RowWrapperBasic,
  MediumText,
  IconButton,
  SmallText,
  LargeText,
  ProviderServiceCard,
  ServiceIconCardNew,
} from '../../../components';
import {Icon} from 'react-native-elements';
import {colors, appIcons, appStyles, sizes} from '../../../themes';
import {totalSize, width} from 'react-native-dimension';
import Geocoder from 'react-native-geocoding';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData, saveData} from '../../../backend/firebase/utility';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import MapViewDirections from 'react-native-maps-directions';
import { Alert } from 'react-native';
class JobProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 51.5347,
        longitude: 0.1246,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: {
        title: 'Your location',
        description: 'Description',
        cooards: {
          latitude: 37.4219487,
          longitude: -122.0839992,
        },
      },
      cooards: {
        latitude: 37.4219487,
        longitude: -122.0839992,
      },
      Getregion: false,
      radius: 20,
      status: 'pending ...',
      // userinfo:this.props.navigation.getParam('userinfo'),
    };
  }

  async componentDidMount() {
    await Geocoder.init('AIzaSyCZZt0P_BztZPme1q5icvLe65i51PjxX3M'); // use a valid API key
    await AsyncStorage.getItem('Token').then(async token => {
      // console.log(token);
      await getData('Provider', token).then(async userinfo => {
        this.setState({userinfo: userinfo});
        if (userinfo.radius !== undefined) {
          this.setState({radius: userinfo.radius, Getregion: true});
        }
        if (userinfo.region !== undefined) {
          this.setState({region: userinfo.region, Getregion: true});
        } else {
          Geolocation.watchPosition(
            info => {
              // let location = this.state.region;
              // this.state.region.latitude = info.coords.latitude;
              // this.state.region.longitude = info.coords.longitude;
              let location = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              };
              this._animate(location);
              this.setState({region: location, x: location, Getregion: true});
              console.log(info.coords);
            },
            error => console.log(new Date(), error),
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    });
    const {item} = this.props.route.params;
    if (item) {
      this.setState({
        // region: item.region,
        status: item.status,
        // marker: marker,
        // cooards: cooards,
      });
      // this._animate(item.region);
    }
  }

  handleJobStatus = async () => {
    const {item} = this.props.route.params;
    await AsyncStorage.getItem('Token').then(async token => {

      



      await getData('Bookings', token, 'Confirmed').then(async userinfo => {

        let ServiceIndex = 0;

        userinfo.forEach((element,index) => {
          if(element.id===item.id){
            ServiceIndex=index;
          }
        });

        if (item.status == 'Pending' || item.status == 'pending') {
          let newArray = userinfo;
          newArray[ServiceIndex].status = 'In Progress';
          newArray[ServiceIndex].jobStartTime = moment().format("DD/MM/yyyy hh:mm a");
          await saveData('Bookings', token, {Confirmed: newArray});

          // Add Notification
          let OldNotification = await getData(
            'notifications',
            item.UserId,
            'notifications',
          );
          let user = await getData('Provider', token);
          let ProviderData= await getData("Users",item.UserId);
    let fcmToken = ProviderData.token!== undefined ?ProviderData.token : "";
          console.log('Old ', OldNotification);
          if (user) {
            let notificationsObj = {
              title: 'Your Job has been started.',
              time: moment().format(),
              details: user.username + ' assigned for ' + item.Service,
              token:fcmToken,
              nextScreen: "serviceTab"
            };
            if (OldNotification.length) {
              OldNotification.push(notificationsObj);
            } else {
              OldNotification = [notificationsObj];
            }

            await saveData('notifications', item.UserId, {
              notifications: OldNotification,
            });
          }

          Toast.show('Your job status is updated');
          this.props.navigation.pop();
        } else if (item.status == 'In Progress') {
          console.log('Came in here');
          let newArray = [];
          let newObj = userinfo[ServiceIndex];
          let copyarray = userinfo;
          newObj.status = 'Completed';
          newObj.Paymentstatus = 'unpaid';
          newObj.isClientCompleteJob= false;
          newObj.jobCompleteTime = moment().format("DD/MM/yyyy hh:mm a");
          copyarray[ServiceIndex].status = 'Completed';
          copyarray[ServiceIndex].Paymentstatus = 'unpaid';
          copyarray[ServiceIndex].isClientCompleteJob= false;
          let completedArray = await getData('Bookings', token, 'Completed');

          if (completedArray && completedArray.length) {
            completedArray.push(newObj);
            newArray = completedArray;
          } else {
            newArray.push(newObj);
          }
          let updatedConfirmed = copyarray.filter((element)=>{
            return element.status !== 'Completed';
          });

          console.log("Total remaning Booking:",updatedConfirmed.length, ServiceIndex)
          await saveData('Bookings', token, {
            Confirmed: updatedConfirmed,
            Completed: newArray,
          });

          // Add Notification
          let OldNotification = await getData(
            'notifications',
            item.UserId,
            'notifications',
          );
          let user = await getData('Provider', token);
          console.log('Old ', OldNotification);
          if (user) {
            let ProviderData= await getData("Users",item.UserId);
    let fcmToken = ProviderData.token!== undefined ?ProviderData.token : "";
            let notificationsObj = {
              title: 'Your Job has been done. Please pay provider now',
              time: moment().format(),
              token:fcmToken,
              details: user.username + ' assigned for ' + item.Service,
              nextScreen: "paymentTab"
            };
            if (OldNotification.length) {
              OldNotification.push(notificationsObj);
            } else {
              OldNotification = [notificationsObj];
            }

            await saveData('notifications', item.UserId, {
              notifications: OldNotification,
            });

            let Detail = [];
            let PayArray = await getData('Payment', item.UserId, 'Details');

            if (PayArray && PayArray.length) {
              let newarray = [newObj];
              PayArray = newarray.concat(PayArray);
              Detail = PayArray;
            } else {
              Detail.push(newObj);
            }
            await saveData('Payment', item.UserId, {
              Details: Detail,
            });
          }
          Toast.show('Your job status is updated');
          this.props.navigation.pop();
        }
      });
    });
    // this.forceUpdate();
  };

  _animate = async region => {
    setTimeout(() => {
      if (
        // this.state.region.latitude != 0 &&
        this.refs.map.animateToRegion(
          {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          },
          3000,
        )
      );
    }, 15);
  };

  // Geolocation.watchPosition(
  //   (position) => {
  //     const region = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //       latitudeDelta: LATITUDE_DELTA, //0.0922 LATITUDE_DELTA
  //       longitudeDelta: 0.005,
  //     };
  //     this.setRegion(region);
  //   },
  //   (error) => {
  //     console.log(error.code, error.message);
  //   },
  //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  // );

  render() {
    const {navigation} = this.props;
    const {region, marker, status, cooards} = this.state;
    const {item} = this.props.route.params;
    return (
      <MainWrapper style={[{justifyContent: 'space-between'}]}>
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
          {this.state.Getregion && (
            <MapView
              ref="map"
              zoomEnabled
              zoomTapEnabled
              initialRegion={region}
              region={region}
              style={styles.mapStyle}
              onRegionChangeComplete={result => {
                console.log('In e', result);
                let region = {
                  latitude: result.latitude,
                  longitude: result.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                };
                // this.setState({region: region});
              }}>
              <Marker
                coordinate={region}
                title={marker.title}
                description={marker.description}>
                <CustomIcon icon={appIcons.mapMarker} size={totalSize(6)} />
              </Marker>
              <Marker
                coordinate={item.userRegion}
                title={item.username}
                // description={marker.description}
              >
                <CustomIcon icon={appIcons.mapMarker} size={totalSize(6)} />
              </Marker>
              <MapViewDirections
                optimizeWaypoints={true}
                strokeWidth={3}
                strokeColor="blue"
                origin={region}
                destination={item.userRegion}
                apikey={'AIzaSyDn-zgL6nFtCy40cEVDMZmpJsjmTLNkGN8'}
              />
              {/* <MapView.Circle
                center={region}
                radius={this.state.radius * 100}
                strokeWidth={1}
                strokeColor={colors.appColor1}
                fillColor={colors.appColor1 + '80'}
              /> */}
            </MapView>
          )}
        </AbsoluteWrapper>
        <Wrapper style={{backgroundColor: colors.appBgColor1}}>
          <View
            style={{
              width: width(100),
              backgroundColor: colors.appColor1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TinyTitle style={{color: colors.snow, marginVertical: 10}}>
              {this.state.status}
            </TinyTitle>
          </View>
        </Wrapper>
        <Wrapper>
          <ProviderServiceCard
            containerStyle={[
              {
                width: width(90),
                // marginLeft: sizes.marginHorizontal,
              },
            ]}
            name={item.name}
            image={item.profileImage}
            rating={item.rating}
            title={item.service}
            timeSlot={item.timeSlot}
            date={item.date}
            location={item.location}
            distance={item.distance}
            price={item.Price}
            // showActionButtons
            onPress={() => {
              this.props.navigation.navigate(
                routes.provider.jobProgress,
                {item, index},
              );
            }}
            onPressLocation={() => {
              this.props.navigation.navigate(
                routes.provider.jobProgress,
                {item, index},
              );
            }}
            onPressCall={() => {
              Linking.openURL(`tel:${item.phoneNumber}`);
            }}
            onPressMessage={() => {
              Linking.openURL(`sms:${item.phoneNumber}`);
            }}
          />
          {/* <TouchableOpacity onPress={() => alert('Clicking')}>
            <Wrapper style={[appStyles.center]}>
              <IconButton iconName="chat" />
              <Spacer height={sizes.smallMargin} />
              <SmallText>Chat</SmallText>
            </Wrapper>
          </TouchableOpacity> */}
          <Spacer height={sizes.baseMargin} />
          {status != 'Completed' ? (
            <ButtonColored
              onPress={()=>{
                // this.handleJobStatus()
                Alert.alert(
                  'Message',
                  status == 'Pending' || status == 'pending' ? 'Are you sure you want to start this job?': 'Are you sure you want to complete this job?',
                  [
                    {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                    {text: 'YES', onPress: () => {this.handleJobStatus()}},
                  ]
                );
              }
              }
              text={
                status == 'Pending' || status == 'pending'
                  ? 'Start Job'
                  : status == 'In Progress'
                  ? 'Finish Job'
                  : null
              }
            />
          ) : null}
          <Spacer height={sizes.baseMargin} />
        </Wrapper>

        {/* <View style={{flex: 1, alignItems: 'center'}}> */}
        {/* <View
          style={{
            position: 'absolute',
            top: '44%',
            right: 0,
            left: '45%',
            bottom: 0,
          }}>
          <CustomIcon icon={appIcons.mapMarker} size={totalSize(6)} />
        </View> */}
      </MainWrapper>
    );
  }
}

export default JobProgress;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 0.6,
  },
  iconContainer: {
    height: totalSize(4),
    width: totalSize(4),
    ...appStyles.center,
    backgroundColor: colors.appColor1,
    borderRadius: sizes.buttonRadius,
  },
  radiusCounterContainer: {
    borderRadius: sizes.buttonRadius,
    borderWidth: 1,
    borderColor: colors.appColor1,
  },
});
