import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function authSlot(){

    return (
        <SafeAreaView style={styles.safeArea}>
            <Slot/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea:{
        flex:1
    }
})