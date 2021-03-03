import React, { useEffect, useState } from 'react';
import {StyleSheet, SafeAreaView, Text, StatusBar, View, Button, LogBox} from 'react-native';
import {decode, encode} from 'base-64';
import firebase from './src/utils/firebase.js'; 
import 'firebase/auth';
import Auth from './src/components/Auth';
import ListBirthday from './src/components/ListBirthday';
import colors from './src/utils/color.js';

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.btoa = decode;

LogBox.ignoreLogs(["Setting a timer"]);

export default function app() {

  const [user, setUser] =useState(undefined);

  useEffect (() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if(user === undefined) return null;

  return(
    <>
      <StatusBar barStyle="light-content"/>
      <SafeAreaView style={styles.background}> 
        {user ? <ListBirthday /> : <Auth />} 
      </SafeAreaView>
    </>
  )
}







const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.COLOR_FONDO_APP,
    height: '100%',
  },

})

