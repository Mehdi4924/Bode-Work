import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image, Pressable} from 'react-native';
import {
  MainWrapper,
  ComponentWrapper,
  CustomIcon,
  RegularText,
  Wrapper,
  TinyTitle,
  Spacer,
  RowWrapper,
  ImageRound,
  RowWrapperBasic,
  TinyText,
  ButtonColored,
  MediumText,
  LargeTitle,
  MediumTitle,
  ButtonBordered,
  ButtonBorderedSmall,
} from '../../../components';
import {appImages, appStyles, fontSize, sizes, colors, appIcons, fontFamily} from '../../../themes';
import {totalSize, width, height} from 'react-native-dimension';
import {routes} from '../../../services';
import Header from '../../../components/header/header';
// import Entypo from 'react-native-elements/';
import {saveData, getData} from '../../../backend/firebase/utility';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
class Confirmation extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      scheduled: false,
    };
  }
  
  // componentDidMount = async () => {
  //   this.onScheduleService();
  //   const {item} = this.props.route.params;
  //   let token = await AsyncStorage.getItem('Token');
  //   let address = '';
  //   await Geocoder.init('AIzaSyCZZt0P_BztZPme1q5icvLe65i51PjxX3M'); // use a valid API key
  //   Geolocation.getCurrentPosition(
  //     info => {
      
  //       let location = {
  //         latitude: info.coords.latitude,
  //         longitude: info.coords.longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       };
  //       Geocoder.from({
  //         // lat: info.coords.latitude,
  //         // lng: info.coords.longitude,
  //         lat: 38.838439,
  //         lng: -104.786864,
  //       })
  //         .then(async json => {
  //           console.log(json);
  //           // const city = json.results[0].formatted_address;
  //           // const city = json.results[0].address_components[4].long_name;
  //           address = json.results[0]
  //             ? json.results[0].formatted_address
  //             : 'No Name';
  //           console.log('Address', address);
  //           this.setState({
  //             city: json.results[0]
  //               ? json.results[0].formatted_address
  //               : 'No Name',
  //           });
  //           // alert(address)
  //           await AsyncStorage.getItem('Token').then(async data => {
  //             let userInfo = await getData('Users', data);
  //             let obj = {
  //               date: item.date,
  //               profileImage:userInfo.profileImage !== undefined && userInfo.profileImage!== '' ? userInfo.profileImage :
  //                 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmVvN7-zVjZUOvMWUkyUaD_3-G-F_lGPhtpQ&usqp=CAU',
  //               timeSlot: item.timeSlot,
  //               distance: (item.distence * 0.621371).toFixed(0) + ' Miles away',
  //               id: (Math.floor(Math.random() * 10000) + 10000)
  //                 .toString()
  //                 .substring(1),
  //               location: json.results[0]
  //                 ? json.results[0].formatted_address
  //                 : '',
  //               Price: item.Price,

  //               name: userInfo.username,
  //               ProviderRating: item.rating,
  //               rating: userInfo.rating,
  //               ProviderName: item.username,
  //               UserId: token,
  //               ProviderprofileImage:item.profileImage !== undefined && item.profileImage!=="" ? item.profileImage:
  //               'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmVvN7-zVjZUOvMWUkyUaD_3-G-F_lGPhtpQ&usqp=CAU',
  //               Service: item.Service,
  //               Price: item.Price,
  //               ProviderId: item.Id,
  //               status: 'Pending',
  //               // distence:item.distence+' Km away',
  //               region: item.region,
  //               userRegion: item.userRegion,
  //             };
  //             console.log('final obj : ', obj);
  //             // Add Notification
  //             let OldNotification = await getData(
  //               'notifications',
  //               item.Id,
  //               'notifications',
  //             );
  //               let ProviderData= await getData("Provider",item.Id);
  //               let fcmToken = ProviderData.token!== undefined ?ProviderData.token : "";
  //             console.log('Old ', OldNotification);
  //             let notificationsObj = {
  //               title: 'New Request',
  //               time: moment().format(),
  //               details: userInfo.username + ' request for ' + item.Service,
  //               token: fcmToken,
  //             };
  //             if (OldNotification.length) {
  //               OldNotification.push(notificationsObj);
  //             } else {
  //               OldNotification = [notificationsObj];
  //             }

  //             // let newOldNotification= [notificationsObj].concat(OldNotification);
  //             console.log(OldNotification);
  //             await saveData('notifications', item.Id, {
  //               notifications: OldNotification,
  //             });

  //             //

  //             let oldList = await getData('Bookings', item.Id);
  //             if (oldList) {
  //               let newList = [obj];
  //               // oldList.Request.push(obj);
  //               oldList.Request = newList.concat(oldList.Request);
  //               await saveData('Bookings', item.Id, oldList);
  //               console.log(obj);
  //             } else {
  //               let NewObj = {Request: []};
  //               NewObj.Request.push(obj);
  //               await saveData('Bookings', item.Id, NewObj);
  //             }
  //           });

  //           setTimeout(() => {
  //             // this.setState({ scheduled: true })
  //             this.props.navigation.navigate(routes.provider.mainTab);
  //           }, 5000);
  //         })
  //         .catch(error => console.warn(error));
  //       this.setState({region: location, x: location, Getregion: true});
  //       console.log(info.coords);
  //     },
  //     error => console.log(new Date(), error),
  //     {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
  //   );

  //   // await saveData("",item.Id,)
  // };
  // onScheduleService = () => {
  //   // setTimeout(() => {
  //   //   this.setState({ scheduled: true })
  //   // }, 5000);
  // };
  render() {
    
    const {navigate} = this.props.navigation;
    // const item = { image: appImages.user3, name: 'Jackob Black', title: 'Hair Stylist' }
    const item = this.props?.route?.params?.stlistid;
    console.log("....",item);
    const param=this.props?.route?.params;
    console.log("....param",JSON.stringify(param,null,2));
    const {scheduled} = this.state;
    return (
      <MainWrapper>
        <Wrapper flex={1}>
        {!scheduled ? (
        <Header
                goBack={() => this.props.navigation.goBack()}
                heading={"Almost there"}
                color={colors.appColor1}
            />
            ) : ( <Header
              goBack={() => this.props.navigation.goBack()}
              heading={"Service Scheduled"}
              color={colors.appColor1}
          />)}
          {!scheduled ? (
            <Wrapper>
              <ComponentWrapper style={[appStyles.center,{marginTop:height(4),}]}>
                <CustomIcon
                  icon={appImages.waitingArtwork}
                  size={totalSize(25)}
                  // animation="pulse"
                  iterationCount={'infinite'}
                  duration={2500}
                />
                <RegularText
                  style={[appStyles.textPrimaryColor, {fontSize: totalSize(2.7)}]}>
                  Waiting for confirmation
                </RegularText>
              </ComponentWrapper>
            </Wrapper>
          ) : (
            <Wrapper>
              <ComponentWrapper style={[appStyles.center]}>
                <ImageRound 
                
                // source=
                // {{uri: item.image}} 
                size={totalSize(15)} />
                <Spacer height={sizes.baseMargin} />
                <MediumTitle>
                {param?.stlistid?.stylistinfo.first_name}{" "}{param?.stlistid?.stylistinfo.last_name}
                  {/* Ahmad */}
                  </MediumTitle>
                <Spacer height={sizes.baseMargin} />
                <MediumText style={[, {}]}>
                  {/* {item.aboutMe} */}
                  Hair Stylist</MediumText>
                <Spacer height={sizes.baseMargin} />
              </ComponentWrapper>
              <ComponentWrapper>
                <ButtonBordered
                  text={moment(param?.AselectDate).format("MMM Do , YYYY")}
                  buttonStyle={styles.infoButton}
                />
                <Spacer height={sizes.smallMargin} />
                <ButtonBordered
                  text={param?.Aslot}
                  buttonStyle={styles.infoButton}
                />
              </ComponentWrapper>
            </Wrapper>
          )}
          <Spacer height={sizes.doubleBaseMargin} />
          <Wrapper>
            <ComponentWrapper>
              <TinyTitle style={{fontSize:totalSize(2),fontFamily:fontFamily.appTextBold}}>Start a conversation with your stylist</TinyTitle>
            </ComponentWrapper>
            <Spacer height={sizes.baseMargin} />
            <RowWrapper>
              <RowWrapperBasic>
                <ImageRound 
                // source={{uri: item.image}} 
                />
                <Spacer width={sizes.baseMargin} />
                <Wrapper>
                 <Pressable onPress={()=> this.setState({scheduled:true})}>
                 <TinyTitle>
                    {param?.stlistid?.stylistinfo.first_name}{" "}{param?.stlistid?.stylistinfo.last_name}
                    {/* John Doe */}
                    </TinyTitle>
                  <TinyText style={[appStyles.textLightGray]}>
                    Replies within 5 minutes
                  </TinyText>
                 </Pressable>
                </Wrapper>
              </RowWrapperBasic>
              <TouchableOpacity 
              style={{marginRight:width(5)}}
              onPress={() => navigate(routes.client.chatScreen,{rcvid:param?.stlistid?.data?.stylistid,firstname:param?.stlistid?.stylistinfo.first_name,lastname:param?.stlistid?.stylistinfo.last_name})}
              >
              <Image
                  source={appIcons.chat}
                  resizeMode="cover"
                  style={{
                    height: 20,
                    width: 20,

                  }}
                />
              </TouchableOpacity>
              {/* <Entypo
              style={{marginRight:width(3),marginTop:height(2)}}
                name="chat"
                // type="ionicon"
                color={colors.appColor1}
                size={sizes.appIcons.medium}
                onPress={() => navigate(routes.client.chatScreen)}
              /> */}
            </RowWrapper>
          </Wrapper>
        </Wrapper>
        {scheduled ? (
          <Wrapper>
            <Spacer height={sizes.baseMargin} />
            <ButtonColored
              text="Continue"
              onPress={() => navigate(routes.client.home)}
            />
            <Spacer height={sizes.baseMargin} />
          </Wrapper>
        ) : null}
      </MainWrapper>
    );
  }
}

export default Confirmation;

const styles = StyleSheet.create({
  infoButton: {
    marginHorizontal: width(10),
    height: height(6),
    borderRadius: 50,
  },
});
