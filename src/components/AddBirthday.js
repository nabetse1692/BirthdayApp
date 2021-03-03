import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from '../utils/firebase.js'; 
import "firebase/firestore";
import colors from '../utils/color.js';
import moment from 'moment';

const db = firebase.firestore(firebase);



export default function AddBirthday() {
    const [formData, setFormData] = useState({});
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [formError, setFormError] = useState({});

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    }

    const showDatePicker = () =>{
        setIsDatePickerVisible(true);
    }

    const handlerConfirm = (date) => {
        const dateBirth = date;
        dateBirth.setHours(0);
        dateBirth.setMinutes(0);
        dateBirth.setSeconds(0);
        setFormData({...formData, dateBirth})

        hideDatePicker();
    }

    const onSubmit = () => {
        let errors = {};

        console.log("Entro")

        if(!formData.name || !formData.lastname || !formData.dateBirth){
            if(!formData.name) errors.name = true;
            if(!formData.lastname) errors.lastname = true;
            if(!formData.dateBirth) errors.dateBirth = true;
        }
        else{
            const data = formData;
            data.dateBirth.setYear(0);
            console.log(data);

            

            data.dateBirth.setYear(0);
            db.collection('Cumples')
            .add(data)
            .then(() => {
                console.log('OK');
            }).catch(() => {
                setFormError({name: true, lastname: true, dateBirth: true})
                console.log('Error');
            });
        }


        setFormError(errors);
    }

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, formError.name && styles.error]}
                    placeholder="Nombre"
                    placeholderTextColor={colors.COLOR_PLACEHOLDER_IMPUT}
                    onChange={(e) => setFormData({...formData, name: e.nativeEvent.text})}
                />
                <TextInput
                    style={[styles.input, formError.lastname && styles.error]}
                    placeholder="Apellidos"
                    placeholderTextColor={colors.COLOR_PLACEHOLDER_IMPUT}
                    onChange={(e) => setFormData({...formData, lastname: e.nativeEvent.text})}
                />
                <View style={[styles.input, styles.datepicker, formError.dateBirth && styles.error]}>
                    <Text 
                        style={{color: formData.dateBirth ? colors.COLOR_LETRA_INPUT : colors.COLOR_PLACEHOLDER_IMPUT, fontSize: 18,}} 
                        onPress={showDatePicker}> {formData.dateBirth ? moment(formData.dateBirth).format('LL') : "Fecha de Nacimiento"}
                    </Text>
                </View>

                <TouchableOpacity style={styles.toButton} onPress={onSubmit}>
                    <Text style={styles.addButton}>Crear Cumpleaños</Text>
                </TouchableOpacity>
            </View>
            
            <DateTimePickerModal 
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={handlerConfirm}
                onCancel={hideDatePicker}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        height: 50,
        color: colors.COLOR_LETRA_INPUT,
        width: '80%',
        marginBottom: 25,
        backgroundColor: colors.COLOR_FONTO_INPUT,
        paddingHorizontal: 20,
        fontSize: 18,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.COLOR_FONTO_INPUT,
    },

    datepicker: {
        justifyContent: 'center',
    },

    textDate: {
        color: colors.COLOR_PLACEHOLDER_IMPUT,
        fontSize: 18,
    },

    addButton: {
        fontSize: 18,
        color: colors.COLOR_LETRA_INPUT,
    },

    toButton: {
        marginTop: 15,
    },

    error: {
        borderColor: colors.COLOR_ERROR_BORDE,
    }
})
