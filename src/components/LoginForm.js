import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import {validateEmail} from '../utils/validations.js';
import firebase from '../utils/firebase.js'; 
import colors from '../utils/color.js';





export default function LoginForm(props) {
    const {changeForm} = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const login = () => {
        let errors = {};
        if(!formData.email || !formData.password)
        {
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
        }
        else if(!validateEmail(formData.email))
        {
            errors.email = true;
        } 
        else
        {
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
            .catch(() => {
                setFormError({
                    email: true,
                    password: true,
                });
            });
        }
        
        setFormError(errors);
    }

    const onChange = (e, type) => {
        //console.log("data: ", e.nativeEvent.text);
        //console.log("Type: ", type);

        setFormData({...formData, [type]: e.nativeEvent.text});
    }

    return (
        <>
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo Electrónico"
                placeholderTextColor={colors.COLOR_PLACEHOLDER_IMPUT}
                onChange={(e) => onChange(e, "email")}
            />

            <TextInput
                style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor={colors.COLOR_PLACEHOLDER_IMPUT}
                secureTextEntry={true}
                onChange={(e) => onChange(e, "password")}
            />

            <TouchableOpacity onPress={login}>
                <Text style={styles.btnText}>Iniciar Sesión</Text>
            </TouchableOpacity>




            <View style={styles.register}>
                <TouchableOpacity onPress={changeForm} >
                    <Text style={styles.btnText}>Registrate</Text>
                </TouchableOpacity>
            </View>
            
        </>
    )
}

function defaultValue () {
    return {
        email: "",
        password: "",
    };
}

//#region ESTILOS------------------------------------------------------------------------------
const styles = StyleSheet.create({
    btnText: {
        color: colors.COLOR_LETRA_INPUT,
        fontSize: 18,
        marginTop: 10,
    },

    input: {
        height: 50,
        color: colors.COLOR_LETRA_INPUT,
        width: '80%',
        marginBottom: 15,
        backgroundColor: colors.COLOR_FONTO_INPUT,
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: colors.COLOR_FONTO_INPUT,
    },

    register: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
    },

    touchableButton: {
        height: 50,
        width: '60%',
        backgroundColor: colors.COLOR_FONDO_BUTTON,
        alignItems: 'center',
        borderRadius: 50,
    },

    error: {
        borderColor: colors.COLOR_ERROR_BORDE,
    }
})
//#endregion
