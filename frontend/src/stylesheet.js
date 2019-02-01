import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 45,
    marginBottom: 15,
    borderBottomWidth: 1,
    fontSize: 16,
    borderBottomColor: '$secondaryColor',
    color:'black',
  },


  //Create Desktop/Tablet CSS
  '@media (min-width: 768)': {

  }
});


export default styles;
