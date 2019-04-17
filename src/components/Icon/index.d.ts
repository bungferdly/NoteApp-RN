import React, { ReactElement } from 'react';
import { TextProps } from 'react-native';
import iconNames from './iconNames';

interface IconProps extends TextProps {
  name: String;
}

const Icon: (props: IconProps) => ReactElement;

export default Icon;
