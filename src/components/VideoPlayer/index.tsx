import { View, TouchableOpacity, Text } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { VideoPlayerProps } from "./props";
import { styles } from "./styles";

export default function VideoPlayer({
  video,
  onShare,
  onSave,
  onDiscard,
}: VideoPlayerProps) {
  const insets = useSafeAreaInsets();
  const player = useVideoPlayer(video.uri, (p) => {
    p.loop = true;
    p.play();
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit="contain"
      />
      <View style={[styles.buttonContainer, { bottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.button} onPress={onDiscard}>
          <Text style={styles.buttonText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
