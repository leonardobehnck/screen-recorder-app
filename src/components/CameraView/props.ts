import { CameraView } from "expo-camera";
import React from "react";

export interface CameraViewProps {
  cameraRef: React.RefObject<CameraView | null>;
  isRecording: boolean;
  onRecord: () => void;
  onStopRecording: () => void;
}
