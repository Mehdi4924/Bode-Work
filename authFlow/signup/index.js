import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import {
  MainWrapper,
  ComponentWrapper,
  Spacer,
  RowWrapper,
  SmallText,
  ButtonColored,
  TouchableCustomIcon,
  ButtonBordered,
  TextInputBordered,
} from '../../../components';
import {appStyles, sizes, colors, appIcons, ToastMessage} from '../../../themes';
import {totalSize, width} from 'react-native-dimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {routes} from '../../../services';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native';
import { signUp } from '../../../services/backend/user';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetail } from '../../../services/stores/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const Signup = (props) => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.user);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passError, setPassError] = useState('');
  const [Duplicate, setDuplicate] = useState('');
  const [cpassError, setCpassError] = useState('');
  const [username, setUsername] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [userinfo, setUserinfo] = useState({});
  const [userType, setUserType] = useState("");
  useEffect(() => {
    getUserType();
  }, []);
  const getUserType = async () => {
    const userType = await AsyncStorage.getItem("type");
    setUserType(userType);
  };
  const validateField = () => {
    let userNameReg = /^[\w ]{3,30}$/;
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passReg = /^[\w\d@$!%*#?&]{8,30}$/;
    if (userNameReg.test(username) === false) {
      if (username === '') {
        setNameError("The username cannot be empty, it is a required field");
        setDisabled(true);
        return false;
      } else if (username.length > 2) {
        setNameError("The username is badly formatted");
        setDisabled(true);
        return false;
      } else {
        setNameError("The username should be atleast 3 characters long!");
        setDisabled(true);
        return false;
      }
    } else {
      setNameError('');
      if (
        emailError.length == 0 &&
        nameError.length == 0
      ) {
        setDisabled(false); 
      }
    }
    if (emailReg.test(email) === false) {
      if (email !== undefined && email !== '') {
        setEmailError("The email is badly formatted, must include @ and . in the end");
        setDisabled(true);
        return false;
      } else {
        setEmailError("The email cannot be empty, it is a required field");
        setDisabled(true);
        return false;
      }
    } else {
      setEmailError("");
      setDuplicate('');
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
      if (
        emailError.length == 0 &&
        nameError.length == 0
      ) {
        setDisabled(false);
      }
    }
    if (passReg.test(cpassword) === false) {
      if (cpassword === '') {
        setCpassError('The confirm password can not be empty, it is a required field');
        return false;
      } else if (cpassword.length > 7) {
        setCpassError('The confirm password is badly formatted');
        return false;
      } else {
        setCpassError('The confirm password should be atleast 8 characters long!');
        return false;
      }
    } else if (password !== cpassword) {
      setCpassError('The password and confirm password do not match');
      return false;
    } else {
      setCpassError('');
      if (
        emailError.length == 0 &&
        nameError.length == 0
      ) {
        setDisabled(false);
      }
    }
    return true;
  };
    const Capitalize = (username)=>{
    return username.charAt(0).toUpperCase() + username.slice(1);
    }
    
  const signUpHandle = async () => {
    const { navigate, replace } = props.navigation;
    try {
      const userType = await AsyncStorage.getItem("type");
      console.log("usertypr",userType);
      if (validateField()) {
        setLoader(true);
        const data = {
          first_name: username,
          email: email,
          password: password,
          password_confirmation: cpassword,
          user_type: "client",
          last_name: lastname,
          date_of_birth: '1995-07-23',
           phone_number: '111222333',
          location: 'lahore, pakistan',
          about: 'my about description',
          gender: 'male',
          title: 'provider',
          travel_charges: '20',
          latitude: '',
          longitude: "",
        };
        signUp(data).then((response) => {
          console.log("RESPONSEw =====> ", response?.data);
          if (response?.success) {
            console.log("success ho gya");
            AsyncStorage.setItem("token", "1");
            AsyncStorage.setItem("userData", JSON.stringify(response?.data));
            dispatch(setUserDetail(response?.data));
            setLoader(false);
            if (userType === 'provider') {
              navigate(routes.identityproof)
              // replace(routes.clientApp);
            } else {
              // replace(routes.providerApp);
              replace(routes.clientApp);
              // navigate(routes.identityproof)
            }
          } else {
            ToastMessage(response?.message);
            setLoader(false);
          }
        })
      }
    }
    catch (error) {
      ToastMessage(error.message);
    }
  };
  
  const {navigate} = props.navigation;
  return (
    <MainWrapper>
      <KeyboardAwareScrollView>
      <Spacer height={sizes.baseMargin} />
                    <View style={{ flexDirection: 'row', width: width(90), alignSelf: 'center' }}>
                        <View style={{ width: width(50), marginLeft: -17 }}>
                        <TextInputBordered
          title="First Name"
          placeholder="Jane Doe"
          // animation="fadeInRight"
          autoCapitalize = 'none'
          value={username}
          // <Text>{str.charAt(0).toUpperCase() + str.slice(1);}</Text>
          onChangeText={val => {
            setUsername(val);
            let reg11 = /^[\w ]{3,30}$/;
            if (reg11.test(val) === false) {
              if (val === '') {
                setNameError("The username cannot be empty, it is a required field");
                setDisabled(true);
              } else if (val.length > 2) {
                setNameError("The username is badly formatted");
                setDisabled(true);
              } else {
                setNameError("The username should be atleast 3 characters long!");
                setDisabled(true);
              }
            } else {
              setNameError('');
              if (
                emailError.length == 0 &&
                nameError.length == 0
              ) {
                setDisabled(false); 
              }
            }
          }}
        />

        {nameError.length > 0 && (
          <Text style={{paddingLeft: width(5), color: 'red'}}>
            {nameError}
          </Text>
        )}
                        </View>
                        <View style={{ width: width(50) }}>
                            <TextInputBordered
                                title="Last Name"
                                placeholder={"Jone Doe"}
                                value={lastname}
                                onChangeText={val => {
                                    setlastname(val);
                                }}
                            />
                        </View>
                    </View>
                    {/* <Spacer height={sizes.smallMargin} /> */}
        {/* <Spacer height={sizes.baseMargin} />
        <TextInputBordered
          title="Name"
          placeholder="Jane Doe"
          // animation="fadeInRight"
          value={username}
          onChangeText={val => {
            setUsername(val);
            let reg11 = /^[\w ]{3,30}$/;
            if (reg11.test(val) === false) {
              if (val === '') {
                setNameError("The username cannot be empty, it is a required field");
                setDisabled(true);
              } else if (val.length > 2) {
                setNameError("The username is badly formatted");
                setDisabled(true);
              } else {
                setNameError("The username should be atleast 3 characters long!");
                setDisabled(true);
              }
            } else {
              setNameError('');
              if (
                emailError.length == 0 &&
                nameError.length == 0
              ) {
                setDisabled(false); 
              }
            }
          }}
        />

        {nameError.length > 0 && (
          <Text style={{paddingLeft: width(5), color: 'red'}}>
            {nameError}
          </Text>
        )} */}
        <Spacer height={sizes.baseMargin} />
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
                setDisabled(true);
              } else {
                setEmailError("The email cannot be empty, it is a required field");
                setDisabled(true);
              }
            } else {
              setEmailError("");
              setDuplicate('');
              // let emails = await auth().fetchSignInMethodsForEmail(
              //   email,
              // );
              // if (emails.length > 0) {
              //   this.setState({
              //     Duplicate: 'This email is already in use. Use same password for login.',
              //     emailError: '',
              //     // disabled: true,
              //   });
              // } else {
                // this.setState({emailError: '', Duplicate: ''});
              // }
            }
          }}
        />
        
        {emailError.length > 0 && (
          <Text style={{paddingLeft: width(5), color: 'red'}}>
            {emailError}
          </Text>
        )}
        {Duplicate.length > 0 && (
          <Text style={{paddingLeft: width(5), color: 'green', fontSize: totalSize(1.3)}}>
            {Duplicate}
          </Text>
        )}

        <Spacer height={sizes.baseMargin} />
        {Duplicate.length === 0 && (
          <TextInputBordered
            title="Password"
            placeholder="**********"
            secureTextEntry
            // animation="fadeInRight"
            value={password}
            onChangeText={val => {
              setPassword(val);
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
                if (
                  emailError.length == 0 &&
                  nameError.length == 0
                ) {
                  setDisabled(false);
                }
              }
            }}
          />
        )}

        {Duplicate.length === 0 &&
          passError.length > 0 && (
            <Text style={{paddingLeft: width(5), color: 'red'}}>
              {passError}
            </Text>
          )}
        <Spacer height={sizes.baseMargin} />
        {Duplicate.length === 0 && (
          <TextInputBordered
            title="Confirm Password"
            placeholder="**********"
            secureTextEntry
            // animation="fadeInRight"
            value={cpassword}
            onChangeText={val => {
              setCpassword(val);
              let reg222 = /^[\w\d@$!%*#?&]{8,30}$/;
              if (reg222.test(val) === false) {
                if (val === '') {
                  setCpassError('The confirm password can not be empty, it is a required field');
                } else if (val.length > 7) {
                  setCpassError('The confirm password is badly formatted');
                } else {
                  setCpassError('The confirm password should be atleast 8 characters long!');
                }
              } else if (password !== val) {
                setCpassError('The password and confirm password do not match');
              } else {
                setCpassError('');
                if (
                  emailError.length == 0 &&
                  nameError.length == 0
                ) {
                  setDisabled(false);
                }
              }
            }}
          />
        )}

        {Duplicate.length === 0 &&
          cpassError.length > 0 && (
            <Text style={{paddingLeft: width(5), color: 'red'}}>
              {cpassError}
            </Text>
          )}
        <Spacer height={sizes.baseMargin} />
        <ComponentWrapper>
          <TouchableOpacity 
            activeOpacity={.7}
            onPress={() => setAcceptTerms(!acceptTerms)}
            style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}>
              <View style={[styles.checkboxViewstyle, {backgroundColor:acceptTerms ? colors.appColor1:"#fff"}]}>
                {acceptTerms && 
                  <MaterialCommunityIcons
                  name={'check'}
                  size={totalSize(2)}
                  color={colors.snow}
                />
                }
              </View>
            </View>
            <View style={{flex:1,justifyContent:'center',marginLeft:totalSize(1)}}>
            <SmallText style={{fontSize:totalSize(1.75)}} >
            Accept terms and conditions
          </SmallText>
             
            </View>
          </TouchableOpacity>
        </ComponentWrapper>
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
        
        {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
          
          <ButtonColored 
            text="Sign Up" 
            // onPress={signUpHandle} 
           
            onPress={()=>
          {  {userType=="provider"?

              username!=''&&
              username!=null&&
              email!=''&&
              email!=null&&
              password!=''&&
              password!=null
              
             ? navigate(routes.stylistdetails,{firstname:username,email:email,password:password,cpassword:cpassword,lastname:lastname})
              :Toast.show('Please Fill Out All the Information')
             :signUpHandle()}}
            }
          />
        )}
        
        <Spacer height={sizes.baseMargin} />
        <SmallText style={[appStyles.textCenter]}>Or Continue with</SmallText>
        <Spacer height={sizes.baseMargin} />
        <RowWrapper
          // animation={'zoomIn'}
          style={{justifyContent: 'space-around'}}>
          <TouchableCustomIcon
            icon={appIcons.google}
            size={totalSize(4)}
          />
          <TouchableCustomIcon
            // onPress={() => }
            icon={appIcons.facebook}
            size={totalSize(4)}
          />
          <TouchableCustomIcon icon={appIcons.twitter} size={totalSize(4)} />
        </RowWrapper>
        <Spacer height={sizes.doubleBaseMargin} />
        <SmallText style={[appStyles.textCenter]}>
          Already have an account?
        </SmallText>
        <Spacer height={sizes.baseMargin} />
        <ButtonBordered
          text="Login"
          onPress={() => navigate(routes.signin)}
        />
        <Spacer height={sizes.doubleBaseMargin} />
      </KeyboardAwareScrollView>
    </MainWrapper>
  );
}

export default Signup;
const styles = StyleSheet.create({
checkboxViewstyle:{

    borderColor:colors.appColor1,
    borderWidth:1,
    borderRadius:8,
    height:22,
    width:22,
    alignItems:'center',
    justifyContent:'center',
   
    
}
})
