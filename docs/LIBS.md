### Screen Recorder App
## Libs
Dependências utilizadas na aplicação.

## Camera
npx expo install expo-camera
https://docs.expo.dev/versions/latest/sdk/camera/

## Video
npx expo install expo-video
https://docs.expo.dev/versions/latest/sdk/video/
Substitui o `expo-av` (deprecado). API: `useVideoPlayer` + `<VideoView />`.

## Albuns
npx expo install expo-media-library
https://docs.expo.dev/versions/latest/sdk/media-library/
API antiga (`saveToLibraryAsync`, `createAssetAsync`) está deprecada e lança erro em runtime.
Migrar para a nova API class-based: `Asset.create(uri)`, `Album.create(...)`, etc.

## Sharing
npx expo install expo-sharing
https://docs.expo.dev/versions/latest/sdk/sharing/

## Safe Area
npx expo install react-native-safe-area-context
https://docs.expo.dev/versions/latest/sdk/safe-area-context/
Envolver app com `<SafeAreaProvider>` e ler insets via `useSafeAreaInsets()`.
