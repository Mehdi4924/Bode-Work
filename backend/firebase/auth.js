import {
  saveData,
  saveInitialData,
  getData,
  // uploadProfileImage,
  uploadProductDoc,
} from './utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  NetInfo,
  Alert,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
export async function signUp(email, password, myObj) {
  let success = true;

  let emails = await auth().fetchSignInMethodsForEmail(myObj.email);
  if (emails.length > 0) {
    console.log('First time',myObj.userType);

    let DataFound2 = {};
    if (myObj.type !== 'client') {
      // alert('in alert Provider');
      let DataFound = [];
      await firestore()
        .collection('Provider')
        .where('email', '==', myObj.email)
        .get().then(async(querySnapshot)=>{
          querySnapshot.forEach(doc=>{
            DataFound.push(doc.data())
          })
        })
        console.log("DataFound",DataFound)
      if (DataFound.length === 0) {

        await firestore()
          .collection('Users')
          .where('email', '==', myObj.email)
          .get()
          .then(async querySnapshot => {
            console.log("Check DataFound2",querySnapshot)
           
            querySnapshot.forEach(async doc => {
              DataFound2 = doc.data();
            });
            console.log('DataFound2: ', DataFound2);
            console.log('in alert Provider');
            var today = new Date();
            var mili = today.getMilliseconds();
            let kk = Date.parse(today);
            kk = kk + mili;
            let identityDocURL = await uploadProductDoc(
              myObj.identityProofDoc,
              kk + myObj.identityProofName,
            );
            kk = kk + mili;
            let workDocURL = await uploadProductDoc(
              myObj.workLicense,
              kk + myObj.workLicenseName,
            );
            await AsyncStorage.setItem('Token', DataFound2.Id);
            await saveData('Provider', DataFound2.Id, {
              Id: DataFound2.Id,
              username: myObj.name,
              baseCost: myObj.baseCost,
              service: myObj.service,
              subservice: myObj.subService,
              email: email,
              userType: myObj.type,
              identityDocURL: identityDocURL,
              workDocURL: workDocURL,
              earning: 0,
              hours: 0,
              clients: 0,
              responseRate: 0,
              acceptance: 0,
              reliability: 0,
              noShow: 0,
              lateCancel: 0,
              rating: 0,
              reviewsCount: 0,
              userImages: [],
            });
            
          });
      } else {
        success = false;
        // console.log(error);
        Toast.show('Account already exist As Provider');
      }
    } else {
      // alert('in alert user');
      let DataFound = [];
       await firestore()
        .collection('Users')
        .where('email', '==', myObj.email)
        .get().then(async(querySnapshot)=>{
          // DataFound= querySnapshot;
          querySnapshot.forEach(doc=>{
            DataFound.push(doc.data())
          })
        })
      console.log('emails check:', DataFound);
      if (DataFound.length === 0) {
        await firestore()
          .collection('Provider')
          .where('email', '==', myObj.email)
          .get()
          .then(async querySnapshot => {
            querySnapshot.forEach(async doc => {
              DataFound2 = doc.data();
            });
            console.log('DataFound2: ', DataFound2);
            console.log('in alert User');
            var today = new Date();
            var mili = today.getMilliseconds();
            let kk = Date.parse(today);
            kk = kk + mili;
            // let identityDocURL = await uploadProductDoc(myObj.identityProofDoc, kk+myObj.identityProofName)
            kk = kk + mili;
            // let workDocURL = await uploadProductDoc(myObj.workLicense, kk+myObj.workLicenseName)
            await AsyncStorage.setItem('Token', DataFound2.Id);
            await saveData('Users', DataFound2.Id, {
              Id: DataFound2.Id,
              username: myObj.name,
              // baseCost: myObj.baseCost,
              // service: myObj.service,
              // subservice: myObj.subService,
              email: email,
              userType: myObj.type,
              // identityDocURL: identityDocURL,
              // workDocURL: workDocURL,
              // earning: 0,
              // hours: 0,
              // clients: 0,
              // responseRate: 0,
              // acceptance: 0,
              // reliability: 0,
              // noShow: 0,
              // lateCancel: 0,
              ScheduledService: 0,
              UsedService: 0,
              rating: 0,
              reviewsCount: 0,

              // userImages:[]
            });
            let notifications = {
              notifications: [
                {
                  title: 'Account Created',
                  detail: 'Your account created successfully',
                  time: moment().format(),
                },
              ],
            };
            await saveData('notifications', DataFound2.Id, notifications);
            
          });
      }else {
        success = false;
        // console.log(error);
        Toast.show('Account already exist as Client');
      }
    }
  } else {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async user => {
        if (myObj.type !== 'client') {
          var today = new Date();
          var mili = today.getMilliseconds();
          let kk = Date.parse(today);
          kk = kk + mili;
          let identityDocURL = await uploadProductDoc(
            myObj.identityProofDoc,
            kk + myObj.identityProofName,
          );
          kk = kk + mili;
          let workDocURL = await uploadProductDoc(
            myObj.workLicense,
            kk + myObj.workLicenseName,
          );
          await AsyncStorage.setItem('Token', user.user.uid);
          await saveData('Provider', user.user.uid, {
            Id: user.user.uid,
            username: myObj.name,
            baseCost: myObj.baseCost,
            service: myObj.service,
            subservice: myObj.subService,
            email: email,
            userType: myObj.type,
            identityDocURL: identityDocURL,
            workDocURL: workDocURL,
            earning: 0,
            hours: 0,
            clients: 0,
            responseRate: 0,
            acceptance: 0,
            reliability: 0,
            noShow: 0,
            lateCancel: 0,
            rating: 0,
            reviewsCount: 0,
            userImages: [],
          });
        } else {
          var today = new Date();
          var mili = today.getMilliseconds();
          let kk = Date.parse(today);
          kk = kk + mili;
          // let identityDocURL = await uploadProductDoc(myObj.identityProofDoc, kk+myObj.identityProofName)
          kk = kk + mili;
          // let workDocURL = await uploadProductDoc(myObj.workLicense, kk+myObj.workLicenseName)
          await AsyncStorage.setItem('Token', user.user.uid);
          await saveData('Users', user.user.uid, {
            Id: user.user.uid,
            username: myObj.name,
            // baseCost: myObj.baseCost,
            // service: myObj.service,
            // subservice: myObj.subService,
            email: email,
            userType: myObj.type,
            // identityDocURL: identityDocURL,
            // workDocURL: workDocURL,
            // earning: 0,
            // hours: 0,
            // clients: 0,
            // responseRate: 0,
            // acceptance: 0,
            // reliability: 0,
            // noShow: 0,
            // lateCancel: 0,
            ScheduledService: 0,
            UsedService: 0,
            rating: 0,
            reviewsCount: 0,

            // userImages:[]
          });
          let notifications = {
            notifications: [
              {
                title: 'Account Created',
                detail: 'Your account created successfully',
                time: moment().format(),
              },
            ],
          };
          await saveData('notifications', user.user.uid, notifications);
        }
        user.user.sendEmailVerification().then(() => {
          Toast.show('Email Verification Sent');
          Alert.alert('Success', 'Email Verification Sent.', [
            {
              text: 'OK',
              onPress: () => {
                // nav.goBack();
              },
            },
          ]);
          // alert("Activation link send to your email. please verify your account!")
          // nav.goBack();
        });
      })
      .catch(function(error) {
        success = false;
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          Toast.show(
            'The information provided does not match our records. Please try again',
          );
        } else if (error.code === 'auth/wrong-password') {
          Toast.show(
            "The password is invalid and does not match this user's password",
          );
        } else if (error.code === 'auth/unknown') {
          Toast.show(
            'A network error (such as timeout, interrupted connection or unreachable host) has occurred',
          );
        } else {
          Toast.show(error.message);
        }
      });
  }

  return success;
}

export async function signIn(email, password, isSave) {
  let success = true;
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async user => {
      if (isSave) {
        success = user.user.uid;
        await AsyncStorage.setItem('Token', user.user.uid);
      }
      await AsyncStorage.setItem('Token', user.user.uid);
    })
    .catch(function(error) {
      success = false;
      alert(error.code + ': ' + error.message);
    });

  return success;
}
export async function signInWithEmail(email, password) {
  let success = true;
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async user => {
      await AsyncStorage.setItem('Token', user.user.uid);
    })
    .catch(function(error) {
      success = false;
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        Toast.show(
          'The information provided does not match our records. Please try again',
        );
      } else if (error.code === 'auth/wrong-password') {
        Toast.show(
          "The password is invalid and does not match this user's password",
        );
      } else if (error.code === 'auth/unknown') {
        Toast.show(
          'A network error (such as timeout, interrupted connection or unreachable host) has occurred',
        );
      } else {
        Toast.show(error.message);
      }
    });
  return success;
}

export async function getCurrentUserId() {
  var user = auth().currentUser;

  if (user != null) {
    return user.uid;
  }
}

export async function sendPasswordReset(email) {
  auth()
    .sendPasswordResetEmail(email)
    .then(function() {
      Alert.alert('Success', 'Password Reset Email Sent.', [
        {text: 'OK', onPress: () => {}},
      ]);
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        Alert.alert('Failure', errorMessage, [{text: 'OK', onPress: () => {}}]);
      } else if (errorCode == 'auth/user-not-found') {
        Alert.alert('Failure', errorMessage, [{text: 'OK', onPress: () => {}}]);
      } else {
        Alert.alert('Failure', errorMessage, [{text: 'OK', onPress: () => {}}]);
      }
      console.log(error);
    });
}
