import React, { useState } from 'react';
import { MainWrapper, Spacer, ButtonWithTextArrow, Wrapper } from '../../../components';
import { colors, fontFamily, sizes } from '../../../themes';
import { routes } from '../../../services';
import Header from '../../../components/header/header';
import { StatusBar,View,Text } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';

const Support = (props) => {
    const { navigate, goBack } = props.navigation;
    const [Flag, setFlag] = useState(false);
    setTimeout(() => {
        setFlag(false);
      }, 5000);
    return (
        <MainWrapper>
            <StatusBar backgroundColor={"#FFF"} barStyle={"dark-content"} />
            <Header 
                goBack={() => goBack()}
                heading={"Support"} 
                color={colors.appColor1} 
            />
            <ButtonWithTextArrow
                text="Frequently Asked Questions"
                onPress={() => navigate(routes.client.faq)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text="Live Chat"
                onPress={() => navigate(routes.client.liveChat)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text="Email Customer Support"
                onPress={() => navigate(routes.client.emailCustomerSupport)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text="Become a Stylish"
                onPress={() => navigate(routes.client.becomeStylist)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text="Privacy Policy"
                onPress={() => navigate(routes.client.privacyPolicy)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                onPress={() => navigate(routes.client.termsAndCondition)}
                text={"Terms & Conditions"}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text="Cancellation Policy"
                onPress={() => navigate(routes.client.canellationPolicy)}
            />
            <Spacer height={sizes.baseMargin} />
            <Spacer height={sizes.smallMargin} />
            <ButtonWithTextArrow
                text="Legal Notices"
                onPress={() => navigate(routes.client.legalNoticies)}
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
               style={{backgroundColor:"#fff",position:'absolute',marginTop:height(2),width:width(90),alignSelf:'center',elevation:5,borderRadius:15,

              
                shadowColor: colors.appColor1,
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.5,
                shadowRadius: 9.51,
                elevation: 15,
           
            paddingHorizontal:width(2),paddingVertical:height(2)}}>
            <Text style={{fontFamily:fontFamily.appTextRegular,fontSize:totalSize(1.9),color:colors.appColor1}}>Service provider on their way</Text>
            <Text style={{fontFamily:fontFamily.appTextRegular,fontSize:totalSize(1.4),color:colors.lightBlack}}>Phasellus finibus enim nulla, quis ornare odio facilisis eu.
                 Suspendisse ornare ante sit amet arcu semper, vel eleifend tortor egestas.</Text>
           </Wrapper>
           :null}
        </MainWrapper>
    );
}

export default Support;
