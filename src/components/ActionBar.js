import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../utils/color.js';
import firebase from '../utils/firebase.js'; 

export default function ActionBar(props) {

    const{showList, setshowList} = props



    return (
        <View style={styles.viewFooter}>
            <View style={styles.viewClose}>
                <Text style={styles.text} onPress={() => firebase.auth().signOut()}>Cerrar Sesión</Text>
            </View>
            <View style={styles.viewAdd}>
                <Text style={styles.text} onPress={() => setshowList(!showList)}>
                    {showList ? "Nueva Fecha" : "Cancelar Fecha"}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewFooter: {
        position: "absolute",
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 15,
    },
    viewClose:{
        backgroundColor: colors.COLOR_FONDO_BOTON_1_AB,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    viewAdd:
    {
        backgroundColor: colors.COLOR_FONDO_BOTON_2_AB,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    text: 
    {
        fontSize: 16,
        color: colors.COLOR_LETRA_INPUT,
        textAlign: 'center',
    },
})
