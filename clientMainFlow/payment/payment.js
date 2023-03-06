import React, {useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, Alert, StatusBar} from 'react-native';
import {
  MainWrapper,
  ButtonWithTextArrow,
  Spacer,
  CreditCard,
  Wrapper,
} from '../../../components';
import {colors, sizes} from '../../../themes';
import {routes} from '../../../services';
import {height} from 'react-native-dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData, saveData} from '../../../backend/firebase/utility';
import Toast from 'react-native-simple-toast';
import Header from '../../../components/header/header';

const Payment = (props) => {
  const [myCards, setmyCards] = useState([
    {
      name: 'Jane Doe',
      number: '#### #### #### 1234',
      type: 'master'
    },
  ]);

  const RenderCards = () => {
    return (
      <Wrapper 
      // animation="fadeInRightBig"
      >

        <FlatList
          data={myCards}
          renderItem={({item, index}) => {
            return (
              <CreditCard
                containerStyle={{marginVertical: sizes.marginVertical,alignSelf: 'center'}}
                cardNumber={item.number}
                cardType={item.type}
                name={item.name}
                onPress={() => {
                  Alert.alert(
                    'Card Delete',
                    'Are you sure?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Delete',
                        // onPress: async () => {
                        //   let Obj = this.state.UserData;
                        //   let OldList = Obj.CardList;
                        //   OldList.splice(index, 1);
                        //   Obj.CardList = OldList;
                        //   await saveData('Users', Obj.Id, Obj);
                        //   this.setState({myCards: OldList});
                        //   Toast.show('Card deleted Successfully', Toast.SHORT);
                        // },
                      },
                    ],
                    {cancelable: false},
                  );
                }}
              />
            );
          }}
        />
      </Wrapper>
    );
  };

  const {navigate, goBack} = props.navigation;
  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"#FFF"}
      />
      <Header 
        goBack={() => goBack()}
        heading={"Payment"}
        color={colors.appColor1}
      />
      <RenderCards />
      <Spacer height={sizes.baseMargin} />
      <ButtonWithTextArrow
        text="Add Card"
        onPress={() => navigate(routes.client.addCard)}
      />
      <Spacer height={sizes.baseMargin} />
      <ButtonWithTextArrow
        text="Redemptions"
        onPress={() => navigate(routes.client.redemptions)}
      />
    </MainWrapper>
  );
}

export default Payment;
