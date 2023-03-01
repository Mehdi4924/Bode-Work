import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension';
import { IconWithText, CustomIcon, CustomIconnewlogo } from '../icons';
import { appImages } from '../../themes';

export const LogoMain = props => {
  const { size, animation } = props
  return (
    <CustomIconnewlogo
      // animation={animation ? animation : "fadeInDown"}
      icon={appImages.newlogo2}
      size={size ? size : totalSize(10)}
    />
  );
}
export const ClientMainlog = props => {
  const { size, animation } = props
  return (
    <CustomIconnewlogo
      // animation={animation ? animation : "fadeInDown"}
      icon={appImages.newlogo2}
      size={size ? size : totalSize(10)}
    />
  );
}