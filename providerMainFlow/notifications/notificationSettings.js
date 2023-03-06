import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {
  MainWrapper,
  RegularText,
  ComponentWrapper,
  Spacer,
  TinyTitle,
  CheckBoxPrimary,
} from '../../../components';
import {sizes} from '../../../themes';
import moment from 'moment';

class NotificationSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  render() {
    return (
      <MainWrapper>
        <Spacer height={sizes.baseMargin} />
        <ComponentWrapper>
          <RegularText>
            You’ll always receive push notification updates for your account
            activity.
          </RegularText>
        </ComponentWrapper>
        <Spacer height={sizes.doubleBaseMargin} />
        <ComponentWrapper>
          <TinyTitle>Push Notifications</TinyTitle>
          <Spacer height={sizes.smallMargin} />
          <CheckBoxPrimary
            text="Style recommendations and offerss"
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})}
          />
        </ComponentWrapper>
        <Spacer height={sizes.doubleBaseMargin} />
        <ComponentWrapper>
          <TinyTitle>Text Messages</TinyTitle>
          <Spacer height={sizes.smallMargin} />
          <CheckBoxPrimary
            text="Style updates from us and your stylist"
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})}
          />
          <Spacer height={sizes.smallMargin} />
          <CheckBoxPrimary
            text="Style updates from us and your stylist"
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})}
          />
        </ComponentWrapper>
        <Spacer height={sizes.doubleBaseMargin} />
        <ComponentWrapper>
          <TinyTitle>Email Notifications</TinyTitle>
          <Spacer height={sizes.smallMargin} />
          <CheckBoxPrimary
            text="Style recommendations and offers"
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})}
          />
        </ComponentWrapper>
      </MainWrapper>
    );
  }
}

export default NotificationSettings;
