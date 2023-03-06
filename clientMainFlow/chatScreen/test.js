import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, CheckBox, FlatList,
  ActivityIndicator, ToastAndroid, ImageBackground, SafeAreaView
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import { GiftedChat, InputToolbar, Send, Actions, ActionsProps } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { Icon, colors } from 'react-native-elements';
import { width, height, totalSize } from 'react-native-dimension';
import { getData, addToArray, saveData } from '../../../backend/firebase/utility';
export default class ProposalOffer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      friendID: '',
      status: '',
      convinceText: '',
      percentageText: '',
      Imagedatasource: [],
      documentdatasource: [],
      downloadDocURL: [],
      item: '',
      loader: false,
      currentUserId: '',
      chatimg: '',
      chatdoc: '',
      chatdocname: '',
      finalData:''
    }
  }


  async componentDidMount() {
    this.props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: false
    });
    await AsyncStorage.getItem('Token').then((token) => {
      this.setState({ currentUserId: token, friendID:this.props.route.params.friendID }, async () => {
        this.getMessages() 
      })
    })
  }
  componentWillUnmount(){
    this.props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: true
    });
  }
  async getMessages() {
    let friendID = this.state.friendID
    let currentUserId = this.state.currentUserId
    let messages = await getData(
      'chats',
      this.state.currentUserId,
      friendID,
    );
    console.log(friendID, messages, this.state.currentUserId)
    if (messages) await this.setState({ messages: messages });
    else return 0;
    let that = this;


    firestore()
      .collection('chats')
      .doc(this.state.currentUserId)
      .onSnapshot(function (doc) {
        if(doc && doc.exists)
        that.setState({ messages: doc.data()[friendID].reverse() });
      });
  }

  async onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    messages[0].createdAt = Date.parse(messages[0].createdAt);
    await addToArray(
      'chats',
      this.state.currentUserId,
      this.state.friendID,
      messages[0],
    );
    messages[0].user._id = 2;
    await addToArray(
      'chats',
      this.state.friendID,
      this.state.currentUserId,
      messages[0],
    );
    messages[0].user._id = 1;

    await getData('Chatlist', this.state.currentUserId).then(async(data)=>{
      if(data)
      {
        let filterData = data.chats.filter((item)=>{return item.reciever !== this.state.friendID})
        console.log('\n\n\n\n\n\n',filterData)
          await saveData('Chatlist', this.state.currentUserId, {chats:filterData}).then(async()=>{
          await addToArray('Chatlist',this.state.currentUserId, 'chats', {message:messages[0].text, time:messages[0].createdAt, sender: this.state.currentUserId, reciever:this.state.friendID})
          })
      }
      else{
        console.log('\n\n\n\n','HERE')
        await addToArray('Chatlist',this.state.currentUserId, 'chats', {message:messages[0].text, time:messages[0].createdAt, sender: this.state.currentUserId, reciever:this.state.friendID})
      }
      
    })
    
    await getData('Chatlist', this.state.friendID).then(async(data)=>{
      if(data)
      {
        let filterData = data.chats.filter((item)=>{return item.reciever !== this.state.currentUserId})
            await saveData('Chatlist', this.state.friendID, {chats:filterData}).then(async()=>{
            await addToArray('Chatlist',this.state.friendID, 'chats', {message:messages[0].text, time:messages[0].createdAt, sender: this.state.friendID, reciever:this.state.currentUserId})
          })
        
      }
      else{
        console.log('\n\n\n\n','HERE')
        await addToArray('Chatlist',this.state.friendID, 'chats', {message:messages[0].text, time:messages[0].createdAt, sender: this.state.friendID, reciever:this.state.currentUserId})
      }
      
    })
    
  }
  render() {
    return (

      <SafeAreaView style={{flex:1}}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
            <GiftedChat
              messages={this.state.messages}
              // alwaysShowSend
              placeholder={'Type a message'}
              onSend={messages => this.onSend(messages)}
              // textInputStyle={styles.textMedium}
              user={{
                _id: 1,
              }}
            />
      </SafeAreaView >
    );
  }
}