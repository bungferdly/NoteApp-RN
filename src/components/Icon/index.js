import React from 'react';
import { Text } from 'react-native';
import icons from '../../constants/icons';

function Icon({ style, name, children, ...props }) {
  let unicode;
  const fontFamily = name && Object.keys(icons).find(k => (unicode = icons[k][name]));
  return (
    <Text style={[style, { fontFamily }]} {...props}>
      {unicode}
      {children}
    </Text>
  );
}

export default React.memo(Icon);
