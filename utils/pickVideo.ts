// import * as ImagePicker from 'expo-image-picker';
// import { Platform } from 'react-native';

// export const pickVideo = async () => {
//   if (Platform.OS === 'web') {
//     return null; // Web uses input[type="file"]
//   }

//   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//   if (!permissionResult.granted) {
//     alert("Permission to access media is required!");
//     return;
//   }

//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//     allowsEditing: true,
//     quality: 1,
//   });

//   if (!result.canceled && result.assets.length > 0) {
//     return result.assets[0]; // has .uri
//   }

//   return null;
// };


import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

// Define a minimal Asset type yourself
export type PickedAsset = {
  uri: string;
  width?: number;
  height?: number;
  type?: string;
  duration?: number;
  fileName?: string;
  fileSize?: number;
};

export const pickVideo = async (): Promise<PickedAsset | null> => {
  if (Platform.OS === 'web') {
    return null; // Web uses file input separately
  }

  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert("Permission to access media is required!");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled && result.assets.length > 0) {
    return result.assets[0] as PickedAsset; // cast to our own type
  }

  return null;
};
