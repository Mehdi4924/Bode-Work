import React, { Component, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    Image,
    FlatList,
} from 'react-native';
import {
    MainWrapper,
    Wrapper,
    ModalColored,
    RowWrapper,
    ImagePortfolio,
    KeyboardAvoidingScrollView,
    RegularText,
    Spacer,
    SmallTitle,
    MediumTitle,
    SmallText,
    AbsoluteWrapper,
    ButtonColored,
    ButtonBordered,
} from '../../../components';
import { width, height, totalSize } from 'react-native-dimension';
import { appIcons, colors, fontFamily, ToastMessage, } from '../../../themes';
import Header from '../../../components/header/header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { routes } from '../../../services';
import { useSelector } from 'react-redux';
import { showsinglestylistData, deleteServiceData } from '../../../services/backend/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from "@react-native-community/blur";
const DATA = [1, 2, 3];

const EditSkills = (props) => {
    const { navigate, goBack, replace } = props.navigation;
    const { userDetail } = useSelector(state => state.user);
    console.log("ye i editskill screen pr details", userDetail.id);
    const [dataSource, setDataSource] = useState({});
    const [Provider, setProvider] = useState([]);
    const [loader, setLoader] = useState(false);
    const [invitationModalStatus, setInvitationModalStatus] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            getUserData();
        }, [])
    );

    const getUserData = () => {
        setLoader(true)
        try {
            const data = {
                stylist_id: userDetail?.id,
                // stylist_id: '81',
            };
            showsinglestylistData(data).then(response => {
                console.log('edit skill data22 =====> ', response);
                setLoader(false)
                if (response?.success) {
                    console.log(' edit skill data =====> ', JSON.stringify(response.data,null,2));
                    setDataSource(response.data);
                    setLoader(false)
                }
            });
        } catch (error) {
            console.log("ye chaal");
            ToastMessage(error.message);
            setLoader(false)
        }
    };
    const deleteService = (id) => {
        console.log("focus effect chala", id);
        try {
            const data = {
                // user_id: userDetail?.id,
                // viewer_id: 1,
                stylist_id: userDetail?.id,
                // stylist_id: '81',
                service_id: id
            };
            deleteServiceData(data).then(response => {
                console.log('showServiceData =====> ', response);
                if (response?.success) {
                    console.log('delete service  =====> ', response);
                    setInvitationModalStatus(true)
                    let a = dataSource.filter(itemm => itemm.id != id)
                    setDataSource(a)
                }
            });
        } catch (error) {
            ToastMessage(error.message);
        }
    };
    const invitationToggleModal = () => {
        setInvitationModalStatus(!invitationModalStatus);
    };
    const renderItem3 = ({ item }) => {
        return (
            <View>

                <Wrapper

                    style={{
                        backgroundColor: colors.appColor1,
                        marginBottom: height(2),
                        paddingVertical: height(1.5),
                        paddingHorizontal: width(4),
                        borderRadius: 20,
                        marginHorizontal: width(4)
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{}}>
                            <Image
                                source={appIcons.docpic}
                                style={styles.docpicImagestyle}
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: width(2) }}>
                            <SmallTitle style={{ color: "#FFF" }}>{item?.service?.name}</SmallTitle>
                        </View>
                      <View style={{flexDirection:'row',width:width(15),justifyContent:'space-between'}}>
                      <TouchableOpacity
                            // onPress={() => console.log("pressed ",JSON.stringify(item,null,2))}
                            onPress={() => props.navigation.navigate(routes.provider.editservice,{flag:'edit',item:item})}
                            style={{ justifyContent: 'center' }}>
                                <Image
                                source={appIcons.edit}
                                resizeMode={'center'}
                                style={{height:height(3),width:height(3)}}
                            />
                        </TouchableOpacity>
                      <TouchableOpacity
                            onPress={() => deleteService(item.id)}
                            style={{ justifyContent: 'center' }}>
                               <Image
                                source={appIcons.delete}
                                resizeMode={'center'}
                                style={{height:height(3),width:height(3)}}
                            />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ height: height(12) }}>
                        <SmallText style={{ color: "#FFF", paddingVertical: height(2), fontSize: totalSize(1.7) }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis risus mi. Ut placerat quam lectus.
                        </SmallText>
                    </View>

                    <SmallTitle style={{ color: "#FFF", textAlign: "right",fontFamily:fontFamily.appTextBold,fontSize:totalSize(3) }}>&{item?.base_price!=null?item?.base_price:"40"}</SmallTitle>
                </Wrapper>
            </View>
        )
    };
    return (
        <MainWrapper>
            <StatusBar backgroundColor={"#FFF"} barStyle={'dark-content'} />

            <Header
                goBack={() => props.navigation.goBack()}
                heading={"Add or Edit Skills"}
                color={colors.appColor1}
            />
            {!invitationModalStatus ?
                <BlurView
                    style={styles.absolute}
                    blurType="light"
                   blurAmount={95}
                    reducedTransparencyFallbackColor="white"
                /> : null}
            <Wrapper style={{ flex: 1 }}>
                {loader ? (
                    <View
                        style={{
                            marginVertical: '10%',
                            alignItems: 'center',
                            width: '100%',
                        }}>
                        <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
                    </View>)
                    : dataSource?.length > 0 ?

                        <FlatList
                            contentContainerStyle={{ paddingVertical: height(1.5) }}
                            data={dataSource}
                            renderItem={item => renderItem3(item)}
                            numColumns={1}
                            keyExtractor={item => item.id}

                        />
                        : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text>No Skill Found</Text>
                        </View>}
                {/* {DATA.map((val, key) => {
                        return (
                            <Wrapper
                                key={key}
                                style={{
                                    backgroundColor: colors.appColor1,
                                    marginBottom: height(2),
                                    paddingVertical: height(1.5),
                                    paddingHorizontal: width(4),
                                    borderRadius: 20,
                                    marginHorizontal: width(4)
                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Image
                                            source={appIcons.docpic}
                                            style={styles.docpicImagestyle}
                                        />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', paddingLeft: width(2) }}>
                                        <SmallTitle style={{ color: "#FFF" }}>Bos Braids</SmallTitle>
                                    </View>
                                    <TouchableOpacity style={{ justifyContent: 'center' }}>
                                        <Ionicons
                                            name='trash-bin-sharp'
                                            size={totalSize(2)}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <SmallText style={{ color: "#FFF", textAlign: "center", paddingVertical: height(2),fontSize:14}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis risus mi. Ut placerat quam lectus.
                                </SmallText>
                                <SmallTitle style={{ color: "#FFF", textAlign: "right" }}>$40</SmallTitle>
                            </Wrapper>
                        )
                    })} */}
             {/* <AbsoluteWrapper style={{bottom: height(12), left: 0, right: 0 }}>
                <ButtonBordered
                    text={"Edit Service"}
                    style={{marginBottom:height(8)}}
                    />
                  
                   
                </AbsoluteWrapper> */}
                <AbsoluteWrapper style={{bottom: height(3), left: 0, right: 0 }}>
                
                    <ButtonColored
                        text={"Create a New Service"}
                        onPress={() => props.navigation.navigate(routes.provider.addSkills)}
                    />
                   
                </AbsoluteWrapper>
            </Wrapper>
            <ModalColored
                style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                isVisible={invitationModalStatus}
                toggleModal={invitationToggleModal}
                containerstyle={{ backgroundColor: '#FFF' }}
                modalHeight={14}
                content={
                    <View>
                        <Ionicons
                            name="checkmark-circle"
                            size={totalSize(10)}
                            color={colors.appColor1}
                            style={{ alignSelf: 'center', marginBottom: height(3) }}
                        />
                        <MediumTitle style={{ textAlign: 'center', color: colors.appColor1 }}>
                            Skill Removed
                        </MediumTitle>
                        <ButtonColored
                            text="Done"
                            buttonStyle={{
                                paddingHorizontal: width(5),
                                borderRadius: 10,
                                marginTop: height(4),
                            }}
                            onPress={() => {

                                invitationToggleModal();
                                // props.navigation.navigate(routes.provider.home);
                            }}
                        />
                    </View>
                }
            />
        </MainWrapper>
    );
}

export default EditSkills;

const styles = StyleSheet.create({

    docpicImagestyle: {
        height: height(4),
        width: height(4),
        resizeMode: "contain",
        color: '#fff',
        // backgroundColor:'red'
    }
})