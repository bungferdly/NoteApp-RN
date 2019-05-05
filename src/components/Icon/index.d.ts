import React, { ReactElement } from 'react';
import { TextProps } from 'react-native';

interface IconProps extends TextProps {
  name: String;
}

declare const Icon: (props: IconProps) => ReactElement;

export default Icon;
