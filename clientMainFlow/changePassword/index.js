import React, {Component,useState} from 'react';
import {View, Text} from 'react-native';
import {
  MainWrapper,
  Wrapper,
  TextInputBordered,
  Spacer,
  KeyboardAvoidingScrollView,
  ButtonColored,
} from '../../../components';
import {sizes} from '../../../themes';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../../services/backend/user';
import { setUserDetail ,} from '../../../services/stores/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const {navigate, goBack, replace} = props.navigation;
  const {userDetail} = useSelector(state => state.user);
  const [CurrentPassword, setCurrentPassword] = useState();
  const [NewPassword, setNewPassword] = useState();
  const [CNewPassword, setCNewPassword] = useState();

  const PasswordUpdate = () => {
   
    const data ={
      'user_id': userDetail?.id,
      'old_password': CurrentPassword,
      'password': NewPassword,
      'password_confirmation': CNewPassword,

    };

    // const formdata = new FormData();
    // formdata.append('user_id', userDetail?.id,);
    // formdata.append('old_password', CurrentPassword);
    // formdata.append('password', NewPassword);
    // formdata.append('password_confirmation', CNewPassword);
  
    // formdata.append('user_id', '95');
    // formdata.append('first_name', 'ubaid');
    // formdata.append('last_name', 'raza');
  
    // console.log('form data', data);
    updatePassword(data).then(response => {
      console.log("ye chala");
      if (response?.success) {
        console.log('changepaswwordDATA =====> ', response);
        // AsyncStorage.setItem("token", "1");
        // AsyncStorage.setItem("userData", JSON.stringify(response?.data));
        // dispatch(setUserDetail(response?.data));
        navigate(routes.client.profile);
        // setDataSource(response?.data);
      }
    });
  };
// class ChangePassword extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       CurrentPassword: '',
//       NewPassword: '',
//       CNewPassword: '',
//     };
//   }

//   reauthenticate = currentPassword => {
//     var user = auth().currentUser;
//     var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
//     return user.reauthenticateWithCredential(cred);
//   };

//   changePassword = (currentPassword, newPassword) => {
//     this.reauthenticate(currentPassword)
//       .then(() => {
//         var user = auth().currentUser;
//         user
//           .updatePassword(newPassword)
//           .then(() => {
//             console.log('Password updated!');
//             Toast.show('Password updated!', Toast.SHORT);
//             this.props.navigation.goBack();
//           })
//           .catch(error => {
//             Toast.show(error, Toast.SHORT);
//           });
//       })
//       .catch(error => {
//         Toast.show(error, Toast.SHORT);
//       });
//   };

//   render() {
    return (
      <MainWrapper>
        <KeyboardAvoidingScrollView>
          <Wrapper flex={1}>
            <Spacer height={sizes.baseMargin} />
            <TextInputBordered
             placeholder={"*******"}
              title="Current Password"
              secureTextEntry
              value={CurrentPassword}
              onChangeText={val => {
                setCurrentPassword(val);
              }}
            />
            <Spacer height={sizes.baseMargin} />
            <TextInputBordered
            placeholder={"*******"}
              title="New Password"
              secureTextEntry
              value={NewPassword}
              onChangeText={val => {
                setNewPassword(val);
              }}
            />
            <Spacer height={sizes.baseMargin} />
            <TextInputBordered
            placeholder={"*******"}
              title="Confirm New Password"
              secureTextEntry
              value={CNewPassword}
              onChangeText={val => {
                setCNewPassword(val);
              }}
            />
          </Wrapper>
        </KeyboardAvoidingScrollView>
        <Spacer height={sizes.doubleBaseMargin} />
        <ButtonColored
          onPress={() => {
            if (CurrentPassword === '') {
              Toast.show('Current Password cannot empty', Toast.SHORT);
              return 0;
            }
            if (NewPassword === '') {
              Toast.show('New Password cannot empty', Toast.SHORT);
              return 0;
            }
            if (CNewPassword === '') {
              Toast.show('Confirm New Password cannot empty', Toast.SHORT);
              return 0;
            }
            if (NewPassword !== this.state.CNewPassword) {
              Toast.show(
                'Password Not same. please enter same password',
                Toast.SHORT,
              );
              return 0;
            }
            PasswordUpdate()
          }}
          text="Save"
        />
        <Spacer height={sizes.doubleBaseMargin} />
      </MainWrapper>
    );
  }
// }

export default ChangePassword;
