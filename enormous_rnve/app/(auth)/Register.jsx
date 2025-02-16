import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import ReuseInput from '../reusables/ReuseInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ReuseButton from '../reusables/ReuseButton';

const Register = () => {
  const router = useRouter(); 

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });


  const onSubmit = async (values) => {
    console.log(values);
    try {
        const response = await fetch(
            // "http://192.168.1.9:8800/api/auth/register",
            "http://192.168.1.29:8800/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }
        );

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log("Registration failed:", errorMessage);
            return;
        }

        console.log("Registration successful");
        router.push('/Login'); 

    } catch (error) {
        console.error("Network error:", error);
    }
};


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleSubmit }) => (
          <View style={styles.formContainer}>
            <ReuseInput name="name" placeholder="Name" iconName="person-outline" />
            <ReuseInput name="email" placeholder="Email" keyboardType="email-address" iconName="mail-outline" />
            <ReuseInput name="password" placeholder="Password" secureTextEntry iconName="lock-closed-outline" />


            <ReuseButton btnText='Register' type = "submit"/>
            <ReuseButton btnText='Reset' type = "reset"/>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Register;

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
