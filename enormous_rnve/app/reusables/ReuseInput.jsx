import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import { ErrorMessage, useFormikContext } from "formik";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const ReuseInput = ({ name, placeholder, secureTextEntry = false, keyboardType = "default", iconName }) => {
  const { handleChange, handleBlur, values, touched, errors } = useFormikContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        {iconName && <Ionicons name={iconName} size={20} color="#005A9C" style={styles.icon} />}
        <TextInput
          value={values[name]}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          style={[styles.input, touched[name] && errors[name] ? styles.inputError : null]}
          secureTextEntry={isPasswordVisible}
          keyboardType={keyboardType}
        />
        {secureTextEntry && (
          <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="#005A9C" />
          </Pressable>
        )}
      </View>
      <ErrorMessage name={name}>
        {(msg) => <Text style={styles.errorText}>{msg}</Text>}
      </ErrorMessage>
    </View>
  );
};

export default ReuseInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%",
    height: 75,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#005A9C",
    borderRadius: 8,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  inputError: {
    borderColor: "red",
  },
  eyeIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
