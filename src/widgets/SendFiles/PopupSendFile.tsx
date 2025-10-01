import { Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import React, { memo } from 'react';
import { StyleSheet, Dimensions, View, Text, Pressable } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

interface IPopupSendFile {
  isVisible: boolean;
  onClose: () => void;
  onSelectFile?: (file: Asset) => void;
  onSelectFiles?: (file: Asset[]) => void;
  limit?: number,
  pdf?: boolean,
}

export const PopupSendFile = ({ isVisible, onClose, onSelectFile, onSelectFiles, pdf = true,  limit = 1 }: IPopupSendFile) => {
  const { bottom } = useSafeAreaInsets();

  const handleCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo', quality: 1 });
    if (result.assets && result.assets.length > 0 && onSelectFile) {
      onSelectFile(result.assets[0]);
      onClose();
    }
  };

  const handleGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: limit });
    
    if (limit > 1){
      if (result.assets && result.assets.length > 0 && onSelectFiles) {
        onSelectFiles(result.assets);
        onClose();
      }
    }
    else if (result.assets && result.assets.length > 0 && onSelectFile) {
      onSelectFile(result.assets[0]);
      onClose();
    }
  };

  const handleDocument = async () => {
    const result = await launchImageLibrary({ mediaType: 'mixed', selectionLimit: limit });
    if (result.assets && result.assets.length > 0 && onSelectFile) {
      onSelectFile(result.assets[0]);
      onClose();
    }
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      swipeDirection="down"
      style={styles.modalContainer}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
    >
      <View style={[styles.popup, { height: 142 + bottom, paddingBottom: bottom }]}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleCamera}>
            <Icon name={IconName.Camera} />
          </Pressable>
          <Text style={styles.buttonTitle}>Камера</Text>
        </View>
        {pdf && <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleDocument}>
            <Icon name={IconName.Documetn} />
          </Pressable>
          <Text style={styles.buttonTitle}>Документ</Text>
        </View>}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleGallery}>
            <Icon name={IconName.Galery} />
          </Pressable>
          <Text style={styles.buttonTitle}>Галерея</Text>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    alignItems: "center",
    gap: 8,
    paddingTop: 32,
    paddingBottom: 32,
  },
  button: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  popup: {
    width: width,
    justifyContent: "space-between",
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 54.5,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  buttonTitle: {
    fontFamily: Fonts[600],
    fontSize: 14,
    lineHeight: 22,
    color: "#19191A",
    letterSpacing: -0.2,
  }
});

export default memo(PopupSendFile);