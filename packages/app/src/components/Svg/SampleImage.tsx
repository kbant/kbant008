import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const CustomTextButton = () => (
  <Icon.Button name="facebook" backgroundColor="green">
    <Text>Login with Facebook</Text>
  </Icon.Button>
);
