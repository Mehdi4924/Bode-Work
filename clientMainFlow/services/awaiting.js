import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {
  MainWrapper,
  ClientServiceCard,
  MainWrapperMatrial,
  TextInputSimple,
  RowWrapper,
  ButtonColored,
  Spacer,
  ModalColored,
  ButtonBorderedSmall,
  ButtonColoredSmall,
  TextInputBordered,
} from '../../../components';
import {appImages, sizes} from '../../../themes';
import {routes} from '../../../services';
import moment from 'moment';
import {
  getAllOfCollection,
  getData,
  addToArray,
  saveData,
} from '../../../backend/firebase/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'mobx';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import {height, width} from 'react-native-dimension';
import {colors} from 'react-native-elements';
import {TextInput} from 'react-native';

class Awaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCancelShow: false,
      chaked: 'first',
      closingClients: '',
      scheduledServices: [
        {
          name: 'Jackobe Bl',
          image: appImages.user3,
          title: 'Hair Stylist',
          rating: 4.9,
          price: '56',
          location: '17 Johnson Ave, NYC',
          date: '29th July, 2020',
          time: '04:00 pm',
        },
        {
          name: 'James De',
          image: appImages.user1,
          title: 'Hair Stylist',
          rating: 4.6,
          price: '34',
          location: '17 Johnson Ave, NYC',
          date: '29th July, 2020',
          time: '04:00 pm',
        },
        {
          name: 'Alexa Jo',
          image: appImages.user2,
          title: 'Nail Stylist',
          rating: 4,
          price: '45',
          location: '17 Johnson Ave, NYC',
          date: '29th July, 2020',
          time: '04:00 pm',
        },
      ],
      CompletedBookings: [],
      loading: true,
    };
  }

  async componentDidMount() {
    await firestore()
      .collection('Bookings')
      .onSnapshot(async () => {
        this.GetUserData();
      });
  }
  toggleSubservicesModal = () => {
    this.setState({isCancelShow: !this.state.isCancelShow});
  };
  GetUserData = async () => {
    let token = await AsyncStorage.getItem('Token');
    let today = moment().format('YYYY-MM-DD');
    let CompletedBookings = await getAllOfCollection('Bookings');
    let confirmedBookings = [];
    for (let i = 0; i < CompletedBookings.length; i++) {
      for (let j = 0; j < CompletedBookings[i].Request.length; j++) {
        if (token == CompletedBookings[i].Request[j].UserId) {
          let date2 = moment(CompletedBookings[i].Request[j].date).format(
            'YYYY-MM-DD',
          );
          let calculatedDay = moment(date2).diff(today, 'days');
          if (calculatedDay >= 0) {
            confirmedBookings.push(CompletedBookings[i].Request[j]);
          }
        }
      }
    }
    this.setState({CompletedBookings: confirmedBookings, loading: false});
  };
  handleCancelPress = async index => {
    this.setState({isCancelShow:false})
    console.log(index);
    let {CompletedBookings} = this.state;
    console.log(CompletedBookings);
    let declinedBooking = CompletedBookings[index];
    let token = declinedBooking.ProviderId;
    let userInfo = CompletedBookings[index];
    let newBookings = CompletedBookings.splice(index, 1);
    // console.log(newBookings);
    // this.setState({CompletedBookings: CompletedBookings});

    let rejectedBookings = [];
    let rejectedArray = await getData('Bookings', token, 'Rejected');
    let Confirmed = await getData('Bookings', token, 'Request');
    let newConfirmed = Confirmed.filter(item => item.id !== declinedBooking.id);
    if (rejectedArray && rejectedArray.length) {
      rejectedBookings = rejectedArray;
    }
    rejectedBookings.push(declinedBooking);
    await saveData('Bookings', token, {
      Request: newConfirmed,
      Rejected: rejectedBookings,
    });
    this.GetUserData();
    // Add Notification
    let OldNotification = await getData(
      'notifications',
      token,
      'notifications',
    );
    let ProviderData= await getData("Provider",token);
    let fcmToken = ProviderData.token!== undefined ?ProviderData.token : "";
    console.log('Old ', OldNotification);
    let notificationsObj = {
      title: 'Cancel Request',
      time: moment().format(),
      details: userInfo.name + ' hase cancel request for ' + userInfo.Service,
      token:fcmToken,
    };
    if (OldNotification.length) {
      OldNotification.push(notificationsObj);
    } else {
      OldNotification = [notificationsObj];
    }

    // let newOldNotification= [notificationsObj].concat(OldNotification);
    console.log(OldNotification);
    await saveData('notifications', token, {
      notifications: OldNotification,
    });

    //

    // this.setState({})
  };
  renderScheduledServices = ({navigate}) => {
    const {
      scheduledServices,
      CompletedBookings,
      isCancelShow,
      chaked,
      closingClients,
    } = this.state;
    return (
      <FlatList
        data={CompletedBookings}
        renderItem={({item, index}) => {
          return (
            <ClientServiceCard
              containerStyle={[
                {
                  marginTop: index === 0 ? sizes.marginTop : null,
                  marginBottom: sizes.marginBottom,
                },
              ]}
              name={item.name}
              image={item.ProviderprofileImage}
              title={item.service}
              rating={item.rating}
              price={item.Price}
              location={item.location}
              date={item.date}
              time={item.timeSlot}
              onImagePress={()=>{
                navigate(routes.provider.ProfileView, {ProviderId: item.ProviderId})
              }}
              // name={item.name}
              // image={item.image}
              // title={item.title}
              // rating={item.rating}
              // price={item.price}
              // location={item.location}
              // date={item.date}
              // time={item.time}
              isCompleted={'Pending'}
              onPressCancel={() => {
                this.toggleSubservicesModal();
                this.setState({currentIndex: index});
              }}
              onPressReview={() =>
                navigate(routes.provider.postReview, {item: item})
              }
            />
          );
        }}
      />
    );
  };
  render() {
    const {navigate} = this.props.navigation;
    const {
      CompletedBookings,
      loading,
      isCancelShow,
      chaked,
      closingClients,
    } = this.state;
    return (
      <MainWrapperMatrial>
        {loading ? (
          <ActivityIndicator size={'large'} />
        ) : CompletedBookings && CompletedBookings.length > 0 ? (
          <this.renderScheduledServices navigate={navigate} />
        ) : (
          <Text style={{alignSelf: 'center', marginTop: 30}}>
            No data found
          </Text>
        )}
        <ModalColored
          isVisible={isCancelShow}
          title={'Why You cancel this booking?'}
          toggleModal={this.toggleSubservicesModal}
          content={
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 30,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'white',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <RadioButton
                  value="first"
                  status={chaked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({chaked: 'first'})}
                />
                <Text style={{color: 'white'}}>Stylist didn’t show up!</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 30,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'white',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <RadioButton
                  value="secound"
                  status={chaked === 'secound' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({chaked: 'secound'})}
                />
                <Text style={{color: 'white'}}>Changed my mind.</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 30,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'white',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <RadioButton
                  value="third"
                  status={chaked === 'third' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({chaked: 'third'})}
                />
                <Text style={{color: 'white'}}>Stylist is late!</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 30,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'white',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <RadioButton
                  value="third"
                  status={chaked === 'third' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({chaked: 'third'})}
                />
                <Text style={{color: 'white'}}>I want a different stylist</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 30,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'white',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <RadioButton
                  value="forth"
                  status={chaked === 'forth' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({chaked: 'forth'})}
                />
                <Text style={{color: 'white'}}>I don’t like the app</Text>
              </View>
              <TextInput
                placeholder="Tell us why (Optional)"
                onChangeText={text => this.setState({closingClients: text})}
                value={closingClients}
                multiline
                style={[
                  {
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 10,
                    color: 'white',
                    marginHorizontal: 30,
                    height: height(25),
                    textAlignVertical: 'top',
                    borderBottomColor: 'white',
                    marginTop: height(1),
                  },
                ]}
                // inputStyle={[{height: height(25), textAlignVertical: 'top',borderBottomColor:"white",marginTop:height(1)}]}
              />
              <ButtonColoredSmall
                text="Submit"
                buttonStyle={{
                  // alignSelf: 'flex-end',
                  marginHorizontal: width(5),
                  marginVertical: height(10),
                  alignItems: 'center',

                  // height: height(2),
                  flex: 1,
                }}
                tintColor={'white'}
                onPress={() => {this.handleCancelPress(this.state.currentIndex)}}
              />
            </ScrollView>
          }
        />
      </MainWrapperMatrial>
    );
  }
}

export default Awaiting;
