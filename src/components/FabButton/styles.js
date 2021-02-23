import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute',
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: '#292b2c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu: {
        backgroundColor: '#292b2c',
        marginTop: 3
    },

    subMenuUm: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },

    subMenuDois: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        margin: 2,
    },

    //MODAL

    modalBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '98%',
        height: 250,
        backgroundColor: '#292b2c',
        borderRadius: 8,
    },

    boxInput: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#292b2c',

    },
    input: {
        backgroundColor: '#FFF',
        fontSize: 18,
        width: 300,
        color: '#000',
        marginBottom: 15,
        padding: 10,
        borderRadius: 8,
    },
    btnView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },

    btnConfirm: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2a9d8f',
        width: 144,
        height: 45,
        borderRadius: 8,
        marginTop: 10,
    },

    btnCancel: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#da1e37',
        width: 144,
        height: 45,
        borderRadius: 8,
        marginTop: 10,
        marginLeft: 8,
    },

    btn: {

    }


})

export default styles