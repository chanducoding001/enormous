import { Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { useFormikContext } from "formik";

const ReuseButton = ({ btnText, type = "button", onPress, style }) => {
  const { handleSubmit, isSubmitting,handleReset } = useFormikContext(); // Access Formik context

  const handlePress = () => {
    if (type === "submit") {
      handleSubmit(); // Calls Formik handleSubmit when type="submit"
    } else if(type === "reset"){
        handleReset();
    } else {
      onPress && onPress(); // Calls custom function when type="button"
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable 
        style={[styles.button, style]} 
        // style={[styles.button, style, isSubmitting && styles.disabledButton]} 
        onPress={handlePress} 
        // disabled={isSubmitting}
      >
         <Text style={styles.buttonText}>{btnText}</Text>
        {/* {isSubmitting ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>{btnText}</Text>} */}
      </Pressable>
    </View>
  );
};

export default ReuseButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
    // backgroundColor:'green'
  },
  button: {
    width: "90%",
    padding: 12,
    backgroundColor: "#005A9C",
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#7a7a7a",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});