import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import ReuseInput from '../reusables/ReuseInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReuseButton from '../reusables/ReuseButton';
import * as SecureStore from 'expo-secure-store';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
  const router = useRouter(); 

  const initialValues = {
    email:'',
    password:'',
    confirmPassword:''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required!'),
    
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required!'),
    
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match') // Ensures confirmPassword matches password
      .required('Confirm password is required!'),
  });


const onSubmit = async (values) => {
  console.log(values);
  try {
    const response = await fetch(
      "http://192.168.1.9:8800/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      console.log("Login failed:", errorMessage);
      return;
    }

    console.log("Login successful");
    const data = await response.json();
    const token = data?.data?.token;

    if (token) {
      const decodedUser = jwtDecode(token);
      console.log("Decoded User:", decodedUser);

      await SecureStore.setItemAsync("userToken", token);
      await SecureStore.setItemAsync("userData", JSON.stringify(decodedUser));

      router.push('/WelcomePage');
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => (
          <View style={styles.formContainer}>
            <ReuseInput name="email" placeholder="Email" keyboardType="email-address" iconName="mail-outline" />
            <ReuseInput name="password" placeholder="Password" secureTextEntry iconName="lock-closed-outline" />
            <ReuseInput name="confirmPassword" placeholder="Confirm Password" secureTextEntry iconName="lock-closed-outline" />


            <ReuseButton btnText='Login' type = "submit"/>
            <ReuseButton btnText='Reset' type = "reset"/>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // margin:10
  },
  title: {
    color: '#1E1E1E', 
    fontSize: 26, 
    marginBottom: 30, 
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1.2, 
    textTransform: 'uppercase', 
    paddingVertical: 10, 
    borderBottomWidth: 2, 
    borderBottomColor: '#005A9C',
  },
  formContainer: {
    width: '90%',
    alignItems: 'center',
  },
});
