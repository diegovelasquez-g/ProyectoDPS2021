import React, { useState, useEffect } from 'react';
import {Text,View,StyleSheet,Image,TextInput,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import Buttons from '../components/Buttons';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../Database/Firebase';
import { useNavigation } from '@react-navigation/core';
import { validateEmail } from '../src/utils/helpers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigation = useNavigation();

  const re = () => {
    if (!validateData()) {
      return;
    }
    handleLogin();
  };

  // Validaciones
  const [errorEmail, setErrorEmail] = useState('');

  const validateData = () => {
    setErrorEmail('');
    let isValid = true;

    if (!validateEmail(email)) {
      setErrorEmail('Debes ingresar un correo válido.');
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged with: ', user.email, user.uid);
      })
      .catch((error) => alert('Tu correo o contraseña no son correctos.'));
  };

  return (
    <>
      <KeyboardAwareScrollView  style={styles.container}>
        {/* <View style={styles.header}>
            <Image style={styles.arriba} source={require('../src/img/arriba.png')} />
        </View>   */}
        <Image
          style={styles.arriba}
          source={require('../src/img/arriba.png')}
        />
        <View style={styles.content}>
          <Image
            style={styles.logo}
            source={require('../src/img/logotext.png')}
          />
          <Text style={{ color: 'white', fontSize: 16, paddingBottom: 5 }}>
            Para comenzar a explorar inicia tu sesión
          </Text>
          <View style={styles.contInputs}>
            <Input
              errorStyle={{ color: 'white', textAlign: 'center' }}
              errorMessage={errorEmail}
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="white"
              inputStyle={{ color: 'white', fontSize: 16 }}
              placeholder="Email"
              style={styles.input}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ width: 390 }}
            />
            <View
              style={{
                backgroundColor: '#ECE5DB',
                height: 53,
                width: 53,
                alignItems: 'center',
                borderRadius: 200 / 2,
                borderColor: '#018ABC',
                borderStyle: 'solid',
                justifyContent: 'center',
                position: 'absolute',
                left: 12,
                top: 0,
              }}>
              <Icon
                style={styles.icono}
                name="envelope"
                color="#018ABC"
                size={24}
              />
            </View>
          </View>
          <View style={styles.contInputs}>
            <Input
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor="white"
              inputStyle={{ color: 'white', fontSize: 16 }}
              placeholder="Contraseña"
              style={styles.input}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={{ width: 390 }}
              secureTextEntry
            />
            <View
              style={{
                backgroundColor: '#ECE5DB',
                height: 53,
                width: 53,
                alignItems: 'center',
                borderRadius: 200 / 2,
                borderColor: '#018ABC',
                borderStyle: 'solid',
                justifyContent: 'center',
                position: 'absolute',
                left: 12,
                top: 0,
              }}>
              <Icon
                style={styles.icono}
                name="lock"
                color="#018ABC"
                size={30}
              />
            </View>
          </View>
          <Buttons text="Iniciar Sesión" color="#ECE5DB" onPress={re} />
        </View>
        <View style={styles.registro}>
          <Text style={styles.textoPlano}>¿No tienes cuenta?</Text>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity>
              <Text
                style={styles.textoRegistro}
                onPress={() => navigation.navigate('Register')}>
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 17,
              fontStyle: 'italic',
              color: 'white',
              marginTop: 5,
              textAlign:'center'
            }}>
            ¿Olvidaste tu contraseña?
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 7, alignItems:'center', alignContent:'center', justifyContent:'center' }}>
          <View
            style={{
              backgroundColor: '#ECE5DB',
              height: 53,
              width: 53,
              alignItems: 'center',
              borderRadius: 200 / 2,
              borderColor: '#018ABC',
              borderStyle: 'solid',
              justifyContent: 'center',
             
            }}>
            <Icon
              style={styles.icono}
              name="google"
              color="#018ABC"
              size={35}
            />
          </View>
          <View
            style={{
              backgroundColor: '#ECE5DB',
              height: 53,
              width: 53,
              alignItems: 'center',
              borderRadius: 200 / 2,
              borderColor: '#018ABC',
              borderStyle: 'solid',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Icon
              style={styles.icono}
              name="facebook"
              color="#018ABC"
              size={35}
            />
          </View>
        </View>
          
          {/* <Image style={styles.abajo} source={require('../src/img/abajo.png')} />   */}

        {/* <View style={styles.footer}>
             <Image style={styles.abajo} source={require('../src/img/abajo.png')} />
        </View>   */}
      </KeyboardAwareScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#018ABC',
    
  },
  abajo: {
    height: 200,
    width: '100%',
  
  },
  arriba: {
    height: 200,
    width: '100%',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  input: {
    height: 54,
    width: 320,
    borderWidth: 1,
    padding: 10,
    borderRadius: 200 / 2,
    backgroundColor: '#ECE5DB90',
    textAlign: 'center',
    borderColor: '#018ABC',
  },
  logo: {
    width: 200,
    height: 112,
  },
  content: {
    alignItems: 'center',
  },
  conte: {
    alignItems: 'center',
  },
  registro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  textoPlano: {
    color: 'white',
    fontSize: 17,
  },
  textoRegistro: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  contInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
});

export default LoginScreen;