import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { styles } from "../styles";

export default function Index() {
  const [text, setText] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text>Hello, what do you have in your fridge?</Text>
      <SafeAreaView>
        <TextInput onChangeText={setText} value={text} style={styles.input} />
      </SafeAreaView>

      <SafeAreaView>
        <Link
          style={[styles.buttonLabel]}
          href={{
            pathname: "/recipes",
            params: { text: text },
          }}
        >
          Search for recipes
        </Link>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}
