import { ThemeVariables } from '../../@types/theme';

export default function ({}: ThemeVariables) {
  return {
    icons: {
      unFav: require('./assets/images/unFav.png'),
      close: require('./assets/images/close.png'),
      closeDark: require('./assets/images/closeDark.png'),
      fav: require('./assets/images/fav.png'),
      favorite: require('./assets/images/favIcon.png'),
    }
  };
}
