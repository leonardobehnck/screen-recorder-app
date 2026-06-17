import { TouchableOpacity, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CameraViewProps } from "./props";
import { CameraView } from "expo-camera";
import styles from "./styles";

export default function CameraComponent({
  cameraRef,
  isRecording,
  onRecord,
  onStopRecording,
}: CameraViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.container}
        facing="back"
        mode="video"
      />
      <View
        style={[
          styles.buttonContainer,
          { bottom: insets.bottom + 16 },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={isRecording ? onStopRecording : onRecord}
        >
          <Text>{isRecording ? "Stop" : "Record"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
