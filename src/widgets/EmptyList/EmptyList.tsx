import { Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import {StyleSheet, Text, View } from 'react-native';

export const EmpryList = ({title}: {title: string}) => {
  return (
    <View style={styles.container}>
      <Icon name={IconName.PlusMap} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>
        Активируйте их или создайте новый, в Веб Версии сервиса для активации.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.4,
    color: '#000000',
    fontFamily: Fonts[700],
    marginTop: 10,
    textAlign: 'center',
    maxWidth: 235
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#A0A0A5',
    fontFamily: Fonts[600],
    marginTop: 10,
    textAlign: 'center',
    maxWidth: 302
  }
});
