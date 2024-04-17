import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Chip,
  MD3Colors,
  Menu,
  PaperProvider,
  Text,
} from "react-native-paper";

import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  index: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 6,
    marginTop: 80,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  searchValues: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    flexWrap: "wrap",
  },
});

const MORE_ICON = "dots-vertical";

export default function Index() {
  const [text, setText] = useState<string>("");
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Curry on Mars" />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              color={MD3Colors.primary30}
              icon="plus-circle"
              onPress={() => openMenu()}
            />
          }
        >
          <Menu.Item
            onPress={() => router.push({ pathname: "/add-from-photo" })}
            title="Take a photo"
          />
          <Menu.Item
            onPress={() => router.push({ pathname: "/add-from-url" })}
            title="Add from URL"
          />
          <Menu.Item
            onPress={() => router.push({ pathname: "/add-manually" })}
            title="Add manually"
          />
        </Menu>
      </Appbar.Header>
      <View style={[styles.index]}>
        <Text variant="titleMedium">
          Hello, what do you have in your fridge?
        </Text>
        <View
          style={{
            paddingTop: 50,
            flexDirection: "row",
            justifyContent: "center",
          }}
        ></View>
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={setText}
            value={text}
            mode="bar"
          />
          <SafeAreaView style={[styles.searchValues]}>
            {text &&
              text.split(" ").map((value) => {
                if (value.length > 0) {
                  return (
                    <Chip
                      icon="check"
                      onPress={() => {}}
                      onClose={() => {}}
                      key={value}
                    >
                      {value}
                    </Chip>
                  );
                } else {
                  return null;
                }
              })}
          </SafeAreaView>
        </View>

        <View>
          <Button
            mode="contained"
            onPress={() =>
              router.push({ pathname: "/recipes", params: { text } })
            }
            compact
            disabled={!text}
          >
            Search for recipes
          </Button>
        </View>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}
