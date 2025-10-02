import CustomTextArea from '@/shared/ui/СustomTextArea/CustomTextArea';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

type MainBlockProps = {
  contractor?: string;
  object?: string;
  region?: string;
  data?: string;
};

const MainBlock: React.FC<MainBlockProps> = ({ contractor, object, region, data}) => {
  
  return (
    <View style={styles.container}>
      <CustomTextArea
        label="Объект"
        readonly
        onChange={() => {}}
        disable={true}
        value={object ?? ""}
        placeholder="Введите данные"
      />
      <CustomTextArea
        label="Участок производства работ (Адресный ориентир)"
        onChange={() => {}}
        disable={true}
        value={region ?? ""}
        placeholder="Введите данные"
      />
      <CustomTextArea
        label="Подрядчик"
        readonly
        disable={true}
        onChange={() => {}}
        value={contractor ?? ""}
        placeholder="Введите данные"
      />
      <CustomTextArea
        label="Данные проверки"
        disable={true}
        onChange={() => {}}
        value={data ?? ""}
        placeholder="Введите данные"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 25,
    gap: 20,
    paddingBottom: 20,
  },
});

export default memo(MainBlock);
