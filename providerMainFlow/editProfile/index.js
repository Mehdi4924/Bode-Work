import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {saveData} from '../../../backend/firebase/utility';
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
} from '../../../components';
import {appImages, colors, sizes, appStyles} from '../../../themes';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
// import Toast from 'react-native-simple-toast';
import storage from '@react-native-firebase/storage';
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image2: '',
      image: '',
      userinfo:this.props.route.params.userinfo,
    };
  }
  defaultSpace = () => {
    return <Spacer height={sizes.baseMargin} />;
  };

  async ImageUpload(response) {
    const {userinfo} = this.state;
    console.log('FileName : ', response.fileName);

    let NewName = Math.floor(100000 + Math.random() * 900000).toString();
    // console.log(NewName)
    if (response.fileName === null) {
      response.fileName = NewName;
      console.log(NewName);
    } else {
    }
    console.log('FileName : ', response.fileName);
    let reference = storage().ref(
      '/profileImages/' + response.fileName + '.png',
    );
    let pathToFile = Platform.OS === 'ios' ? response.uri : response.path;
    await reference.putFile(pathToFile).then(async () => {
      console.log('Image uploaded to the bucket!');
      let url = await reference.getDownloadURL();
      console.log('File at :', url);
      this.setState({image2: url, isloading: false});
      userinfo.profileImage = url;
    });
  }

  handleChoosePhoto = () => {
    // const {userinfo} = this.props.route.params;
    var options = {
      title: 'CHANGE PROFILE PHOTO',
      customButtons: [{name: 'fb', title: 'Remove Current Photo'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        this.setState({
          image: response.uri,
          ImageObj: response,
          isloading: true,
        });
        this.ImageUpload(response);
        // this.onChange2(response, 'image')
      }
    });
  };

  render() {
    const {navigation} = this.props;
    const{userinfo} = this.state;
    const {navigate} = navigation;
    // const {userinfo} = this.props.route.params;
    return (
      <MainWrapper>
        <KeyboardAvoidingScrollView>
          <Wrapper>
            <ImageProfile
              source={{
                uri:
                  this.state.image !== ''
                    ? this.state.image
                    : userinfo.profileImage !== undefined
                    ? userinfo.profileImage
                    : appImages.user4,
              }}
            />
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
                <IconButton
                  iconName="chevron-left"
                  iconColor={colors.appColor1}
                  buttonColor={colors.appBgColor1}
                  onPress={() => navigation.goBack()}
                />
              </AbsoluteWrapper>
              <IconWithText
                iconName="camera-outline"
                text="Tap to change profile picture"
                direction="column"
                iconSize={sizes.appIcons.xl}
                tintColor={colors.appColor1}
                textStyle={[appStyles.h5, appStyles.textPrimaryColor]}
                onPress={() => {
                  this.handleChoosePhoto();
                }}
              />
            </AbsoluteWrapper>
          </Wrapper>
          <Wrapper>
            <this.defaultSpace />
            <TextInputBordered
              title="Name"
              value={userinfo.username}
              onChangeText={text => {
                userinfo.username = text;
                this.setState({userinfo})
              }}
            />
            {/* <this.defaultSpace />
                        <TextInputBordered
                            title="Email"
                            value="alex@gmail.com"
                        /> */}
            <this.defaultSpace />
            <TextInputBordered
              title="Phone"
              value={userinfo.phone}
              onChangeText={text => {
                userinfo.phone = text;
                this.setState({userinfo})
              }}
            />
            <this.defaultSpace />
            <TextInputBordered
              title="Language"
              value={userinfo.language}
              onChangeText={text => {
                userinfo.language = text;
                this.setState({userinfo})
              }}
            />
            <this.defaultSpace />
            <TextInputBordered
              title="Zip code"
              value={userinfo.zipcode}
              onChangeText={text => {
                userinfo.zipcode = text;
                this.setState({userinfo})
              }}
            />
            <this.defaultSpace />
            <TextInputBordered
              title="Country"
              value={userinfo.country}
              onChangeText={text => {
                userinfo.country = text;
                this.setState({userinfo})
              }}
            />
            <this.defaultSpace />
            <ButtonColored
              text="Save Changes"
              onPress={async () => {
                if (this.state.image !== '' && this.state.image2 !== '') {
                  userinfo.profileImage = this.state.image2;
                  await saveData('Provider', userinfo.Id, userinfo);
                  this.props.navigation.goBack();
                  Toast.show('Profile updated!', Toast.SHORT);
                } else {
                  if (this.state.image !== '') {
                    if (this.state.image2 === '') {
                      Toast.show('wait image is uploading', Toast.LONG);
                      // alert('wait image is uploading');
                    }
                  } else {
                    await saveData('Provider', userinfo.Id, userinfo);
                    this.props.navigation.goBack();
                    Toast.show('Profile updated!', Toast.SHORT);
                    // Toast.show('Please select image first', Toast.LONG);
                    // alert('Please select image first');
                  }
                }
              }}
            />
            <this.defaultSpace />
          </Wrapper>
        </KeyboardAvoidingScrollView>
      </MainWrapper>
    );
  }
}

export default EditProfile;
