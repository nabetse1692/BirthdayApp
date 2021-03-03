import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, TextInput, View} from 'react-native'
import colors from '../utils/color.js';
import {validateEmail} from '../utils/validations.js';
import firebase from '../utils/firebase.js'; 

//#region EXPORT-------------------------------------------------------------------------------
export default function RegisterForm(props) {
    const {changeForm} = props;
    const [formData, setFormData] = useState(defaultValue ())
    const [formError, setFormError] = useState({});

    const register = () => {
        let errors = {};
        if(!formData.email || !formData.password || !formData.repeatPassword)
        {
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            if(!formData.repeatPassword) errors.repeatPassword = true;
        }
        else if(!validateEmail(formData.email))
        {
            errors.email = true;
        }
        else if(formData.password !== formData.repeatPassword)
        {
            errors.password = true;
            errors.repeatPassword = true;
        }
        else if(formData.password.length < 6)
        {
            errors.password = true;
            errors.repeatPassword = true;
        }
        else
        {
            firebase.auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                console.log("Cuenta creada");
            }).catch(() => {
                setFormError({
                    email: true,
                    password: true,
                    repeatPassword: true,
                });
            });
        }
        setFormError(errors);
    }
    
    return (
        <>
            <TextInput 
                style={[styles.input, formError.email && styles.error]} 
                placeholder="Correo Electrónico" 
                placeholderTextColor="#969696" 
                onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
            />
            <TextInput 
                style={[styles.input, formError.password && styles.error]} 
                placeholder="Contraseña" 
                placeholderTextColor="#969696" 
                secureTextEntry={true}
                onChange={(e) => setFormData({...formData, password: e.nativeEvent.text})}
            />
            <TextInput 
                style={[styles.input, formError.repeatPassword && styles.error]} 
                placeholder="Confirmar Contraseña" 
                placeholderTextColor="#969696" 
                secureTextEntry={true}
                onChange={(e) => setFormData({...formData, repeatPassword: e.nativeEvent.text})}
            />

            <TouchableOpacity onPress={register}>
                <Text style={styles.btnText}>Registrate</Text>
            </TouchableOpacity>

            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
//#endregion

function defaultValue () {
    return {
        email: "",
        password: "",
        repeatPassword: "",
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

    login: {
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