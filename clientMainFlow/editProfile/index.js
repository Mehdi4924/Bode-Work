import React, {Component, useState} from 'react';
import {View, Text, StatusBar,ActivityIndicator} from 'react-native';

import {
  MainWrapper,
  Wrapper,
  ImageProfile,
  AbsoluteWrapper,
  IconButton,
  ComponentWrapper,
  IconWithText,
  KeyboardAvoidingScrollView,
  TextInputBordered,
  Spacer,
  ButtonColored,
  ButtonColoredss,
} from '../../../components';
import {appImages, colors, sizes, appStyles, fontFamily} from '../../../themes';
import Toast from 'react-native-simple-toast';
import {routes} from '../../../services';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../services/backend/user';
import { setUserDetail ,} from '../../../services/stores/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { totalSize, width } from 'react-native-dimension';
// import Toast from 'react-native-simple-toast';
const EditProfile = props => {
  const dispatch = useDispatch();
  const {navigate, goBack, replace} = props.navigation;
  const {userDetail} = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const [ProfileImage, setProfileImage] = useState('');
  const [name, setname] = useState(
    userDetail?.first_name != null ? userDetail?.first_name : '',
  );
  const [lastname, setlastname] = useState(userDetail?.last_name != null ? userDetail?.last_name : '',);
  const [email, setemail] = useState(
    userDetail?.email != null ? userDetail?.email : '',
  );
  const [phone, setphone] = useState(
    userDetail?.phone_number != null ? userDetail?.phone_number : '',
  );
  const [zipcode, setzipcode] = useState(
    userDetail?.zip_code != null ? userDetail?.zip_code : '',
  );
  const [country, setcountry] = useState(
    userDetail?.country != null ? userDetail?.country : '',
  );

  console.log('ye i pic', ProfileImage);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 1,
      },
      async response => {
        setProfileImage(response.assets[0]);
        console.log(response);
      },
    );
  };
  const ProfileUpdate = () => {
    setLoader(true)
    const formdata = new FormData();
    formdata.append("image", {
      uri: ProfileImage?.uri,
      type: ProfileImage?.type,
      name: ProfileImage?.fileName,
    });
    formdata.append('user_id', userDetail?.id,);
    formdata.append('first_name', name);
    formdata.append('last_name', lastname);
    formdata.append('email',email);
    formdata.append('phone',phone);
    formdata.append('zip_code',zipcode);
    formdata.append('country',country );
    formdata.append('about',"about description" );
    // formdata.append('user_id', '95');
    // formdata.append('first_name', 'ubaid');
    // formdata.append('last_name', 'raza');
    // formdata.append('email', 'ubaid15@mail.com');
    // formdata.append('phone', '111222333');
    // formdata.append('zip_code', '34000');
    // formdata.append('country', 'Pakistan');
    // formdata.append('about', 'about description');
    // formdata.append('image', {
    //   uri: ProfileImage?.uri,
    //   type: ProfileImage?.type,
    //   name: ProfileImage?.fileName,
    // });
    console.log('form data', formdata);
    updateProfile(formdata).then(response => {
      if (response?.success) {
        console.log('editproDATA =====> ', response);
        AsyncStorage.setItem("token", "1");
        AsyncStorage.setItem("userData", JSON.stringify(response?.data));
        dispatch(setUserDetail(response?.data));
        navigate(routes.client.profile);
        setLoader(false)
        // setDataSource(response?.data);
      }
    });
  };

  return (
    <MainWrapper>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <KeyboardAvoidingScrollView>
        <Wrapper>
          <ImageProfile source={{uri: ProfileImage.uri!=""?ProfileImage.uri:userDetail?.profile_image}} />
          <AbsoluteWrapper
            style={[
              {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: colors.appBgColor1 + 'BF',
              },
              appStyles.center,
            ]}>
            <AbsoluteWrapper
              style={{top: sizes.baseMargin, left: sizes.baseMargin}}>
              {/* <IconButton
                  iconName="chevron-left"
                  iconColor={colors.appColor1}
                  buttonColor={colors.appBgColor1}
                  onPress={() => navigation.goBack()}
                /> */}
            </AbsoluteWrapper>
            <IconWithText
              iconName="camera-outline"
              text="Tap to change profile picture"
              direction="column"
              iconSize={sizes.appIcons.xl}
              tintColor={colors.appColor1}
              textStyle={{fontSize:totalSize(1.9),fontFamily:fontFamily.appTextBold,marginTop:-8}}
              onPress={() => {
                pickImage();
              }}
            />
          </AbsoluteWrapper>
        </Wrapper>
        <Wrapper>
        <Spacer height={sizes.baseMargin} />
                    <View style={{ flexDirection: 'row', width: width(90), alignSelf: 'center' }}>
                        <View style={{ width: width(50), marginLeft: -17 }}>
                            <TextInputBordered
                                title="First Name"
                                placeholder={"Jone Doe"}
                                value={name}
                                onChangeText={val => {
                                    setname(val);
                                }}
                            />
                        </View>
                        <View style={{ width: width(50) }}>
                            <TextInputBordered
                                title="Last Name"
                                placeholder={"Jone Doe"}
                                value={lastname}
                                onChangeText={val => {
                                    setlastname(val);
                                }}
                            />
                        </View>
                    </View>
                    <Spacer height={sizes.smallMargin} />
          <TextInputBordered
            title="Email"
            value={email}
            onChangeText={val => {
              setemail(val);
            }}
          />

          <Spacer height={sizes.baseMargin} />
          <TextInputBordered
            title="Phone"
            value={phone}
            onChangeText={val => {
              setphone(val);
            }}
          />
          <Spacer height={sizes.baseMargin} />
          <TextInputBordered
            title="Zip code"
            value={zipcode}
            onChangeText={val => {
              setzipcode(val);
            }}
          />
          <Spacer height={sizes.baseMargin} />
          <TextInputBordered
            title="Country"
            value={country}
            onChangeText={val => {
              setcountry(val);
            }}
          />
          <Spacer height={sizes.baseMargin} />
          {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
          <ButtonColoredss
            text="Save Changes"
            onPress={() =>
              ProfileImage!=''&&
              ProfileImage!=null&&
              name!=''&&
            name!=null&&
            email!=''&&
            email!=null&&
            phone!=''&&
            phone!=null&&
            zipcode!=''&&
            zipcode!=null&&
            country!=''&&
            country!=null
           
              ? ProfileUpdate()
              :Toast.show('Please Fill Out All the Information')
            }
            // onPress={async () => {
            //   if (this.state.image !== '' && this.state.image2 !== '') {
            //     userinfo.profileImage = this.state.image2;
            //     await saveData('Users', userinfo.Id, userinfo);
            //     this.props.navigation.goBack();
            //     Toast.show('Profile updated!', Toast.SHORT);
            //   } else {
            //     if (this.state.image !== '') {
            //       if (this.state.image2 === '') {
            //         Toast.show('wait image is uploading', Toast.LONG);
            //         // alert('wait image is uploading');
            //       }
            //     } else {
            //       await saveData('Users', userinfo.Id, userinfo);
            //       this.props.navigation.goBack();
            //       Toast.show('Profile updated!', Toast.SHORT);
            //       // Toast.show('Please select image first', Toast.LONG);
            //       // alert('Please select image first');
            //     }
            //   }
            // }}
          />
        )}
          <Spacer height={sizes.baseMargin} />
        </Wrapper>
      </KeyboardAvoidingScrollView>
    </MainWrapper>
  );
};

export default EditProfile;
