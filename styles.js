import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    locationText: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: 5,
        fontSize: 16,
        borderRadius: 5,
        marginBottom: 10,
    },
});
export default styles;