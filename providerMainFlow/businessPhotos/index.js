import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ImageBackground
} from 'react-native';
import {
  MainWrapper,
  Wrapper,
  RowWrapper,
  ImagePortfolio,
  KeyboardAvoidingScrollView,
  RegularText,
  Spacer,
  ImagePortfolio2,
} from '../../../components';
import {width, height, totalSize} from 'react-native-dimension';
import {sizes, colors, appStyles,ToastMessage} from '../../../themes';
import {Icon} from 'react-native-elements';
import Header from '../../../components/header/header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showportfolioData,addportfolioData} from '../../../services/backend/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const Images = [
    {
      imageUrl:
        'https://i.pinimg.com/736x/9c/95/d5/9c95d5bf82a9684f8bb39306bf253a35.jpg',
        Icon:'caretright'
    },
    {
      imageUrl:
        'https://i.pinimg.com/originals/1e/75/a6/1e75a61cbcfd0bfb7194eb9cc88f25ec.jpg',
    },
    {
      imageUrl:
        'https://i.pinimg.com/originals/f5/7a/7c/f57a7c9a22905250ca8c033aaa687cec.jpg',
    },
    {
      imageUrl:
        'https://www.menshairstyletrends.com/wp-content/uploads/2016/12/virogas.barber-medium-to-long-hairstyle-for-men-2017-new-819x1024.jpg',
    },
    {
      imageUrl:
        'https://1.bp.blogspot.com/-hDkVLAuDjnw/XXoyIB7ky1I/AAAAAAAAAVE/3Ht1EClsuys2coCdCxyh9vVBQiomfBHjgCNcBGAsYHQ/s1600/Trending-Hair-styles-For-Men-1.jpg',
    },
    {
      imageUrl:
        'https://i.pinimg.com/originals/27/e2/cb/27e2cb9b98a17b69583925ffda6dc91e.jpg',
    },
];

const BusinessPhotos = (props) => {
    const {navigate, goBack, replace} = props.navigation;
    const {userDetail} = useSelector(state => state.user);
    console.log("ye i id",userDetail.id);
    const [businessImages, setBusinessImages] = useState(Images);
    const [DataSource, setDataSource] = useState("");
    const [image, setimage] = useState("");
    useFocusEffect(
        React.useCallback(() => {
          getUserData();
          
        }, []),
      );
      const getUserData = () => {
        const data={
          user_id:userDetail?.id
        };
          try {
            showportfolioData(data).then(response => {
              console.log('show portfolio data22 =====> ', response.data);
              if (response?.success) {
                console.log(' show portfolio data =====> ', response.data);
                setDataSource(response.data);
              }
            });
          } catch (error) {
              console.log("ye chaal");
            ToastMessage(error.message);
          }
        };
        const addportfolio = () => {
          const formdata = new FormData();
          formdata.append("user_id",userDetail?.id)
          formdata.append("attachment", {
            uri: image?.uri,
            type: image?.type,
            name: image?.fileName,
          });
          console.log('form data', formdata);
          addportfolioData(formdata).then(response => {
              console.log("ye chaala add portfoloio",response);
            if (response?.success) {
              console.log('addDATA =====> ', response.data);
              ToastMessage("Imahe Add Successfully");
            }
          });
        };
        const pickImage = () => {
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              selectionLimit: 1,
            },
            async response => {
              setimage(response.assets[0]);
              console.log(response);
              addportfolio()
            },
          );
        };
    return (
        <MainWrapper>
            <StatusBar backgroundColor={"#FFF"} barStyle={'dark-content'} />
            <Header 
              goBack={() => props.navigation.goBack()}
              heading={"Business Photos"} 
              color={colors.appColor1}
            />
            <Wrapper style={{flex:1}}>
                <KeyboardAvoidingScrollView>
                    
                    <RowWrapper style={[{flexWrap: 'wrap'}]}>
                        <TouchableOpacity>
                            <Wrapper 
                                // animation="fadeInDown"
                                style={[styles.uploadButtonStyle]}>
                               <TouchableOpacity onPress={()=>pickImage()}>
                               <Wrapper style={[appStyles.center]}>
                                    <Feather
                                        name='upload'
                                        size={totalSize(4)}
                                        color="#fff"
                                    />
                                    <Spacer height={sizes.smallMargin} />
                                    <RegularText
                                        style={[appStyles.textWhite, appStyles.textCenter]}>
                                        Upload Photos{'\n'}or Videos
                                    </RegularText>
                                </Wrapper>
                               </TouchableOpacity>
                            </Wrapper>
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <ImageBackground 
                                source={{uri:Images.imageUrl}}
                                style={[styles.uploadButtonStyle,{backgroundColor:"grey"}]}>
                                <TouchableOpacity style={{backgroundColor:colors.appColor1,borderRadius:100,height:height(5),width:width(10),alignItems:'center',justifyContent:'center'}}>
                                <AntDesign
                                        name='caretright'
                                        size={totalSize(2)}
                                        color={colors.snow}
                                    />
                                   
                                    
                                </TouchableOpacity>
                            </ImageBackground>
                        </TouchableOpacity>
                        {DataSource&&DataSource.length>0?
                        <>
                        {DataSource.map((item, key) => {
                            return (
                                <TouchableOpacity>
                                    <Wrapper
                                        onPress={()=>{alert("test")}}
                                        // animation={key % 2 ? 'fadeInLeft' : 'fadeInRight'}
                                        style={[{marginVertical: sizes.smallMargin}]}>
                                        <ImagePortfolio
                                            IconName={item.Icon}
                                            source={{uri: item.attachment}}
                                            imageStyle={{width: width(42.5), height: height(30)}}
                                        />
                                    </Wrapper>
                                </TouchableOpacity>
                            );
                        })}
                        </>
                        :<View style={{width:width(90),height:height(30),alignItems:'center',justifyContent:'center'}}>
                          <Text>dataload</Text></View>}
                    </RowWrapper>
                   
                </KeyboardAvoidingScrollView>
            </Wrapper>
        </MainWrapper>
    );
}

export default BusinessPhotos;

const styles = StyleSheet.create({
  uploadButtonStyle: {
    width: width(42.5),
    height: height(30),
    borderRadius: sizes.wrapperRadius,
    backgroundColor: colors.appColor1,
    ...appStyles.center,
  },
});
