import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [text, onChangeText] = React.useState<string>("");

  return (
    <View style={styles.container}>
      <Text>Hello, what do you have in your fridge?</Text>
      <SafeAreaView>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          style={styles.input}
        />
      </SafeAreaView>

      <SafeAreaView>
        <Pressable
          onPress={() => alert(`searching for ${text}`)}
          style={[styles.buttonLabel]}
        >
          <Text style={[styles.searchText]}>Search for recipes</Text>
        </Pressable>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
  buttonLabel: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 6,
  },
  searchText: {
    color: "white",
  },
});
