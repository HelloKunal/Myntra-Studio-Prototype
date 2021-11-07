import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	root: {
	},
	price: {
		marginVertical: 10,
		fontSize: 18,
		fontWeight: 'bold',
	},
	imgStyle: {		
		backgroundColor: 'white',
	},
	oldPrice: {
		fontSize: 12,
		fontWeight: 'normal',
		textDecorationLine: 'line-through',
		backgroundColor: 'white',
	},
	title: {
	},
	description: {
		marginVertical: 10,
		lineHeight: 18,
	},	
	textArea: {
		padding: 20,
		backgroundColor: 'white',
	},
    buttonStyle: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#FFFFFF',	 
		padding: 5, 	
    },
    button2Style: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#ff007f', 
		padding: 5, 	
    },
    ButtonView: {
        flexGrow: 1,        
    },
    iconContainer: {
        width: 40,
    },
    buttonSidebySide: {
    	flex: 1,
        flexDirection: 'row',   
		padding: 15, 	
    }
});

export default styles