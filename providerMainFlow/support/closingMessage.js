import React, { useState } from 'react';
import { View, Text, StatusBar,ActivityIndicator } from 'react-native';
import {
    MainWrapper,
    KeyboardAvoidingScrollView,
    TextInputBordered,
    ButtonColored,
    Spacer,
} from '../../../components';
import { height, totalSize } from 'react-native-dimension';
import { colors, sizes, ToastMessage } from '../../../themes';
import Header from '../../../components/header/header';
import { useDispatch, useSelector } from 'react-redux';
import { CMessage } from '../../../services/backend/user';
import { setUserDetail ,} from '../../../services/stores/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ClosingMessage = (props) => {
    const [closingClients, setClosingClients] = useState('');
    const [closingTasks, setClosingTasks] = useState('');
    const {navigate, goBack, replace} = props.navigation;
    const {userDetail} = useSelector(state => state.user);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const closemessage = () => {
        const data ={
          'user_id': userDetail?.id,
          'message': closingClients,
          'message_ongoing_task': closingTasks,
          
    
        };
    
        CMessage(data).then(response => {
          setLoader(true)
          // console.log("ye chala");
          if (response?.success) {
            setLoader(false)
            ToastMessage('Send successfully')
            goBack();
          }
          else{
            setLoader(false)
          }
        });
      };
    return (
        <MainWrapper>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={"transparent"}
            />
            <Header
                goBack={() => props.navigation.goBack()}
                heading={"Closing Message"}
                color={colors.appColor1}
            />
            <KeyboardAvoidingScrollView>
                <Spacer height={sizes.baseMargin} />
                <TextInputBordered
                    title="Edit your default closing statement to clients"
                    onChangeText={text => setClosingClients(text)}
                    value={closingClients}
                    multiline
                    titleStyle={{ color: "#000", fontSize: totalSize(1.7), paddingBottom: height(1.2) }}
                    inputStyle={[{ height: height(25), textAlignVertical: 'top' }]}
                />
                <Spacer height={sizes.doubleBaseMargin} />
                <TextInputBordered
                    title="Edit your default closing statement to clients for ongoing tasks"
                    onChangeText={text => setClosingTasks(text)}
                    value={closingTasks}
                    multiline
                    titleStyle={{ color: "#000", fontSize: totalSize(1.7), paddingBottom: height(1.2) }}
                    inputStyle={[{ height: height(25), textAlignVertical: 'top' }]}
                />
            </KeyboardAvoidingScrollView>
            <Spacer height={sizes.baseMargin} />
            {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
            <ButtonColored
                text="Save"
                buttonStyle={{ marginBottom: height(2) }}
                onPress={() => 
                    closingClients!=""&&
                    closingClients!=null&&
                    closingTasks!=""&&
                    closingTasks!=null
                    ?closemessage()
                    :ToastMessage('Please fill all feilds')}
            />)}
            <Spacer height={sizes.baseMargin} />
        </MainWrapper>
    );
}

export default ClosingMessage;
