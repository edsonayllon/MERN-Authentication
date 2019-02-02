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
    borderWidth: 1,
    paddingLeft:5,
    fontSize: 16,
    borderColor: '$secondaryColor',
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
  activityIndicator: {
    transform: [{scale: 0.8}]
  },

  //Authentication
  loginSuccess: {
    color: 'green'
  },
  loginFailure: {
    color: 'red'
  },
  link: {
    color: 'blue'
  },

  //Create Desktop/Tablet CSS
  '@media (min-width: 768)': {

  }
});


export default styles;
