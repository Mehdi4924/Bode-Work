import React, {Component, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native';
import {
  Wrapper,
  MainWrapper,
  ChatBubbule,
  TextInputBordered,
  TextInputChat,
  MediumTitle,
  RegularText,
  AbsoluteWrapper,
  Spacer,
} from '../../../components';
import ToastMessage, {appIcons, fontFamily} from '../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {height, width, totalSize} from 'react-native-dimension';
import {colors, sizes} from '../../../themes';
import {addToArray, getData} from '../../../backend/firebase/utility';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';

import {
  usergetmessage,
  sendmessageData,
  stylesDateData,
} from '../../../services/backend/user';
const chatMessages = [
  {
    id: 56,
    message: 'Hello',
    time: '10:50 pm',
    user: {
      id: 2,
    },
  },
  {
    id: 67,
    message: 'Hello',
    time: '10:51 pm',
    user: {
      id: 1,
    },
  },
  {
    id: 89,
    message: 'How are you?',
    time: '10:55 pm',
    user: {
      id: 2,
    },
  },
  {
    id: 15,
    message: "I'm good, how are you?",
    time: '10:57 pm',
    user: {
      id: 1,
    },
  },
  {
    id: 45,
    message: 'When you will be available?',
    time: '10:59 pm',
    user: {
      id: 1,
    },
  },
];
const ChatScreen = props => {
  const param = props.route.params;
  console.log('ye aya param', param);
  const { userDetail } = useSelector(state => state.user);
  console.log("userDetail",userDetail.id);
  const [myId, setMyId] = useState('');
  const [newText, setnewText] = useState('');
  const [friend, setfriend] = useState({});
  const [friendID, setfriendID] = useState('');
  const [currentUserId, setcurrentUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [message, setmessage] = useState('');
  const [time, settime] = useState('');
  console.log("time",time);
  const [loader, setLoader] = useState(false);
  const [chatMessages, setChatMessages] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    getmessageData();
  }, []);
  // useFocusEffect(
  //     React.useCallback(() => {
  //         getmessageData();
  //     }, [])
  // );
  const getmessageData = () => {
    setLoader(true);
    try {
      const data = {
        user_id: userDetail?.id,
        // user_id: '5',
        receiver_id: param?.item.UserId,
        // receiver_id: '2',
      };
      usergetmessage(data).then(response => {
        console.log('show all message =====> ', JSON.stringify(response,null,2));
        if (response?.success) {
          console.log(
            'DATAprofile =====> ',
            JSON.stringify(response?.data[data-1]?.time_ago, null, 2),
          );
          setChatMessages(response?.data);
          setMyId(response?.data?.user_id);
        //   settime(response?.data[data.length-1]?.time_ago);
          setLoader(false);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
      setLoader(false);
    }
  };
  const sendmessage = () => {
    // setLoader(true)
    try {
      const data = {
        user_id: userDetail?.id,
        // user_id: '5',
        receiver_id:param?.item?.UserId,
        // receiver_id: '2',
        message: message,
      };
      sendmessageData(data).then(response => {
        console.log('send =====> ', response);
        if (response?.success) {
          console.log('send22 =====> ', response.data);
          setmessage('');
          //   setChatMessages(response?.data);
          //   setLoader(false)
          setChatMessages(prev => {
            return [...prev, response.data];
          });
        }
      });
    } catch (error) {
      ToastMessage(error.message);
      //   setLoader(false)
    }
  };

  // async componentDidMount() {
  //   const {item} = this.props.route.params;
  //   console.log('user item = ', item);
  //   this.setState({friend: item});
  //   await AsyncStorage.getItem('Token').then(token => {
  //     this.setState({currentUserId: token, friendID: item.UserId}, async () => {
  //       this.getMessages();
  //     });
  //   });
  // }

  // async getMessages() {
  //   let friendID = this.state.friendID;
  //   let currentUserId = this.state.currentUserId;
  //   let messages = await getData('chats', currentUserId, friendID);
  //   console.log(friendID, messages, this.state.currentUserId);
  //   if (messages) await this.setState({chatMessages: messages});
  //   else return 0;
  //   let that = this;

  //   firestore()
  //     .collection('chats')
  //     .doc(this.state.currentUserId)
  //     .onSnapshot(function(doc) {
  //       if (doc && doc.exists)
  //         that.setState({chatMessages: doc.data()[friendID]});
  //     });
  // }
  // async onSend() {
  //   let newMessage = {
  //     message: this.state.newText,
  //     time: '',
  //     user: {
  //       id: 2,
  //     },
  //   };

  //   if(this.state.currentUserId === this.state.friendID){
  //     newMessage.time = moment().format('HH:mm a');
  //     newMessage.user._id = 2;
  //     await addToArray(
  //       'chats',
  //       this.state.currentUserId,
  //       this.state.friendID,
  //       newMessage,
  //     );
  //     newMessage.user.id = 1;
  //     await addToArray(
  //       'chats',
  //       this.state.friendID,
  //       this.state.currentUserId,
  //       newMessage,
  //     );
  //     newMessage.user.id = 1;
  //     let oldList = this.state.chatMessages;
  //     // let NewList= [newMessage].concat(oldList);
  //     let NewList = [...oldList, newMessage];
  //     this.setState({chatMessages: NewList, newText: ''});
  //   }else{

  //   newMessage.time = moment().format('HH:mm a');
  //   newMessage.user._id = 2;
  //   await addToArray(
  //     'chats',
  //     this.state.currentUserId,
  //     this.state.friendID,
  //     newMessage,
  //   );
  //   newMessage.user._id = 1;
  //   await addToArray(
  //     'chats',
  //     this.state.friendID,
  //     this.state.currentUserId,
  //     newMessage,
  //   );
  //   newMessage.user._id = 2;
  //   let oldList = this.state.chatMessages;
  //   // let NewList= [newMessage].concat(oldList);
  //   let NewList = [...oldList, newMessage];
  //   this.setState({chatMessages: NewList, newText: ''});
  //   }
  // }
  const RenderChatComponent = () => {
    return (
      <MainWrapper>
        <FlatList
          data={chatMessages}
          renderItem={({item, index}) => {
            return (
              <ChatBubbule
                message={item.message}
                time={item.time}
                // myMessage={item.user.id === myId}
              />
            );
          }}
        />
      </MainWrapper>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS == 'ios' ? height(20) : 0}
      enabled={Platform.OS === 'ios' ? true : false}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <MainWrapper>
        <Wrapper
          // animation="fadeInDown"
          style={{
            flexDirection: 'row',
            paddingVertical: height(2),
            paddingHorizontal: width(5),
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{justifyContent: 'center'}}>
            <Ionicons
              name="chevron-back"
              size={totalSize(3)}
              color={colors.appColor1}
            />
          </TouchableOpacity>
          <View style={{justifyContent: 'center', marginLeft: width(4)}}>
            <View
              style={{height: height(6), width: height(6), borderRadius: 100}}>
              <Image
                source={require('../../../assets/images/liveChat.png')}
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              />
            </View>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', marginLeft: width(2.6)}}>
            <MediumTitle style={{color: '#000'}}>{param?.item?.name}</MediumTitle>
            <RegularText style={{color: '#ccc'}}>
              Last seen {time!=null?time:"1mint ago"}
              {/* Last seen {chatMessages?.sender?.last_seen} */}
            </RegularText>
          </View>
        </Wrapper>
        {/* {console.log(flatListRef)} */}
        {loader?
        <View
        style={{
          // marginVertical: '50%',
          // alignItems: 'center',
          height:"100%",
          width: '100%',
        }}>
        <ActivityIndicator size={'large'} color={colors.appColor1}/>
      </View>
      :
        <FlatList
          data={chatMessages}
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
          style={{marginTop: height(2)}}
          renderItem={({item, index}) => {
            console.log(
              'find ',
              chatMessages[chatMessages.length - 1].time_ago,
            );
            settime(chatMessages[chatMessages.length - 1].time_ago)
            if (item.user_id == param?.item.UserId) {
              return (
                <ChatBubbule
                  key={index}
                  message={item.message}
                  time={
                    moment(item?.created_at).format('h:mm a') != null
                      ? moment(item?.created_at).format('h:mm a')
                      : '09:00pm'
                  }
                  
                //   myMessage={false}
                />
              );
            } else {
              return (
                <ChatBubbule
                  key={index}
                  message={item.message}
                  time={
                    moment(item?.created_at).format('h:mm a') != null
                      ? moment(item?.created_at).format('h:mm a')
                      : '09:00pm'
                  }
                  myMessage={true}
                />
              );
            }
          }}
        />
        }
        <View style={{position: 'relative', marginTop: totalSize(3)}}>
          <TextInputBordered
            placeholder={'Write a message'}
            value={message}
            onChangeText={val => {
              setmessage(val);
            }}
            placeholderTextColor={'#21212180'}
            inputStyle={{color: 'grey', fontFamily: fontFamily.appTextRegular}}
          />
          <AbsoluteWrapper style={{right: totalSize(4), top: totalSize(1.6)}}>
            <TouchableOpacity onPress={() => sendmessage()}>
              <Image
                source={appIcons.send}
                resizeMode="cover"
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </TouchableOpacity>
          </AbsoluteWrapper>
        </View>
        <Spacer height={sizes.smallMargin} />
        {/* <TextInputChat
                    onChangeText={text => { }}
                    onSend={() => { }}
                /> */}
      </MainWrapper>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
