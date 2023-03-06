import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MainWrapper, CustomIcon, ComponentWrapper, RegularText, ButtonColored, Spacer } from '../../../components';
import { appImages, appStyles, sizes, fontSize } from '../../../themes';
import { totalSize } from 'react-native-dimension';

class BecomeStylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MainWrapper>
        <MainWrapper style={[{ justifyContent: 'space-evenly', }]}>
          <ComponentWrapper style={[appStyles.center]}>
            <CustomIcon
              icon={appImages.moneyArtwork}
              size={totalSize(35)}
              // animation="fadeInDown"
            />
          </ComponentWrapper>
          <ComponentWrapper>
    <RegularText style={[appStyles.textPrimaryColor,appStyles.textCenter,{fontSize:fontSize.h4}]}>Make Money By{'\n'}Providing Services</RegularText>
    <Spacer height={sizes.baseMargin}/>
            <RegularText style={[appStyles.textCenter,{lineHeight:sizes.baseMargin}]}>Duis porta, ligula rhoncus euismod pretium, nisi tellus eleifend odio, luctus viverra sem dolor id sem. Maecenas a venenatis enim, quis porttitor magna. Etiam nec rhoncus neque. Sed quis ultrices eros. Curabitur sit amet eros eu arcu consectetur pulvinar. Aliquam sodales, turpis eget tristique tempor, sapien lacus facilisis diam, molestie efficitur sapien velit nec magna. Maecenas interdum efficitur tempor</RegularText>
          </ComponentWrapper>
        </MainWrapper>
        <ButtonColored
          text="Create a Stylist Profile"
          buttonStyle={[{marginVertical:sizes.marginVertical}]}
        />
      </MainWrapper>

    );
  }
}

export default BecomeStylist;
