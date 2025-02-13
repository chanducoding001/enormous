import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import nature from "@/assets/images/nature.jpg";

const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={nature} resizeMode='cover' style={styles.image}> 
      <Text style={styles.text}>coffee shop!</Text>
      </ImageBackground>
    </View>
  )
}

export default app;

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column'
  },
  image:{
    width:'100%',
    height:'100%',
    resizeMode:'cover',
    flex:1,
    justifyContent:'center'
  },
  text:{
    color:'white',
    fontSize:42,
    fontWeight:'bold',
    textAlign:'center'
  }
})