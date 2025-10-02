import {
  ParamAnswer,
  ParamItem,
} from '@/screens/ObjectStackScreens/ObjectActivationScreen/ParamsBlock';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import CustomTextArea from '@/shared/ui/СustomTextArea/CustomTextArea';
import { memo, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const options = ['Да', 'Нет', 'Не требуется'];

const ActivationParamItem: React.FC<{
  item: ParamItem;
  answer: ParamAnswer;
  readonly?: boolean;
  onChange: (id: string, status: string, description: string) => void;
}> = ({ item, answer, onChange, readonly }) => {
  const [selected, setSelected] = useState(answer.status);
  const [description, setDescription] = useState(answer.description);

  useEffect(() => {
    onChange(item.id, selected, description);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, description]);

  const isSubItem = item.id.includes('.');

  return (
    <View style={[styles.container, isSubItem && styles.subContainer]}>
      <Text style={isSubItem ? styles.titleItem : styles.title}>
        <Text style={isSubItem ? styles.numberItem : styles.number}>
          {item.id}.
        </Text>{' '}
        {item.title}
      </Text>

      {isSubItem && (
        <>
          <View style={styles.buttons}>
            {options.map(option => (
              <CustomButton
                styleButton={styles.button}
                key={option}
                styleText={styles.buttonText}
                text={option}
                secondary={selected !== option}
                onPress={readonly ? () => {}:() => setSelected(option)}
              />
            ))}
          </View>

          <CustomTextArea
            value={description}
            onChange={setDescription}
            secondary
            placeholder={readonly ? "Описание отсутстует":"Введите описание (По требованию)"}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'column', gap: 13 },
  title: {
    fontFamily: Fonts[800],
    lineHeight: 24,
    fontSize: 16,
    color: '#404040',
  },
  subContainer: {
    paddingBottom: 13,
  },
  number: {
    fontFamily: Fonts[800],
    lineHeight: 24,
    fontSize: 16,
    color: '#404040',
  },
  titleItem: {
    fontFamily: Fonts[700],
    lineHeight: 24,
    fontSize: 14,
    color: '#585757',
  },
  numberItem: {
    fontFamily: Fonts[800],
    lineHeight: 24,
    fontSize: 14,
    color: '#404040',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: Fonts[700],
    lineHeight: 23,
    fontSize: 15,
    letterSpacing: -0.2,
  },
  buttons: { flexDirection: 'row', gap: 10 },
});

export default memo(ActivationParamItem);
