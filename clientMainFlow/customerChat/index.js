import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity, View } from 'react-native';
import { MainWrapper, ChatBubbule, TextInputChat, Wrapper, MediumText, MediumTitle, SmallText, RegularText } from '../../../components';
import { FlatList } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import { colors } from '../../../themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { routes } from '../../../services';

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
    {
        id: 45,
        message: "When you will be available?",
        time: '10:59 pm',
        user: {
            id: 1,
        }
    },
];

const CustomerChat = (props) => {
    const [myId, setMyId] = useState(1);
    const [chatMessages, setChatMessages] = useState(chatArray);

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
                    style={{flexDirection:'row',paddingVertical:height(2),paddingHorizontal:width(5),marginTop:totalSize(1)}}
                >
                    <TouchableOpacity 
                        onPress={() => props.navigation.goBack()}
                        style={{justifyContent:'center'}}>
                        <FontAwesome
                            name='angle-left'
                            size={totalSize(4)}
                            color={colors.appColor1}
                        />
                    </TouchableOpacity>
                    <View style={{justifyContent:'center',marginLeft:width(6)}}>
                        <View style={{height:height(6),width:height(6),borderRadius:100}}>
                            <Image 
                                source={require('../../../assets/images/liveChat.png')}
                                style={{height:"100%",width:"100%",resizeMode:'cover'}}
                            />
                        </View>
                    </View>
                    <View style={{flex:1,justifyContent:'center',marginLeft:width(4)}}>
                        <MediumTitle style={{color:"#000"}}>John Doe</MediumTitle>
                        <RegularText style={{color:"#ccc"}}>Last seen 1h ago</RegularText>
                    </View>
                </Wrapper>
                <FlatList
                    data={chatMessages}
                    style={{marginTop:height(2)}}
                    renderItem={({ item, index }) => {
                        return (
                            <ChatBubbule
                                key={index}
                                message={item.message}
                                time={item.time}
                                myMessage={item.user.id === myId}
                            />
                        )
                    }}
                />
                <TextInputChat
                    onChangeText={text => { }}
                    onSend={() => { }}
                />
            </MainWrapper>
        </KeyboardAvoidingView>
    );
}

export default CustomerChat;
