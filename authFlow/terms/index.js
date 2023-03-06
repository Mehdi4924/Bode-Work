import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import {
  MainWrapper,
  Spacer,
  SmallTitle,
  ComponentWrapper,
  TinyTitle,
  RegularText,
  AbsoluteWrapper,
  ButtonColored,
} from '../../../components';
import {sizes, colors} from '../../../themes';
import {styles} from './styles';
import {routes} from '../../../services';
import Toast from 'react-native-simple-toast';

import {getData, saveData} from '../../../backend/firebase/utility';
import auth from '@react-native-firebase/auth';
import {signUp} from '../../../backend/firebase/auth';
import {CommonActions} from '@react-navigation/native';

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      detail:
        'Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus at ante mattis, condimentum velit et, dignissim nunc. Integer quis tincidunt purus. Duis dignissim mauris vel elit commodo, eu hendrerit leo ultrices. Nulla vehicula vestibulum purus at rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur dignissim massa nec libero scelerisque rutrum. Curabitur ac purus id elit hendrerit lacinia. Nullam sit amet sem efficitur, porta diam in, convallis tortor. Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus at ante mattis, condimentum velit et, dignissim nunc. Integer quis tincidunt purus. Duis dignissim mauris vel elit commodo, eu hendrerit leo ultrices. Nulla vehicula vestibulum purus at rutrum.',
      // myObj: this.props.route.params.myObj,
    };
  }

  onSave = async () => {
    this.setState({loading: true});
    const {myObj} = this.state;
    await signUp(myObj.email, myObj.password, myObj).then(async user => {
      if (user) {
        Alert.alert(
          'Signup successful',
          'Your account was created successfully',
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: routes.services}],
                    // routes: [{name: routes.providerApp}],
                  }),
                );
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        this.setState({loading: false});
      }
    });
  };
  render() {
    const {detail} = this.state;
    const {navigate,replace} = this.props.navigation;
    return (
      <MainWrapper>
        <ScrollView>
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <TinyTitle>Terms & Conditions</TinyTitle>
            <Spacer height={sizes.baseMargin} />
            <RegularText style={[styles.detailText]}>{detail}</RegularText>
            <Spacer height={sizes.doubleBaseMargin * 2} />
          </ComponentWrapper>
        </ScrollView>
        <AbsoluteWrapper style={[{bottom: 0, right: 0, left: 0}]}>
          <ButtonColored text={'Accept'} 
          // onPress={() => this.onSave()} 
          onPress={()=> replace(routes.providerApp)}
          />
          <Spacer height={sizes.baseMargin}
           />
        </AbsoluteWrapper>
        <Modal
          transparent={true}
          // animationType="none"
          visible={this.state.loading}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `rgba(255,255,255,0.9)`,
            }}>
            <View
              style={{
                padding: 13,
                // backgroundColor: 'gray',
                borderRadius: 13,
              }}>
              <ActivityIndicator
                animating={this.state.loading}
                color={colors.appColor1}
                size="large"
              />
              {/* <Text style={{ color: `${color}` }}>{loadingMessage}</Text> */}
            </View>
          </View>
        </Modal>
      </MainWrapper>
    );
  }
}

export default Terms;
