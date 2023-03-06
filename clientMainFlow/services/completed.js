import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {
  MainWrapper,
  ClientServiceCard,
  MainWrapperMatrial,
} from '../../../components';
import {appImages, sizes} from '../../../themes';
import {routes} from '../../../services';
import moment from 'moment';
import {getAllOfCollection} from '../../../backend/firebase/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
class Completed extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  // async componentDidMount() {
  //   await firestore()
  //     .collection('Bookings')
  //     .onSnapshot(async () => {
  //       this.GetUserData();
  //     });
  // }
  // GetUserData = async () => {
  //   let token = await AsyncStorage.getItem('Token');
  //   let today = moment().format('YYYY-MM-DD');
  //   let CompletedBookings = await getAllOfCollection('Bookings');
  //   let confirmedBookings = [];
  //   for (let i = 0; i < CompletedBookings.length; i++) {
  //     if( CompletedBookings[i].Completed !== undefined){
  //     for (let j = 0; j < CompletedBookings[i].Completed.length; j++) {
  //       if (token == CompletedBookings[i].Completed[j].UserId) {
          
  //         console.log("Confirmed Call");
  //         // if (CompletedBookings[i].Completed[j].status==="Completed") {
  //           confirmedBookings.push(CompletedBookings[i].Completed[j]);
  //         // }
  //       }
  //     }
  //   }
  //   }
  //   this.setState({CompletedBookings: confirmedBookings, loading: false});
  // };

  renderScheduledServices = ({navigate}) => {
    const {scheduledServices, CompletedBookings} = this.state;
    return (
      <FlatList
        data={scheduledServices}
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
              StartTime={item.jobStartTime !== undefined ? item.jobStartTime : moment().format("DD/MM/YYYY hh:mm a")}
              CompleteTime={item.jobCompleteTime !== undefined ? item.jobCompleteTime : moment().format("DD/MM/YYYY hh:mm a")}
              FinalCost={"$"+item.Price}
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
              isCompleted={"Completed"}
              isServiceCompleted={true}
              // onPressReview={() =>
              //   navigate(routes.provider.postReview, {item: item})
              // }
            />
          );
        }}
      />
    );
  };
  render() {
    const {navigate} = this.props.navigation;
    const {CompletedBookings, loading} = this.state;
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
      </MainWrapperMatrial>
    );
  }
}

export default Completed;
