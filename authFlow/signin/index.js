import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  MainWrapper,
  ComponentWrapper,
  LogoMain,
  Spacer,
  RowWrapper,
  SmallText,
  ButtonColored,
  TouchableCustomIcon,
  ButtonBordered,
  TextInputBordered,
  CheckBoxPrimary,
  ClientMainlog,
  SmallTitle
} from '../../../components';
import { appStyles, sizes, colors, appIcons, ToastMessage } from '../../../themes';
import { totalSize, width } from 'react-native-dimension';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { routes } from '../../../services';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { signIn } from '../../../services/backend/user';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetail } from '../../../services/stores/actions/user';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk-next';
import axios from 'axios';

const Signin = (props) => {
  const dispatch = useDispatch();
  const { navigate, replace } = props.navigation;
  const [loader, setLoader] = useState(false);
  const [stayLoggedin, setstayLoggedin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [userTypeT, setUserTypeT] = useState("");
  useEffect(() => {
    getUserType()
    async function fetchData() {
      const token = AsyncStorage.getItem("token");
      if (token === "1") {
        let type = await AsyncStorage.getItem("type");
        console.log("ye i user type", type);

        if (type === "provider") {
          replace(routes.providerApp)
        } else {
          replace(routes.clientApp)
        }
      }
    };

    fetchData();
  }, []);
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '<1737154064976-bt5kern15t4l5csdcjffu2ial2ohuatc.apps.googleusercontent.com>', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });
  const getUserType = async () => {
    const userTypeT = await AsyncStorage.getItem("type");
    setUserTypeT(userTypeT);
  };
  const validateField = () => {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passReg = /^[\w\d@$!%*#?&]{8,30}$/;
    if (emailReg.test(email) === false) {
      if (email !== undefined && email !== '') {
        setEmailError("The email is badly formatted, must include @ and . in the end");
        return false;
      } else {
        setEmailError("The email cannot be empty, it is a required field");
        return false;
      }
    } else {
      setEmailError("");
    }
    if (passReg.test(password) === false) {
      if (password === '') {
        setPassError("The password can not be empty, it is a required field");
        return false;
      } else if (password.length > 7) {
        setPassError("The password is badly formatted");
        return false;
      } else {
        setPassError('The password should be atleast 8 characters long!');
        return false;
      }
    } else {
      setPassError('');
    }
    return true;
  };
  const onSignIn = async () => {
    try {
      if (validateField()) {
        const userType = await AsyncStorage.getItem("type");
        console.log("ye i user type", userType);
        setLoader(true);
        const data = {
          email: email,
          password: password,
        };
        signIn(data).then((response) => {
          if (response?.success) {
            AsyncStorage.setItem("token", "1");
            AsyncStorage.setItem("userData", JSON.stringify(response?.data));
            dispatch(setUserDetail(response?.data));
            setLoader(false);
            if (userType === 'client') {
              // replace(routes.providerApp);
              replace(routes.clientApp);
            } else {
              replace(routes.providerApp);
              // replace(routes.clientApp);
            }
          } else {
            ToastMessage(response?.message);
            setLoader(false);
          }
        })
      }
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const GooglesignInFn = async () => {
    await GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn()
      .then((response) => {
        console.log("ye aya google ka response", response);
        // setisloading(true);
        // const body = {
        //   email: response?.user?.email,
        //   socialId: response?.user?.id,
        //   phoneNumber: "",
        //   FCMtoken: FCM,
        // };
        // checkUserExistence(body);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        } else if (err.code === statusCodes.IN_PROGRESS) {
        } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        } else {
        }
      });
  };
  const SignInFacebook = async () => {
    // handleFacebookLogin()
    await LoginManager.logOut();
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only");
    }

    await LoginManager.logInWithPermissions(["public_profile", "email",]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().
            then(data => {
              console.log("UserData", data);

              getuserInfo(data?.accessToken);
            });
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
        }
      },
      function (error) {
        console.log(
          "Login fail with error: ",
          JSON.parse(JSON.stringify(error, null, 2))
        );
      }
    );
  };
  const getuserInfo = (token) => {
    console.log("Check token", token);
    axios
      .get(
        `https://graph.facebook.com/me?fields=email,name,friends,picture.type(large)&access_token=${token}`
      )
      .then((response) => {
        console.log("fbData", JSON.stringify(response.data,null,2));
        
        
         

      })
     
  };
  return (
    <MainWrapper>
      <KeyboardAwareScrollView>
        {userTypeT === 'provider' ? (
          <ComponentWrapper style={[appStyles.center]}>
            <LogoMain size={totalSize(20)} />
          </ComponentWrapper>
        ) : (<ComponentWrapper style={[appStyles.center]}>
          <ClientMainlog size={totalSize(20)} />
        </ComponentWrapper>)}

        <TextInputBordered
          title="Email"
          placeholder="example@abc.com"
          // animation="fadeInRight"
          keyboardType="email-address"
          value={email}
          onChangeText={val => {
            setEmail(val);
            let reg2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg2.test(val) === false) {
              if (email !== undefined && email !== '') {
                setEmailError("The email is badly formatted, must include @ and . in the end");
              } else {
                setEmailError("The email cannot be empty, it is a required field");
              }
            } else {
              setEmailError("");
            }
          }}
        />
        {emailError.length > 0 && (
          <Text style={{ paddingLeft: width(5), color: 'red' }}>
            {emailError}
          </Text>
        )}
        <Spacer height={sizes.baseMargin} />
        <TextInputBordered
          title="Password"
          placeholder="**********"
          secureTextEntry
          // animation="fadeInRight"
          value={password}
          onChangeText={val => {
            setpassword(val);
            let reg222 = /^[\w\d@$!%*#?&]{8,30}$/;
            if (reg222.test(val) === false) {
              if (val === '') {
                setPassError("The password can not be empty, it is a required field");
              } else if (val.length > 7) {
                setPassError("The password is badly formatted");
              } else {
                setPassError('The password should be atleast 8 characters long!');
              }
            } else {
              setPassError('');
            }
          }}
        />
        {passError.length > 0 && (
          <Text style={{ paddingLeft: width(5), color: 'red' }}>
            {passError}
          </Text>
        )}
        <Spacer height={sizes.baseMargin} />
        <RowWrapper>
          <TouchableOpacity
            activeOpacity={.7}
            onPress={() => setstayLoggedin(!stayLoggedin)}
            style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center' }}>
              <View style={[styles.checkboxViewstyle, { backgroundColor: stayLoggedin ? colors.appColor1 : "#fff" }]}>
                {stayLoggedin &&
                  <MaterialCommunityIcons
                    name={'check'}
                    size={totalSize(2)}
                    color={colors.snow}
                  />
                }
              </View>
            </View>
            <View style={{ justifyContent: 'center', marginLeft: totalSize(1) }}>
              <SmallText >
                Remember me
              </SmallText>
            </View>
          </TouchableOpacity>
          {/* <CheckBoxPrimary
            text="Remember me"
            checked={stayLoggedin}
            onPress={() => setstayLoggedin(!stayLoggedin)}
          /> */}
          <SmallText onPress={() => navigate(routes.resetPassword)}>
            Forgot Password?
          </SmallText>
        </RowWrapper>
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
          <ButtonColored text="Login"
            onPress={() => onSignIn()}
          // onPress={()=>replace(routes.providerApp)}
          />
        )}

        <Spacer height={sizes.baseMargin} />
        <SmallText style={[appStyles.textCenter]}>Or Continue with</SmallText>
        <Spacer height={sizes.baseMargin} />
        <RowWrapper
          // animation={'zoomIn'}
          style={{ justifyContent: 'space-around' }}>
          <TouchableCustomIcon
            onPress={() => GooglesignInFn()}
            icon={appIcons.google}
            size={totalSize(4)}
          />
          <TouchableCustomIcon
            onPress={() => SignInFacebook()}
            icon={appIcons.facebook}
            size={totalSize(4)}
          />
          <TouchableCustomIcon icon={appIcons.twitter} size={totalSize(4)} />
        </RowWrapper>
        <Spacer height={sizes.doubleBaseMargin} />
        <SmallText style={[appStyles.textCenter]}>
          Don't have an account? Create now
        </SmallText>
        <Spacer height={sizes.baseMargin} />
        <ButtonBordered
          text="Sign Up"
          onPress={() => navigate(routes.signup)}
        />
        <Spacer height={sizes.doubleBaseMargin} />
      </KeyboardAwareScrollView>
    </MainWrapper>
  );
}

export default Signin;
const styles = StyleSheet.create({
  checkboxViewstyle: {

    borderColor: colors.appColor1,
    borderWidth: 1,
    borderRadius: 8,
    height: 22,
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',


  }
})