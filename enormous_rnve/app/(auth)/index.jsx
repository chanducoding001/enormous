import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReuseLink from '../reusables/ReuseLink'

const authentication = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Welcome to the Enormous IT!</Text>
        <View>
        <ReuseLink btnText='Register' toLink="/Register"/>
        <ReuseLink btnText='Login' toLink="/Login"/>
        </View>
      </View>
    </View>
  )
}

export default authentication

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        height:'50%',
        width:'80%',
        backgroundColor: 'white',
        borderRadius: 10,  
        elevation: 5,  // Android shadow
        justifyContent:'space-around',
        // iOS Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6.27,
    },
    title:{
        // backgroundColor:'yellow',
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold'
    }
})