import React, { Component, useState } from 'react';
import { View, Text, StatusBar, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { MainWrapper, RowWrapper, Wrapper, Spacer, TinyTitle, 
    ComponentWrapper, RegularText, SmallTitle, ButtonColored,
     AbsoluteWrapper, ModalColored, MediumTitle, TextInputBordered ,KeyboardAvoidingScrollView,} from '../../../components';
import { appImages, appStyles, colors, fontFamily, sizes } from '../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon, Image } from 'react-native-elements';
import { totalSize, height, width } from 'react-native-dimension';
import Header from '../../../components/header/header';
import { routes } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { stylistServiceAdd } from '../../../services/backend/user';
import { setUserDetail ,} from '../../../services/stores/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DATA = [
    {id: 1, title: "Braiding", icon: ""},
    {id: 2, title: "Flux Locs", icon: ""},
    {id: 3, title: "Dreadlocks", icon: ""},
    {id: 4, title: "Piercing", icon: ""},
    {id: 5, title: "Tatto", icon: ""},
    {id: 6, title: "Eyelashes", icon: ""},
    {id: 7, title: "Perming", icon: ""},
    {id: 8, title: "Beards", icon: ""},
    {id: 9, title: "Waxing", icon: ""},
];

const SetRate = (props) => {
    const dispatch = useDispatch();
    const {navigate, goBack, replace} = props.navigation;
    const {userDetail} = useSelector(state => state.user);
const param=props.route.params
console.log("ye aya param",param);
const [Small, setSmall] = useState("");
const [Medium, setMedium] = useState("");
const [Large, setLarge ]= useState("");

const addStylistService = () => {
    const formdata = new FormData();

    // formdata.append("image", {
    //   uri: ProfileImage?.uri,
    //   type: ProfileImage?.type,
    //   name: ProfileImage?.fileName,
    // });
    // formdata.append('user_id', userDetail?.id,);
    // formdata.append('first_name', name);
    // formdata.append('last_name', "name");
    // formdata.append('email',email);
    // formdata.append('phone',phone);
    // formdata.append('zip_code',zipcode);
    // formdata.append('country',country );
    // formdata.append('about',"about description" );
    formdata.append("stylist_id","2")
    formdata.append("name",'shiny hair')
    formdata.append('category', 'Hair');
    formdata.append('subservice', 'Box Bride');
    formdata.append('last_name', 'raza');
    formdata.append('small', '50');
    formdata.append('medium', '70');
    formdata.append('large', '100');
    formdata.append('add_on', '150');
    formdata.append('description', 'lorem ipsum is a dummy text ');
    formdata.append('image[]',param.image);
    // formdata.append('image[]', {
    //   uri: param?.image?.uri,
    //   type: param?.image?.type,
    //   name: param?.image?.fileName,
    // });
    // formdata.append('primary_image', {
    //     uri: param?.image?.uri,
    //     type: param?.image?.type,
    //     name: param?.image?.fileName,
    //   });
      formdata.append('primary_image',param.image);
    console.log('form data', formdata);
    stylistServiceAdd(formdata).then(response => {
        console.log("ye chaala",response);
      if (response?.success) {
        console.log('editproDATA =====> ', response.data);
        // AsyncStorage.setItem("token", "1");
        // AsyncStorage.setItem("userData", JSON.stringify(response?.data));
        // dispatch(setUserDetail(response?.data));
        // navigate(routes.client.profile);
        // setDataSource(response?.data);
      }
    });
  };
    return (
        <MainWrapper>
            <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
            <Header 
                goBack={() => props.navigation.goBack()}
                heading={"Set Rate"} 
                color={colors.appColor1} 
            />
            <ScrollView>
                <KeyboardAvoidingScrollView>
                <Wrapper
                    // animation="fadeInDown" 
                    style={{paddingHorizontal:width(4),marginTop:height(2)}}
                >
                    {/* <Text>{param.serviceName}aa</Text>

                    <Text>{param.subserviceName}</Text> */}
                    <SmallTitle>{param.serviceName}{"  > "}
                    {param.subserviceName}</SmallTitle>
                    <Wrapper 
                    // animation="faIdenDown" 
                     style={{position:'relative'}}>
                        <TextInputBordered 
                            // animation={"fadeInDown"}
                            title={"Small"}
                            inputContainerStyle={{marginHorizontal:0,marginBottom:height(1.5)}}
                            titleStyle={{marginLeft:0}}
                            componentWrapperStyle={{marginLeft:0,marginTop:height(2)}}
                            value={Small}
                            onChangeText={val => {
                              setSmall(val);
                            }}
                        />
                        <AbsoluteWrapper style={{right:totalSize(1.5),bottom:totalSize(2.3)}}>
                            <SmallTitle style={{fontFamily:fontFamily.appTextRegular}}>$ 40</SmallTitle>
                        </AbsoluteWrapper>
                    </Wrapper>
                    <Wrapper 
                    // animation="fadeInDown"
                     style={{position:'relative'}}>
                        <TextInputBordered 
                            // animation={"fadeInDown"}
                            title={"Medium"}
                            inputContainerStyle={{marginHorizontal:0,marginBottom:height(1.5)}}
                            titleStyle={{marginLeft:0}}
                            componentWrapperStyle={{marginLeft:0,marginTop:height(2)}}
                            value={Medium}
                            onChangeText={val => {
                              setMedium(val);
                            }}
                        />
                        <AbsoluteWrapper style={{right:totalSize(1.5),bottom:totalSize(2.3)}}>
                            <SmallTitle style={{fontFamily:fontFamily.appTextRegular}}>$ 50</SmallTitle>
                        </AbsoluteWrapper>
                    </Wrapper>
                    <Wrapper
                    //  animation="fadeInDown"
                      style={{position:'relative'}}>
                        <TextInputBordered 
                            // animation={"fadeInDown"}
                            title={"Large"}
                            inputContainerStyle={{marginHorizontal:0,marginBottom:height(1.5)}}
                            titleStyle={{marginLeft:0}}
                            componentWrapperStyle={{marginLeft:0,marginTop:height(2)}}
                            value={Large}
                            onChangeText={val => {
                              setLarge(val);
                            }}
                        />
                        <AbsoluteWrapper style={{right:totalSize(1.5),bottom:totalSize(2.3)}}>
                            <SmallTitle style={{fontFamily:fontFamily.appTextRegular}}>$ 80</SmallTitle>
                        </AbsoluteWrapper>
                    </Wrapper>
                    <Wrapper
                    //  animation="fadeInDown"
                      style={{position:'relative'}}
                      >
                        <TextInputBordered 
                            // animation={"fadeInDown"}
                            title={"Add on charge"}
                            inputContainerStyle={{marginHorizontal:0,marginBottom:height(1.5)}}
                            titleStyle={{marginLeft:0}}
                            componentWrapperStyle={{marginLeft:0,marginTop:height(2)}}
                        />
                        <AbsoluteWrapper style={{right:totalSize(1.5),bottom:totalSize(2.3)}}>
                            <SmallTitle style={{fontFamily:fontFamily.appTextRegular}}>$ 180</SmallTitle>
                        </AbsoluteWrapper>
                    </Wrapper>
                </Wrapper>
                </KeyboardAvoidingScrollView>
            </ScrollView>
            <ButtonColored 
                text={"Save"}
                onPress={()=>addStylistService()}
                // onPress={() => props.navigation.navigate(routes.provider.editSkills)}
                buttonStyle={{marginBottom:totalSize(4)}}
            />
        </MainWrapper>
    );
}

export default SetRate;
