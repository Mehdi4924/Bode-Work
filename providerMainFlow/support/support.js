import React, { Component,useState } from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import { MainWrapper, Spacer, ButtonWithTextArrow ,Wrapper} from '../../../components';
import { colors, fontFamily, sizes } from '../../../themes';
import { routes } from '../../../services';
import Header from '../../../components/header/header';
import { StatusBar } from 'react-native';
import { height,totalSize,width } from 'react-native-dimension';

const Support = (props) => {
    const { navigate } = props.navigation;
    const space = sizes.baseMargin * 1.5;
    const [Flag, setFlag] = useState(false);
    setTimeout(() => {
        setFlag(false);
      }, 5000);
    return (
        <MainWrapper>
            <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
            <Header 
                goBack={() => props.navigation.goBack()}
                heading={"Support"} 
                color={colors.appColor1} 
            />
           <View style={styles.mainView}>
           <ButtonWithTextArrow
                text="Frequently Asked Questions"
                onPress={() => navigate(routes.provider.faq)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text="Live Chat"
                onPress={() => navigate(routes.provider.liveChat)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text="Email Customer Support"
                onPress={() => navigate(routes.provider.emailCustomerSupport)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text="Privacy Policy"
                onPress={() => navigate(routes.provider.privacyPolicy)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text={"Terms" +" & " +"Conditions"}
                onPress={() => navigate(routes.provider.termsAndCondition)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text="Acknowledgements"
                onPress={() => navigate(routes.provider.acknowledgements)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text="Test Push Notifications"
                onPress={() => setFlag(true)}
            />
              {Flag?
               <Wrapper 
               animation="fadeInDown"
               style={{backgroundColor:"#fff",position:'absolute',marginTop:height(0),width:width(90),alignSelf:'center',elevation:5,borderRadius:15,

              
                shadowColor: colors.appColor1,
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.5,
                shadowRadius: 9.51,
                elevation: 15,
           
            paddingHorizontal:width(2),paddingVertical:height(2)}}>
            <Text style={{fontFamily:fontFamily.appTextRegular,fontSize:totalSize(1.9),color:colors.appColor1}}>You received an order</Text>
            <Text style={{fontFamily:fontFamily.appTextRegular,fontSize:totalSize(1.4),color:colors.lightBlack}}>Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                 Suspendisse ornare ante sit amet arcu semper, vel eleifend tortor egestas.</Text>
           </Wrapper>
           :null}
           
           </View>
         
        </MainWrapper>
    );
}

export default Support;
const styles = StyleSheet.create({
    mainView:{
        marginTop:height(3)
    }
})
