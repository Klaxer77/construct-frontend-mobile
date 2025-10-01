import { memo, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ActivationParamItem from '@/entities/AcivationParamItem';

interface ParamsBlockProps {
  onAnswersChange?: (answers: ParamAnswer[]) => void;
  readonly?: boolean;
  initialState?: ParamAnswer[];
}

export type ParamItem = {
  id: string;
  title: string;
};

export type ParamAnswer = {
  id: string;
  status: string;
  description: string;
  title: string;
};

const paramsData: ParamItem[] = [
  {
    id: '1',
    title:
      'Наличие разрешительной, организационно-технологической, рабочей документации.',
  },
  {
    id: '1.1',
    title:
      ' Наличие приказа на ответственное лицо, осуществляющего строительство (производство работ). (п. 5.3. СП 48.13330.2019. Изм. №1. Организация строительства)',
  },
  {
    id: '1.2',
    title:
      'Наличие приказа на ответственное лицо, осуществляющее строительный контроль (с указанием идентификационного номера в НРС в области строительства). (п. 5.3. СП 48.13330.2019. Изм. №1. Организация строительства)',
  },
  {
    id: '1.3',
    title:
      'Наличие приказа на ответственное лицо, осуществляющее подготовку проектной документации, авторский надзор (п. 5.3. СП 48.13330.2019. Изм. №1. Организация строительства)',
  },
  {
    id: '1.4',
    title:
      'Наличие проектной документации со штампом «В производство работ» (п. 5.5. СП 48.13330.2019. Изм. №1. Организация строительства)',
  },
  {
    id: '1.5',
    title:
      'Наличие проекта производства работ (утвержденного руководителем подрядной организации, согласованного Заказчиком, проектировщиком, эксплуатирующей организацией). (п. 6.4., п. 6.7., п. 6.9. СП 48.13330.2019. Изм. №1. Организация строительства).',
  },
  { id: '2', title: 'Инженерная подготовка строительной площади' },
  {
    id: '2.1',
    title:
      'Наличие акта геодезической разбивочной основы, принятых знаков (реперов).(п. 7.2. СП 48.13330.2019. Изм. №1. Организация строительства).',
  },
  {
    id: '2.2',
    title:
      'Наличие генерального плана (ситуационного плана). (п. 7.6. СП 48.13330.2019. Изм. №1. Организация строительства).',
  },
  {
    id: '2.3',
    title:
      'Фактическое размещение временной инженерной и бытовой инфраструктуры площадки (включая стоянку автотранспорта) согласно проекту организации. Соответствие размещённых временных инфраструктуры требованиям электробезопасности, пожарных, санитарно-эпидемиологических норм и правил.(п. 7.10., п. 7.34. СП 48.13330.2019. Изм. №1. Организация строительства).',
  },
  {
    id: '2.4',
    title:
      'Наличие пунктов очистки или мойки колес транспортных средств на выездах со строительной площадки. (п. 7.13. СП 48.13330.2019. Изм. №1. Организация строительства).',
  },
  {
    id: '2.5',
    title:
      'Наличие бункеров или контейнеров для сбора отдельно бытового и отдельно строительного мусора. (п. 7.13. СП 48.13330.2019. Изм. №1. Организация строительства).',
  },
  {
    id: '2.6',
    title:
      'Наличие информационных щитов (знаков) с указанием: - наименование объекта; - наименование Застройщика (технического Заказчика); - наименование подрядной организации; - наименование проектной организации; - сроки строительства; - контактные телефоны ответственных по приказу лиц по организации. (п. 7.13. СП 48.13330.2019. Изм. №1. Организация строительства).',
  },
  {
    id: '2.7',
    title:
      'Наличие стендов пожарной безопасности с указанием на схеме мест источников воды, средств пожаротушения. (п. 7.13. СП 48.13330.2019. Изм. №1. Организация строительства).',
  },
];

const data =  paramsData
  .map(item => ({
    id: item.id,
    status: 'Да',
    description: '',
    title: item.title,
  }))

const ParamsBlock: React.FC<ParamsBlockProps> = ({ onAnswersChange, readonly, initialState }) => {
  const [answers, setAnswers] = useState<ParamAnswer[]>([]);

  useEffect(() => {
    if (initialState && initialState?.length > 0){
      setAnswers(initialState)
    } else {
      setAnswers(data)
    }
  }, [initialState])

  useEffect(() => {
    onAnswersChange?.(answers);
  }, [answers, onAnswersChange]);

  const handleChange = (id: string, status: string, description: string) => {
    if (readonly) return;

    setAnswers(prev => {
      const index = prev.findIndex(a => a.id === id);
      const newArr = [...prev];
      const item = paramsData.find(p => p.id === id);
      if (!item) return prev;
      const title = item.title;

      if (index >= 0) {
        newArr[index] = { id, status, description, title };
      } else {
        newArr.push({ id, status, description, title });
      }
      return newArr;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        scrollEnabled={false}
        data={answers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ActivationParamItem
            readonly={readonly}
            item={item}
            answer={
              item
            }
            onChange={handleChange}
          />
        )}
        contentContainerStyle={styles.containerList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerList: {
    paddingHorizontal: 25,
    paddingTop: 25,
    gap: 25,
  },
});

export default memo(ParamsBlock);
