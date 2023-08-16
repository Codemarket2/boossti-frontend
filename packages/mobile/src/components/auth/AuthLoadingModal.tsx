import colors from '@frontend/shared/config/colors';
import React from 'react';
import { View, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';

export default function LoadingModal() {
  const authLoading = useSelector(({ auth }: any) => auth.authLoading);
  return (
    <Modal visible={authLoading} animationType="fade" transparent>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <ActivityIndicator animating={true} color={colors.secondary.main} size={'large'} />
      </View>
    </Modal>
  );
}
