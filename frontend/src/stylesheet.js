import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Components

  input: {
    height: 45,
    marginBottom: 15,
    borderBottomWidth: 1,
    fontSize: 16,
    borderBottomColor: '$secondaryColor',
    color:'black',
  },

  button: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 12,
    justifyContent: 'center',
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    letterSpacing: 0.5,
  },


  //Create Desktop/Tablet CSS
  '@media (min-width: 768)': {

  }
});


export default styles;
