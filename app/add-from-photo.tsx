import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  IconButton,
  MD3Colors,
  PaperProvider,
  Text,
  TextInput,
} from "react-native-paper";

let camera: Camera | null;

export default function AddFromPhoto() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [
    permissionForMediaLibraryResponse,
    requestPermissionForMediaLibraryResponse,
  ] = MediaLibrary.usePermissions();

  const router = useRouter();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>Grant permission</Button>
      </View>
    );
  }

  async function takePicture() {
    const photo: any = await camera?.takePictureAsync();
    setCapturedImage(photo);
    setStep(2);
  }

  const retakePicture = () => {
    setCapturedImage(null);
    setStep(1);
  };

  async function onUsePhoto() {
    if (permissionForMediaLibraryResponse?.status !== "granted") {
      await requestPermissionForMediaLibraryResponse();
    }

    await MediaLibrary.createAssetAsync(capturedImage.uri);
    setStep(3);
  }

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Curry on Mars" />
      </Appbar.Header>
      <View style={styles.container}>
        {step == 1 && (
          <>
            <Camera
              type={CameraType.back}
              ref={(r) => {
                camera = r;
              }}
              style={styles.camera}
            />
            <View style={styles.buttonContainer}>
              <IconButton
                icon="camera"
                iconColor={MD3Colors.primary40}
                size={40}
                mode="contained"
                onPress={() => takePicture()}
              />
            </View>
          </>
        )}
        {step == 2 && (
          <CameraPreview
            photo={capturedImage}
            onUsePhoto={onUsePhoto}
            retakePicture={retakePicture}
          />
        )}
        {step == 3 && <Form photo={capturedImage} />}
      </View>
    </PaperProvider>
  );
}

function CameraPreview({
  photo,
  onUsePhoto,
  retakePicture,
}: {
  photo: CameraCapturedPicture;
  onUsePhoto: () => void;
  retakePicture: () => void;
}) {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: photo.uri }}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "space-around",
            flex: 1,
          }}
        >
          <Button mode="outlined" onPress={retakePicture}>
            Re-take
          </Button>

          <Button mode="contained" onPress={() => onUsePhoto()}>
            Use photo
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

function Form({ photo }: { photo: CameraCapturedPicture }) {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState<string>("");

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        marginTop: 10,
        gap: 10,
      }}
    >
      <View
        style={{
          flex: 6,
          marginLeft: 10,
          marginRight: 10,
          gap: 10,
        }}
      >
        <TextInput
          mode="outlined"
          onChangeText={(text) => setTitle(text)}
          value={title}
          label="Title of the recipe"
        />
        <TextInput
          mode="outlined"
          onChangeText={(text) => setKeywords(text)}
          value={keywords}
          label="Keywords"
        />
        <Image source={{ uri: photo.uri }} style={{ flex: 1 }}></Image>
      </View>
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Button
          mode="contained"
          onPress={() => {}}
          disabled={title.trim().length === 0}
        >
          Add
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", flexDirection: "column" },
  camera: { flex: 8 },
  buttonContainer: { backgroundColor: "black", alignItems: "center" },
});
