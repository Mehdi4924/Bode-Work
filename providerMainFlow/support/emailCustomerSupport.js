import React, { Component ,useState} from 'react';
import { View, Text, TextInput, StatusBar ,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import { MainWrapper, Spacer, ComponentWrapper, LineHorizontal, RowWrapperBasic } from '../../../components';
import { sizes, colors, appIcons, ToastMessage } from '../../../themes';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import Header from '../../../components/header/header';
import {useSelector} from 'react-redux';
import { CustomeremailSuports } from '../../../services/backend/client';
import DocumentPicker from "react-native-document-picker"
const EmailCustomerSupport = (props) => {
  const space = sizes.baseMargin * 1.5;
  const [chatMessages, setChatMessages] = useState("");
  const [doc, setdoc] = useState("");
  // console.log("ye aya doc",doc);
  const {userDetail} = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  console.log("user detail",userDetail);
  const sendemail = () => {
    setLoader(true)
    const formdata = new FormData();
    formdata.append("user_id",userDetail?.id);
    formdata.append("message",chatMessages);
    {doc!=""?
    formdata.append("attachment[]",{
      uri: doc?.uri,
      type: doc?.type,
      name: doc?.name,
    }):null}

    console.log('form data', formdata);
    CustomeremailSuports(formdata).then(response => {
      console.log('customer reponse =====> ', response);
      if (response?.success==true) {
        setLoader(false)
        ToastMessage('Successfully email sent to support')
        props.navigation.goBack()
       
      }else{
        // ToastMessage(response.message);
        ToastMessage(' Email not sent to support')
        console.log("else chala");
        setLoader(false)
      }
    });
  };
  const selectDocument = async() => {
  try{
    const res = await DocumentPicker.pick({
         allowMultiSelection: true,
            type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    });
    setdoc(res[0])
    console.log(
      res,
      res.uri,
      res.type,
      res.name,
      res.size
    );
  } catch (err){
    if (DocumentPicker.isCancel(err)){

    }else{
      throw err;
    }
  }
    
  
  };
  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Email Customer Support"} 
        color={colors.appColor1} 
      />
      <Spacer height={sizes.smallMargin} />
      <ComponentWrapper 
        // animation="fadeInUp" 
        style={[{ borderWidth: 1, borderColor: colors.appColor1, padding: sizes.baseMargin, borderRadius: sizes.inputRadius }]}>
        <TextInput
          placeholder="Write a message"
          value={chatMessages}
          onChangeText={val => 
          setChatMessages(val)}
          style={{ height: height(25), textAlignVertical: 'top' }}
          multiline
        />
        <LineHorizontal />
        <Spacer height={sizes.baseMargin} />
        <RowWrapperBasic style={[{justifyContent: 'space-between'}]}>
         <TouchableOpacity onPress={()=>selectDocument()}>
         
         <Icon
            name="attach-file"
            type="material"
            color={colors.appColor1}
          />
         </TouchableOpacity>
          <TouchableOpacity onPress={()=>
          
          chatMessages!=''&&
          chatMessages!=null
         ? sendemail()
        :ToastMessage("Please write something")}
          >
            {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
         <Image
            source={appIcons.send}
            resizeMode="cover"
            style={{
              height: 25,
              width: 25,

            }}
          />)}
         </TouchableOpacity>
        </RowWrapperBasic>
      </ComponentWrapper>
    </MainWrapper>
  );
}

export default EmailCustomerSupport;
