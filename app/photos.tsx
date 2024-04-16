import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  IconButton,
  MD3Colors,
  PaperProvider,
  Text,
} from "react-native-paper";

let camera: Camera | null;

export default function Photos() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [previewVisible, setPreviewVisible] = React.useState(false);
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
    setPreviewVisible(true);
  }

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  async function savePhoto() {
    if (permissionForMediaLibraryResponse?.status !== "granted") {
      await requestPermissionForMediaLibraryResponse();
    }

    await MediaLibrary.createAssetAsync(capturedImage.uri);
  }

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Curry on Mars" />
      </Appbar.Header>
      <View style={styles.container}>
        {previewVisible && capturedImage ? (
          <CameraPreview
            photo={capturedImage}
            savePhoto={savePhoto}
            retakePicture={retakePicture}
          />
        ) : (
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
      </View>
    </PaperProvider>
  );
}

function CameraPreview({
  photo,
  savePhoto,
  retakePicture,
}: {
  photo: CameraCapturedPicture;
  savePhoto: () => void;
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

          <Button
            mode="contained"
            onPress={() => {
              savePhoto();

              router.push({
                pathname: "/recipe-from-photo",
                params: { uri: photo.uri },
              });
            }}
          >
            Use photo
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", flexDirection: "column" },
  camera: { flex: 8 },
  buttonContainer: { backgroundColor: "black", alignItems: "center" },
});
