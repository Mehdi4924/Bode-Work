import React, { Component, useState } from 'react';
import {
    View, Text, TextInput, StatusBar, FlatList, Pressable, ImageBackground, TouchableOpacity, ScrollView,
    StyleSheet,ActivityIndicator
} from 'react-native';
import {
    MainWrapper,
    Wrapper,
    Spacer,
    ImageProfile,
    IconWithText,
    ComponentWrapper,
    LineHorizontal,
    RowWrapperBasic,
    SmallTitle,
    RegularText,
    ButtonColoredSmall,
    ButtonColored,
    AbsoluteWrapper,
    TextInputBordered,
    RowWrapper,
    ModalColored,
    MediumTitle,
    TinyTitle,
    SmallText,
    KeyboardAvoidingScrollView
} from '../../../components';
import { sizes, colors, fontFamily, appImages, ToastMessage, appStyles } from '../../../themes';
import { height, totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import Header from '../../../components/header/header';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { routes } from '../../../services';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import HeaderService from '../../../components/header/headerService';
import { BlurView } from "@react-native-community/blur";
import { addService } from '../../../services/backend/user';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../services/backend/user';
import { setUserDetail ,} from '../../../services/stores/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DATA2 = [
    { id: 1, title: 'Hair Stylist', images: appImages.haircut },
    { id: 2, title: 'Nail Art', images: appImages.nail },
    { id: 3, title: 'Barber', images: appImages.barber },
    { id: 4, title: 'Makeup', images: appImages.makeup },
];
const CreateService = props => {
    const dispatch = useDispatch();
    const param = props.route.params
    console.log("ye aya param", param);
    const { navigate, goBack, replace } = props.navigation;
    const { userDetail } = useSelector(state => state.user);
    console.log("user detail", userDetail);
    const [name, setname] = useState(userDetail?.first_name != null ? userDetail?.first_name : '',);
    const [lastname, setlastname] = useState(userDetail?.last_name != null ? userDetail?.last_name : '',);
    const [Subcategory, setSubcategory] = useState(userDetail?.title != null ? userDetail?.title : '',);
    const [bio, setbio] = useState(userDetail?.about != null ? userDetail?.about : '',);
    const [loader, setLoader] = useState(false);
    const [chargesModalStatus, setChargesModalStatus] = useState(false);
    const [chargesValue, setChargesValue] = useState('$40');
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
    const [ProfileImage, setProfileImage] = useState('');
    const chargesToggleModal = () => {
        setChargesModalStatus(!chargesModalStatus);
    };
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
        formdata.append('about',bio );
        formdata.append('title',Subcategory );
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
            navigate(routes.provider.profile);
            setLoader(false)
            // setDataSource(response?.data);
          }
        });
      };

    return (
        <MainWrapper>
            <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
            {/* <Header
                goBack={() => props.navigation.goBack()}
                heading={"Edit Profile"}
                color={colors.appColor1}
            /> */}
            <KeyboardAvoidingScrollView>
                <Wrapper>
                    <ImageProfile source={{ uri: ProfileImage.uri }} />
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
                            style={{ top: sizes.baseMargin, left: sizes.baseMargin }}>
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
                            textStyle={{ fontSize: totalSize(1.9), fontFamily: fontFamily.appTextBold, marginTop: -8 }}
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
                        title="Category"
                        placeholder={"Hair style"}
                        value={Subcategory}
                        onChangeText={val => {
                            setSubcategory(val);
                        }}
                    />


                    <Spacer height={sizes.smallMargin} />

                    <TextInputBordered
                        title="Email"
                        placeholder={"abc@gmail.com"}
                        value={email}
                        onChangeText={val => {
                            setemail(val);
                        }}
                    />

                    <Spacer height={sizes.baseMargin} />
                    <TextInputBordered
                        title="Phone"
                        placeholder={"0300123456789"}
                        value={phone}
                        onChangeText={val => {
                            setphone(val);
                        }}
                    />
                    <Spacer height={sizes.baseMargin} />
                    <TextInputBordered
                        title="Zip code"
                        placeholder={"90001"}
                        value={zipcode}
                        onChangeText={val => {
                            setzipcode(val);
                        }}
                    />
                    <Spacer height={sizes.baseMargin} />
                    <TextInputBordered
                        title="Country"
                        placeholder={"Pakistan"}
                        value={country}
                        onChangeText={val => {
                            setcountry(val);
                        }}
                    />
                    <Spacer height={sizes.smallMargin} />

                    <TextInputBordered
                        title="About You"
                        placeholder={"please enter "}
                        pla
                        value={bio}
                        onChangeText={val => {
                            setbio(val);
                        }}
                        inputStyle={[{ textAlignVertical: 'top', height: height(20) }]}
                    />
                    <Spacer height={sizes.baseMargin} />
                    <Spacer height={sizes.baseMargin} />
                    <Spacer height={sizes.smallMargin} />
                </Wrapper>

                {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
                <ButtonColored text="Save Changes"
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

                />
        )}
         <Spacer height={sizes.baseMargin} />
                    <Spacer height={sizes.baseMargin} />
            </KeyboardAvoidingScrollView>


        </MainWrapper>
    );
};

export default CreateService;
const styles = StyleSheet.create({
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
})