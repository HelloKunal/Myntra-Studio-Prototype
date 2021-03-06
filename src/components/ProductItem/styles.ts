import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#7e877e',
    borderRadius: 10,  
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  image: {
    flex: 2,
    padding: 10,
    height: 150,
    resizeMode: 'contain',
  },
  rightContainer: {
    padding: 10,
    flex: 3,
  },
  title: {
    fontSize: 18,
    marginVertical: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  star: {
    margin: 2,
  },
  buttonStyle: {
      flex: 1,
      flexDirection: 'row',
      height: 100,
      borderWidth: 1,
      borderColor: '#efefef',
  },
  ButtonView: {
      flexGrow: 1,        
  },
  iconContainer: {
      width: 40,
  }
});

export default styles;