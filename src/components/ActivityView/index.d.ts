import { ReactElement } from 'react';
import { ViewProps } from 'react-native';

interface ActivityViewProps extends ViewProps {
  isLoading: Boolean;
  errorMessage: String;
  onReload: Function;
}

export default (props: ActivityViewProps) => ReactElement;
