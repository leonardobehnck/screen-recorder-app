import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Camera, CameraView, CameraRecordingOptions } from "expo-camera";
import { shareAsync } from "expo-sharing";
import { Asset, requestPermissionsAsync } from "expo-media-library";

import VideoPlayer from "./src/components/VideoPlayer";
import CameraComponent from "./src/components/CameraView";

export default function App() {
  const cameraRef = useRef<CameraView>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<any>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (
    !hasCameraPermission ||
    !hasMicrophonePermission ||
    !hasMediaLibraryPermission
  ) {
    return <Text>Permissions not granted</Text>;
  }

  const recordVideo = () => {
    if (isRecording) return;
    const options: CameraRecordingOptions = {
      maxDuration: 60,
    };
    setIsRecording(true);
    cameraRef.current
      ?.recordAsync(options)
      .then((recordedVideo) => {
        setVideo(recordedVideo);
      })
      .finally(() => {
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  const shareVideo = () => {
    if (!video) return;
    shareAsync(video.uri);
  };
  const saveVideo = () => {
    if (!video) return;
    Asset.create(video.uri)
      .then(() => {
        setVideo(undefined);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const discardVideo = () => {
    setVideo(undefined);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {video ? (
          <VideoPlayer
            video={video}
            onShare={shareVideo}
            onSave={saveVideo}
            onDiscard={discardVideo}
          />
        ) : (
          <CameraComponent
            cameraRef={cameraRef}
            isRecording={isRecording}
            onRecord={recordVideo}
            onStopRecording={stopRecording}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 16,
  },
  button: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
  },
});
