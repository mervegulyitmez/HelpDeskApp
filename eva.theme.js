
import { light as lightTheme, dark as darkTheme } from '@eva-design/eva';

export const myTheme = {
  ...lightTheme,
  colors: {
    primary: '#00531b',
    background: '#FEFBEA',
    text: '#717E8E',
    inputBackground:'#F7F8F9'
  },
  statusColors:{
    new:'#136D17',
    inProgress:'#FF7149',
    resolved:'#3D5A93'
  },
  fonts: {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    light: 'Roboto-Light',
    bold: 'Roboto-Bold',
  },
  boldText: {
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export const eva = { light: lightTheme, dark: darkTheme, mapping: {} };
