import React, { Component ,useState} from 'react';
import { View, Text, TextInput, StatusBar, Touchable, TouchableOpacity ,Image, ImageBackground,ActivityIndicator} from 'react-native';
import { MainWrapper, Spacer, ComponentWrapper, LineHorizontal, RowWrapperBasic, SmallTitle, RegularText, ButtonColoredSmall, ButtonColored, AbsoluteWrapper } from '../../../components';
import { sizes, colors, fontFamily, ToastMessage } from '../../../themes';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import Header from '../../../components/header/header';
import Feather from 'react-native-vector-icons/Feather';
import { routes } from '../../../services';
import DocumentPicker from "react-native-document-picker"
import {useSelector} from 'react-redux';
import { UploadIdentity } from '../../../services/backend/user';
// const{navigate} = props.navigation; 
const IdentityProof = (props) => {
  const [doc, setdoc] = useState("");
  const [loader, setLoader] = useState(false);
  console.log(">>>>>>",doc);
  const {userDetail} = useSelector(state => state.user);

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
    const upload = () => {
      setLoader(true)
      const formdata = new FormData();
      formdata.append("user_id",userDetail?.id);
      // formdata.append("file",doc)
      // formdata.append("message",chatMessages);
      formdata.append("file",{
        uri: doc?.uri,
        type: doc?.type,
        name: doc?.name,
      })
  
      console.log('form data', formdata);
      UploadIdentity(formdata).then(response => {
        console.log('customer reponse =====> ', response);
        if (response?.success==true) {
          ToastMessage('Successfully document uploaded')
          setLoader(false)
          props.navigation.navigate(routes.createService)
          // props.navigation.goBack()
         
        }else{
          // ToastMessage(response.message);
          ToastMessage('Error document uploaded')
          console.log("else chala");
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
        heading={"Identity Proof Documents"}
        color={colors.appColor1} 
      />
      <Spacer height={sizes.smallMargin} />
      <ComponentWrapper 
        // animation="fadeInUp" 
        style={[{ height: height(30), alignItems: "center", justifyContent: "center", borderWidth: 1,
         borderColor: colors.appColor1, padding: sizes.baseMargin, borderRadius: 25, }]}>
       {/* <ImageBackground source={{uri:doc.uri}} style={{height:height(30),width:width(80)}}> */}
       <TouchableOpacity style={{alignItems:'center'}}
       onPress={()=>selectDocument()}
       >
       <Feather 
            name='upload'
            size={totalSize(3)}
            color={colors.appColor1}
        />
        <RegularText style={{color:colors.appColor1,marginTop:height(2),fontFamily:fontFamily.appTextRegular,}}>
        Upload Documents
        </RegularText>
       </TouchableOpacity>
       {/* </ImageBackground> */}
      </ComponentWrapper>
      <AbsoluteWrapper style={{bottom:30,left:0,right:0}}>
      {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
        <ButtonColored 
          text={"Next"}
          // onPress={()=>props.navigation.navigate(routes.createService)
          onPress={()=>
            doc!=""&&
            doc!=null
           ? upload()
          :ToastMessage("Please select file first")
          }
          
        />
        )}
      </AbsoluteWrapper>
    </MainWrapper>
  );
}

export default IdentityProof;