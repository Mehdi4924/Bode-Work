import React, { Component, useState ,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  MainWrapperMatrial,
  MainWrapper,
  Wrapper,
  RowWrapper,
  TinyTitle,
  Spacer,
  BadgePrimary,
  MediumTitle,
  ChatCard,
} from '../../../components';
import { sizes, colors, appStyles, fontSize, appImages, fontFamily } from '../../../themes';
import { Badge } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { routes } from '../../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../../../backend/firebase/utility';
import firestore from '@react-native-firebase/firestore';
import Header from '../../../components/header/header';
import { ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from "moment";
import { usergetmessageData, sendmessageData ,showstylistBokingRequest,userstylesCurrentData} from '../../../services/backend/user';

const chats = [
  {
    Id: 0,
    profileImage: appImages.barber1,
    username: 'Ahmad',
    lastMessage: 'Lorem ipsum reik weye',
    time: "10:50 pm"
  },
  {
    Id: 1,
    profileImage: appImages.barber1,
    username: 'Ahmad',
    lastMessage: 'Lorem ipsum reik weye',
    time: "10:50 pm"
  },
  {
    Id: 1,
    profileImage: appImages.barber1,
    username: 'Ahmad',
    lastMessage: 'Lorem ipsum reik weye',
    time: "10:50 pm"
  },
  {
    Id: 1,
    profileImage: appImages.barber1,
    username: 'Ahmad',
    lastMessage: 'Lorem ipsum reik weye',
    time: "10:50 pm"
  },
  {
    Id: 1,
    profileImage: appImages.barber1,
    username: 'Ahmad',
    lastMessage: 'Lorem ipsum reik weye',
    time: "10:50 pm"
  },
  {
    Id: 1,
    profileImage: appImages.barber1,
    username: 'Ahmad',
    lastMessage: 'Lorem ipsum reik weye',
    time: "10:50 pm"
  },
  {
    Id: 1,
    profileImage: appImages.barber1,
    username: 'Ahmad',
    lastMessage: 'Lorem ipsum reik weye',
    time: "10:50 pm"
  },
  {
    Id: 1,
    profileImage: appImages.barber1,
    username: 'Ahmad',
    lastMessage: 'Lorem ipsum reik weye',
    time: "10:50 pm"
  },

]
const Chats = (props) => {
  const { userDetail } = useSelector(state => state.user);
    console.log("ye i user details", userDetail.id);
  const [Request, setRequest] = useState([]);
  const [Confirmed, setConfirmed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [dataSource, setDataSource] = useState('');
  const [CurrentDta, setCurrentDta] = useState('');
  console.log("dataSource",dataSource);
//   useEffect(() => {
//     getmessageData();
//     getUserData();
//     getUserData2();
// }, []);
useFocusEffect(
    React.useCallback(() => {
      getmessageData();
          getUserData();
          getUserData2();
    }, [])
);
const getmessageData = () => {
    setLoader(true)
    try {
        const data = {
            user_id: userDetail?.id
            // user_id: "6",
            // receiver_id: param?.rcvid

        };
        usergetmessageData(data).then(response => {
            console.log('chaaat 222 =====> ', JSON.stringify(response,null,2));
            if (response?.success) {
                console.log('chaaat =====> ', JSON.stringify(response.data, null, 2));
                setChatMessages(response?.data);
                setLoader(false)
            }
        });
    } catch (error) {
        ToastMessage(error.message);
        setLoader(false)
    }
};
const getUserData = async() => {
  try {
    const data = {
      stylist_id: userDetail?.id,
      // stylist_id: '5',
    };
    await showstylistBokingRequest(data).then(response => {
      // console.log('showstylistscheduleData data22 =====> ', response);
      if (response?.success) {
        console.log(
          ' showstylistscheduleData data =====> ',
          JSON.stringify(response.data, null, 2),
        );
        setDataSource(response?.data.length);
      
      } else {
        setDataSource("");
      }
    });
  } catch (error) {
    setLoader(false);
  }
};
const getUserData2 = () => {
  try {
    const data = {
      stylist_id: userDetail?.id,
      // stylist_id: '15',
    };
    console.log("curent fom data",data);
    userstylesCurrentData(data).then(response => {
    console.log('userstylesCurrentData2222 =====> ', response);
      if (response.success) {
        console.log('userstylesCurrentData =====> ', response);
        setCurrentDta(response?.data.length);
      
      }
    });
  } catch (error) {
    setLoader(false)
  }
};
  // async componentDidMount() {
  //   // this.focusListener = navigation.addListener('willFocus', async() => {
  //   const {navigate} = this.props.navigation;
  //   const {navigation} = this.props;
  //   this.GetData();
  //   this.props.navigation.addListener('focus', async () => {
  //     this.GetData();
  //   });

  //   let token = await AsyncStorage.getItem('Token');
  //   await firestore()
  //     .collection('Bookings')
  //     .doc(token)
  //     .onSnapshot(async () => {
  //       this.GetData();
  //     });
  // }

  // GetData = async () => {
  //   const {navigate} = this.props.navigation;
  //   const {navigation} = this.props;
  //   await AsyncStorage.getItem('Token').then(async data => {
  //     if (data) {
  //       console.log(data);
  //       this.setState({token: data});
  //       //  alert("call")
  //       let Bookings = await getData('Bookings', data);
  //       let chats = await getData('chats', data);
  //       console.log(Object.keys(chats));
  //       let allChatIds = Object.keys(chats);
  //       let allChatValues = Object.values(chats);
  //       let ChatsUsers = [];
  //       await allChatIds.map(async (key, index) => {
  //         let temp = await getData('Provider', key);
  //         if (temp) {
  //           let allmessegs = allChatValues[index];
  //           console.log(allmessegs);
  //           temp.lastMessage = allmessegs[allmessegs.length - 1].message;
  //           ChatsUsers.push(temp);
  //           console.log(ChatsUsers);
  //           this.setState({chats: ChatsUsers});
  //         }
  //       });

  //       // await allChatIds.forEach(async(element) => {
  //       //   let temp= await getData("Users",element);
  //       //   if(temp){
  //       //     let messegs= chats.element[chats.element.length-1].message;
  //       //     temp.lastMessage=messegs;
  //       //     ChatsUsers.push(temp);
  //       //   }
  //       // });
  //       this.setState({
  //         // chats: ChatsUsers,
  //         Request: Bookings.Request ? Bookings.Request : [],
  //         Confirmed: Bookings.Confirmed ? Bookings.Confirmed : [],
  //         isLoading: false,
  //       });

  //       // await saveData("notifications",data,{notifications:this.state.notifications}).then(()=>{
  //       //   this.setState({notifications:[],isLoading:false})
  //       // })
  //     }
  //   });
  // };

  const RenderNotifications = () => {
    return (
      <View style={{ marginTop: totalSize(2) }}>
        <FlatList
          data={chatMessages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <ChatCard
                image={item?.user?.profile!=null?item?.user?.profile:appImages.barber1}
                name={item?.user?.first_name!=null?item?.user?.first_name:"Ahmad"}
                lastMessage={item?.message}
                time={moment(item?.user?.created_at).format('HH:mm a')!=null?moment(item?.user?.created_at).format('HH:mm a'):"09:00pm"}
                onPress={() => {
                  let newItem = {
                    UserId: item?.receiver?.id,
                    // providerId: this.state.token,
                    name: item?.user?.first_name!=null?item?.user?.first_name:"Ahmad",
                    // name:"Ahmad"
                  };
                  props.navigation.navigate(routes.provider.chatScreen, {
                    item: newItem,
                    index,
                  });
                }}
              />
            );
          }}
        />
      </View>
    );
  };
  // <View>
  //   {chats.length > 0 ? (
  //     <FlatList
  //       data={chats}
  //       showsVerticalScrollIndicator={false}
  //       renderItem={({item, index}) => {
  //         return (
  //           <ChatCard
  //             image={item.profileImage}
  //             name={item.username}
  //             lastMessage={item.lastMessage}
  //             time={item.time}
  //             onPress={() => {
  //               let newItem = {
  //                 UserId: item.Id,
  //                 // providerId: this.state.token,
  //                 name: item.username,
  //               };
  //               props.navigation.navigate(routes.provider.chatScreen, {
  //                 item: newItem,
  //                 index,
  //               });
  //             }}
  //           />
  //         );
  //       }}
  //     />
  //   ) : (
  //     <View
  //       style={{
  //         marginVertical: '40%',
  //         alignItems: 'center',
  //         width: '100%',
  //       }}>
  //       <Text>No Chats</Text>
  //     </View>
  //   )}
  // </View>



  return (
    <MainWrapperMatrial>
      <Header
        goBack={() => props.navigation.goBack()}
        heading={"Messages"}
        color={colors.appColor1}
      />
      
        <MainWrapper
          // animation="fadeInDown"
          style={{
            backgroundColor: colors.snow,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            elevation: 2,
          }}>
            <ScrollView  showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View
              style={{
                marginVertical: '50%',
                alignItems: 'center',
                width: '100%',
              }}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <>
              <Wrapper flex={0.8}>


                <RowWrapper style={{ flex: 1 }}>

                  <Wrapper flex={0.5} style={styles.topButtons}>
                    <TouchableOpacity style={{}}
                      onPress={() => props.navigation.navigate(routes.provider.bookingRequests)}>
                      <TinyTitle style={styles.topButtonsText}>
                        Booking{'\n'}Requests
                      </TinyTitle>
                      <Spacer height={sizes.baseMargin} />
                      <View style={{height:height(4),width:width(8),justifyContent:'center',alignItems:'center',backgroundColor:'red',borderRadius:50,alignSelf:'flex-end'}}>
                        <Text style={{color:colors.snow,fontSize:18,fontFamily:fontFamily.appTextRegular}}>{dataSource}</Text>
                      </View>
                      {/* <BadgePrimary
                        // value={Request.length}
                        value={99}
                        containerStyle={{ alignSelf: 'flex-end' }}
                        textSize={fontSize.medium}
                        textStyle={{paddingHorizontal:1}}
                      /> */}
                    </TouchableOpacity>
                  </Wrapper>
                  <Spacer width={sizes.baseMargin} />
                  <Wrapper flex={0.5} style={styles.topButtons}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate(routes.provider.styles)}>
                      <TinyTitle style={styles.topButtonsText}>
                        Confirmed{'\n'}Bookings
                      </TinyTitle>
                      <Spacer height={sizes.baseMargin} />
                      <View style={{height:height(4),width:width(8),justifyContent:'center',alignItems:'center',backgroundColor:'red',borderRadius:50,alignSelf:'flex-end'}}>
                        <Text style={{color:colors.snow,fontSize:18,fontFamily:fontFamily.appTextRegular}}>{CurrentDta}</Text>
                      </View>
                      {/* <BadgePrimary
                        // value={Confirmed.length}
                        value={99}
                        containerStyle={{ alignSelf: 'flex-end' }}
                        textSize={fontSize.medium}
                        textStyle={{paddingHorizontal:1}}
                      /> */}
                    </TouchableOpacity>
                  </Wrapper>
                </RowWrapper>
              </Wrapper>

              {isLoading ? (
                <View
                  style={{
                    marginVertical: '50%',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <ActivityIndicator size={'large'} />
                </View>
              ) : chatMessages?.length > 0 ? (
                <RenderNotifications />
              ) : (
                <View
                  style={{
                    marginVertical: '75%',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text>No Chats</Text>
                </View>
              )}

            </>
          )}
</ScrollView>
        </MainWrapper>
      
    </MainWrapperMatrial>
  );
}


export default Chats;

const styles = StyleSheet.create({
  topButtons: {
    borderRadius: sizes.buttonRadius,
    paddingHorizontal:width(2.5),
    paddingVertical:height(2),
    backgroundColor: colors.appColor1,
  },
  topButtonsText: {
    ...appStyles.textWhite,
  },
});
