import React, {useRef,useEffect,useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ModalDropdown from 'react-native-modal-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {width, height, totalSize} from 'react-native-dimension';
import { colors, fontFamily } from '../../themes';
export default function VDropDown(props) {
  const dropdown = useRef(null);
  const itemHeight = height(8);
  const [selectedIdx, setselectedIdx] = useState(-1);
  useEffect(() => {
    setselectedIdx(props.defaultSelectIdx);
  }, [props.defaultSelectIdx]);

  return (
    <View>
      <Text style={{color:colors.appColor1,fontFamily:fontFamily.appTextRegular,fontSize:totalSize(1.4),marginLeft:width(3)}}>{props.title}</Text>
      <View style={props.inputContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* {props.otherIcon ? (
            <Fontisto
              name={props.leftIconName}
              size={21}
              color={colors.appColor1}
              style={{ marginHorizontal: width(4) }}
            />
          ) : (
            <AntDesign
              name={props.leftIconName}
              size={21}
              color={colors.appColor1}
              style={{ marginHorizontal:width(2) }}
            />
          )} */}
          <ModalDropdown
            ref={dropdown}
            options={props.options}
            defaultValue={props.defaultValue}
            style={props.dropDownContainer}
            showsVerticalScrollIndicator={false}
            dropdownStyle={[
              props.dropModal,
              {
                maxHeight: itemHeight * props.options.length,
                borderRadius: 4,
                paddingVertical:height(1),
              },
            ]}
            keyboardType={props.TypeKeypad}
            keyboardShouldPersistTaps={"handled"}
            dropdownTextHighlightStyle={{
              color: "#fff",
              fontWeight: "bold",
              backgroundColor: "grey",
            }}
            renderSeparator={() => (
              <View
                style={{
                  width:width(75),
                  alignSelf: "center",
                  marginVertical: 2,
                }}
              ></View>
            )}
            textStyle={{
              color:colors.black,
              fontSize:height(2),
            }}
            dropdownTextStyle={{
              width:width(75),
              alignSelf: "center",
              backgroundColor:colors.background,
              height:height(7),
              color:colors.black,
              paddingHorizontal:width(5),
              fontSize:height(2),
            }}
            renderRow={(option, index, seperator) => {
              return (
                <TouchableOpacity activeOpacity={0.5}
                  onPress={() => {
                    props.onSelect(index, option);
                    dropdown.current.select(index),
                      setselectedIdx(index),
                      dropdown.current.hide();
                  }}
                  style={[
                    styles.itemContainer,
                    {
                      height: itemHeight / 1.5,
                    },
                  ]}
                >
                  {/* <FontAwesome
                    name={index == selectedIdx ? "check-square" : "square-o"}
                    size={21}
                    color={Theme.primary}
                    style={{ marginHorizontal: Theme.wp("4%") }}
                  /> */}
                  <Text style={props.dropdownTextStyle}>
                    
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            }}
            onSelect={(index, value) => props.onSelect(index, value)}
            defaultTextStyle={[props.defaultTextStyle, { color: "black" }]}
          />
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={() => dropdown.current.show()}>
          <AntDesign
            name={props.rightIconName}
            size={15}
            color={colors.appColor1}
            // style={{ marginRight:width(6) }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width:width(75),
    alignSelf: "center",
    borderRadius: 5,
    // backgroundColor:"red"
  },
});
