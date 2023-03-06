import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MainWrapper, ComponentWrapper, TinyTitle, Spacer, RegularText } from '../../../components';
import { sizes } from '../../../themes';

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: 'Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus at ante mattis, condimentum velit et, dignissim nunc. Integer quis tincidunt purus. Duis dignissim mauris vel elit commodo, eu hendrerit leo ultrices. Nulla vehicula vestibulum purus at rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur dignissim massa nec libero scelerisque rutrum. Curabitur ac purus id elit hendrerit lacinia. Nullam sit amet sem efficitur, porta diam in, convallis tortor.'
    };
  }

  render() {
    return (
      <MainWrapper>
       <ScrollView>
       <ComponentWrapper>
          <Spacer height={sizes.baseMargin} />
          <TinyTitle>Terms & Conditions</TinyTitle>
          <Spacer height={sizes.baseMargin} />
          <RegularText style={[{ lineHeight: sizes.baseMargin }]}>{this.state.detail.repeat(5)}</RegularText>
        </ComponentWrapper>
       </ScrollView>
      </MainWrapper>
    );
  }
}

export default Terms;
