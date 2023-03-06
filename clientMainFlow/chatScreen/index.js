import React, { useState, useEffect ,useRef} from 'react';
import { Image, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity, View,ActivityIndicator } from 'react-native';
import { MainWrapper, ChatBubbule, TextInputChat, Wrapper, MediumText, MediumTitle, SmallText, RegularText, SmallTitle, TextInputBordered, AbsoluteWrapper, Spacer } from '../../../components';
import { FlatList } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { appIcons, colors, fontFamily, ToastMessage ,sizes} from '../../../themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { routes } from '../../../services';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { usergetmessage, sendmessageData } from '../../../services/backend/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
const chatArray = [
    {
        id: 56,
        message: 'Hello',
        time: '10:50 pm',
        user: {
            id: 2,
        }
    },
    {
        id: 67,
        message: 'Hello',
        time: '10:51 pm',
        user: {
            id: 1,
        }
    },
    {
        id: 89,
        message: 'How are you?',
        time: '10:55 pm',
        user: {
            id: 2,
        }
    },
    {
        id: 15,
        message: "I'm good, how are you?",
        time: '10:57 pm',
        user: {
            id: 1,
        }
    },
];


const ChatScreen = (props) => {
    const { userDetail } = useSelector(state => state.user);
    console.log("ye i user details", userDetail.id);
    const param = props.route.params
    console.log("ye aya param", param);
    const [myId, setMyId] = useState("");
    const [loader, setLoader] = useState(false);
    const [message, setmessage] = useState('');
    const [time, settime] = useState('');
    console.log("ttttttt",time);
    const [dataSource, setDataSource] = useState({});
    const [chatMessages, setChatMessages] = useState("");
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
        setLoader(true)
        try {
            const data = {
                user_id: userDetail?.id,
                // user_id: "6",
                receiver_id: param?.rcvid

            };
            usergetmessage(data).then(response => {
                // console.log('DATAprofile =====> ', response);
                if (response?.success) {
                    console.log('DATAprofile =====> ', JSON.stringify(response.data, null, 2));
                    setChatMessages(response?.data);
                    setMyId(response?.data?.user_id)
                     settime(response?.data?.time_ago)
                    setLoader(false)
                }
            });
        } catch (error) {
            ToastMessage(error.message);
            setLoader(false)
        }
    };
    const sendmessage = () => {
        // setLoader(true)
        try {
            const data = {
                user_id: userDetail?.id,
                // user_id: "7",
                receiver_id:param.rcvid,
                // receiver_id: '6',
                message: message,

            };
            sendmessageData(data).then(response => {
                console.log('send =====> ', response);
                if (response?.success) {
                    console.log('send22 =====> ', response.data);
                    setmessage("")
                    //   setChatMessages(response?.data);
                    //   setLoader(false)
                    setChatMessages(prev => {
                        return [...prev, response.data]
                    })
                }
            });
        } catch (error) {
            ToastMessage(error.message);
            //   setLoader(false)
        }
    };
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "padding" : "padding"}
            keyboardVerticalOffset={Platform.OS == "ios" ? height(20) : 0}
            enabled={Platform.OS === "ios" ? true : false}
        >
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={"transparent"}
            />
            <MainWrapper>
                <Wrapper
                    // animation="fadeInDown" 
                    style={{ flexDirection: 'row', paddingVertical: height(2), paddingHorizontal: width(5), marginTop: totalSize(0) }}
                >
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={{ justifyContent: 'center' }}>
                        <FontAwesome
                            name='angle-left'
                            size={totalSize(4)}
                            color={colors.appColor1}
                        />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', marginLeft: width(6) }}>
                        <View style={{ height: height(5), width: height(5), borderRadius: 100 }}>
                            <Image
                                source={require('../../../assets/images/liveChat.png')}
                                style={{ height: "100%", width: "100%", resizeMode: 'cover' }}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', marginLeft: width(4) }}>
                        <SmallTitle style={{ color: "#000" }}>{param?.firstname}{" "}{param?.lastname}</SmallTitle>
                        <RegularText style={{ color: "#ccc" }}>
                        Last seen {time!=null?time:"1mint ago"}
                            {/* Last seen 1h ago */}
                            </RegularText>
                    </View>
                </Wrapper>
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
                    style={{ marginTop: height(2) }}
                    renderItem={({ item, index }) => {
                        settime(chatMessages[chatMessages.length - 1].time_ago)
                        if (item.user_id == param?.rcvid) {
                            return (
                                <ChatBubbule
                                    key={index}
                                    message={item.message}
                                    time={moment(item?.created_at).format('h:mm a')!=null?moment(item?.created_at).format('h:mm a'):"09:00pm"}
                                />
                            )
                        } else {
                            return (
                                <ChatBubbule
                                    key={index}
                                    message={item.message}
                                    time={moment(item?.created_at).format('h:mm a')!=null?moment(item?.created_at).format('h:mm a'):"09:00pm"}
                                    myMessage={item.message}
                                />
                            )
                        }
                    }}
                />}
                <View style={{ position: 'relative', marginTop: totalSize(3) }}>
                    <TextInputBordered
                        placeholder={'Write a message'}
                        value={message}
                        onChangeText={val => {
                            setmessage(val);
                        }}

                        placeholderTextColor={'#21212180'}
                        inputStyle={{ color: "grey", fontFamily: fontFamily.appTextRegular }}
                    />
                    <AbsoluteWrapper style={{ right: totalSize(4), top: totalSize(1.6) }}>
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
}

export default ChatScreen;
