import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
};

export type ApplicationStackParamList = {
  Main: NavigatorScreenParams<MainParamsList>;
  FavoriteCountry: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
