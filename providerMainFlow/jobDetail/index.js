import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  MainWrapper,
  Spacer,
  ButtonColored,
  Wrapper,
  SmallText,
  MediumText,
  RegularText,
  SmallTitle,
  MediumTitle,
  HomeScheduleCard,
  CustomIcon,
} from '../../../components';
import {sizes, colors, appImages, appIcons, fontFamily} from '../../../themes';
import {height, totalSize, width} from 'react-native-dimension';
import Header from '../../../components/header/header';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {
  jobStartData,
  endJobData,
  acceptbookingData,
} from '../../../services/backend/user';
import {routes} from '../../../services';
const customStyle = [
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
const monthDays = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const JobDetail = props => {
  const param = props.route.params.data;
  console.log('param', JSON.stringify(param, null, 2));
  const {latitude, longitude, address} = useSelector(state => state.user);
  const [status, setStatus] = useState('Pending');
  const [loader, setLoader] = useState(false);
  const [statusstartjob, setStatusStartJob] = useState('');
  const startJob = () => {
    setLoader(true);
    try {
      const data = {
        user_id: param?.user_id,
        booking_id: param?.id,
      };
      jobStartData(data).then(response => {
        console.log(
          'jobStartData data22 =====> ',
          JSON.stringify(response, null, 2),
        );
        if (response?.success == true) {
          setStatus(response?.data?.status);
          setLoader(false);
        } else {
          setStatus('Pending');
          setLoader(false);
        }
      });
    } catch (error) {
      console.log('ye chaal');
      ToastMessage(error.message);
    }
  };
  const endJob = () => {
    setLoader(true);
    try {
      const data = {
        user_id: param?.user_id,
        booking_id: param?.id,
      };
      endJobData(data).then(response => {
        console.log('endJob data22 =====> ', JSON.stringify(response, null, 2));
        if (response?.success == true) {
          setStatus(response?.data?.status);
          setLoader(false);
        } else {
          setStatus('in-progress');
          setLoader(false);
        }
      });
    } catch (error) {
      console.log('ye chaal');
      ToastMessage(error.message);
    }
  };
  const d = new Date(param?.date);
  const a = monthDays[d.getUTCMonth()];
  const b = days[d.getUTCDay()];
  const e = (d.getDate());
  return (
    <MainWrapper>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Header
        goBack={() => props.navigation.goBack()}
        heading={'Job Details'}
        color={colors.appColor1}
      />
      <View
        style={{
          backgroundColor:
            status === 'Pending'
              ? '#00827F'
              : status === 'complete'
              ? '#00BF13'
              : '#0CC4BC',
          paddingVertical: height(0.8),
        }}>
        {status == 'Pending' ? (
          <RegularText style={{color: '#FFF', textAlign: 'center'}}>
            {status}
          </RegularText>
        ) : status === 'in-progress' ? (
          <RegularText style={{color: '#FFF', textAlign: 'center'}}>
            In Progress
          </RegularText>
        ) : (
          <RegularText style={{color: '#FFF', textAlign: 'center'}}>
            Completed
          </RegularText>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper
        //  animation="fadeInDown"
        >
          <MapView
            provider={PROVIDER_GOOGLE}
            customMapStyle={customStyle}
            region={{
              latitude: latitude && latitude != null ? latitude : 31.5522984,
              longitude:
                longitude && longitude != null ? longitude : 74.3470166,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{height: height(35), borderRadius: 15, overflow: 'hidden'}}>
            <Marker
              coordinate={{
                latitude: parseFloat(
                  latitude && latitude != null ? latitude : 31.5522984,
                ),
                longitude: parseFloat(
                  longitude && longitude != null ? longitude : 74.3470166,
                ),
              }}>
              <CustomIcon icon={appIcons.mapMarker} size={totalSize(6)} />
            </Marker>
          </MapView>
        </Wrapper>
        <Wrapper
        // animation="fadeInDown"
        >
          <View
            style={{paddingVertical: height(1), paddingHorizontal: width(5)}}>
            {/* <MediumTitle style={{textAlign:"center"}}>Go to the clients location {"\n"}to start this job</MediumTitle> */}
          </View>
        </Wrapper>
        <HomeScheduleCard
          buttonViewStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: width(10),
          }}
          containerStyle={{marginHorizontal: totalSize(3)}}
          bgimage={
            param?.service?.primary_image != null
              ? param?.service?.primary_image
              : appImages.barber1
          }
          image={
            param?.user?.profile_image != null
              ? param?.user?.profile_image
              : appImages.barber1
          }
          name={
            param?.user?.first_name != null ? param?.user?.first_name : 'N/A'
          }
          serviceName={
            param?.service?.name != null ? param?.service?.name : 'Hair Style'
          }
          price={param?.price != null ? param?.price : '50'}
          rating={param?.rating != null ? param?.rating : '5.0'}
          location={
            param?.user?.location != null ? param?.user?.location : 'N/A'
          }
          date={`${b}, ${a} ${e}, ${d.getFullYear()}`}
          time={param?.start_timeslot}
          chatPress={() => {
            let newItem = {
              UserId: param?.user_id,
              // providerId: this.state.token,
              name:param?.user?.first_name!=null?param?.user?.first_name:"Ahmad"
              // name:"Ahmad"
            };
            props.navigation.navigate(routes.provider.chatScreen, {
              item: newItem,
              
            });
          }}
          //   onPress={() =>  navigate(routes.provider.jobDetail)}
        />
        {/* <Wrapper
          // animation="fadeInDown"
          style={{
            backgroundColor: '#FFF',
            marginHorizontal: totalSize(3),
            marginBottom: totalSize(3),
            borderRadius: 20,
            padding: totalSize(2),
            shadowColor: '#000',
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
              borderBottomColor: '#00000029',
              borderBottomWidth: 1,
              paddingBottom: totalSize(1),
            }}>
            <View>
              <Image
                source={appImages.imageOne}
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
              <SmallTitle style={{color: '#000'}}>Jane Doe</SmallTitle>
              <Text>
                <Ionicons name="star" size={totalSize(1.5)} color="#C9A858" />
                <SmallText style={{color: '#000000'}}> (4.9)</SmallText>
              </Text>
            </View>
            <View
              style={{justifyContent: 'flex-start', marginLeft: totalSize(3)}}>
              <ButtonColored
                text="Hair Cut"
                buttonStyle={{
                  marginHorizontal: 0,
                  paddingHorizontal: width(5),
                  borderRadius: 100,
                  height: height(5),
                }}
                // onPress={() => }
              />
              <MediumTitle
                style={{
                  color: '#000000',
                  marginTop: height(2),
                  textAlign: 'right',
                }}>
                $40
              </MediumTitle>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: totalSize(1.4)}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <SmallText style={{color: '#7F7F7F'}}>Time Slot</SmallText>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <SmallText style={{color: '#000000'}}>
                12:00 pm - 02:00 pm
              </SmallText>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: totalSize(1.4)}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <SmallText style={{color: '#7F7F7F'}}>Date</SmallText>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <SmallText style={{color: '#000000'}}>29th July, 2020</SmallText>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: totalSize(1.4)}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <SmallText style={{color: '#7F7F7F'}}>Location</SmallText>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <SmallText style={{color: '#000000'}}>
                17 Johnson Ave, NYC
              </SmallText>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: totalSize(1.4)}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <SmallText style={{color: '#7F7F7F'}}>Distance</SmallText>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <SmallText style={{color: '#000000'}}>6 miles away</SmallText>
            </View>
          </View>
        </Wrapper> */}
        {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
          <ButtonColored
            text={
              status === 'Pending'
                ? 'Start Job'
                : status === 'in-progress'
                ? 'End Job'
                : 'Post a Review'
            }
            textStyle={{fontFamily:fontFamily.appTextRegular}}
            onPress={() => {
              status === 'Pending'
                ? startJob()
                : //   ? setStatus('In Progress')
                status === 'in-progress'
                ? endJob()
                : //   ? setStatus('Completed')
                  props.navigation.navigate(routes.provider.postReview, {
                    data: param,
                  });
            }}
            buttonStyle={{marginBottom: totalSize(3)}}
          />
        )}
        {status === 'complete' && (
          <ButtonColored
            text={'Report'}
            textStyle={{fontFamily:fontFamily.appTextRegular}}
            buttonStyle={{
              backgroundColor: '#C40707',
              marginBottom: totalSize(3),
            }}
          />
        )}
      </ScrollView>
    </MainWrapper>
  );
};

export default JobDetail;
