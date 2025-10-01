import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  Pressable,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import { ApiResponse, Icon, IconName, IUser } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Header from '@/widgets/Header/ui/Header';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';

type ObjectContractorRouteProp = RouteProp<
  ObjectStackParamList,
  'ObjectContractor'
>;

export interface Contractor extends IUser {
  "company": {
    "id": string,
    "title": string
  }
};


const ObjectContractorScreen: React.FC = () => {
  const { params } = useRoute<ObjectContractorRouteProp>();
  const { bottom } = useSafeAreaInsets();
  const navigation = useTypeNavigation();
  const [contractors, setContractors] = useState<Contractor[]>([])

  useEffect(() => {
    api.get<ApiResponse<Contractor[]>>(endpoints.users.contractors)
    .then((data) => {
      setContractors(data.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<Contractor | null>(null);

  const animatedHeight = useState(new Animated.Value(0))[0];

  const toggleDropdown = () => {
    if (dropdownOpen) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setDropdownOpen(false));
    } else {
      setDropdownOpen(true);
      Animated.timing(animatedHeight, {
        toValue: 250,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSelect = (item: Contractor) => {
    setSelected(item);
    toggleDropdown();
  };

  const handleUpload = () => {
    if (selected) {
      navigation.navigate('ObjectStack', {
        screen: 'ObjectActivation',
        params: {
          object: params.object,
          contractor: selected,
        },
      });
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <SafeAreaView edges={['left', 'right']}>
        <Header
          IconLeft={<Icon name={IconName.ArrowBack} />}
          onPressLeft={() => navigation.goBack()}
          title={'Активация'}
        />
      </SafeAreaView>
      <ScrollView
        contentContainerStyle={[
          styles.containerScroll,
          { paddingBottom: bottom + 120 },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{params?.object?.title}</Text>
            <Text style={styles.subtitle}>Выберите подрядчика для объекта</Text>
          </View>

          <Pressable style={styles.dropdownHeader} onPress={toggleDropdown}>
            <View style={styles.iconWrapper}>
              <Icon name={IconName.Town} />
            </View>

            <View style={styles.dropdownTextWrapper}>
              <Text style={styles.dropdownLabel}>Название</Text>
              <Text style={styles.dropdownValue}>{selected ? selected.company.title: 'Выберите'}</Text>
            </View>

            <Animated.View
              style={{
                transform: [
                  {
                    rotate: animatedHeight.interpolate({
                      inputRange: [0, 250],
                      outputRange: ['0deg', '-180deg'],
                    }),
                  },
                ],
              }}
            >
              <Icon name={IconName.ArrowDropDown} />
            </Animated.View>
          </Pressable>

          {dropdownOpen && (
            <Animated.View
              style={{ overflow: 'hidden', height: animatedHeight }}
            >
              {contractors.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.contractorItem}
                  onPress={() => handleSelect(item)}
                > 
                  <Text style={styles.contractorText}>{item.fio}</Text>
                  <Text style={styles.contractorText}>Строительная компания"{item.company.title}"</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}
        </View>

        <View style={styles.footer}>
          <CustomButton
            text="Отмена"
            styleText={[styles.buttonText, { color: '#FF3B30' }]}
            colorDefault="transparent"
            colorActive="#FF3B30"
            textColorDefault="#FF3B30"
            textColorActive="#FFFFFF"
            secondary
            styleButtonView={{ flex: 1 }}
            onPress={handleCancel}
          />
          <CustomButton
            disable={!selected}
            text="Далее"
            styleText={[styles.buttonText]}
            colorDefault="#007AFF"
            textColorDefault={'#fff'}
            colorActive="#0059FF"
            secondary
            styleButtonView={{ flex: 1 }}
            onPress={handleUpload}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    display: 'flex',
    paddingTop: 10,
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts[700],
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: Fonts[600],
    color: '#808080',
  },
  dropdownHeader: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconWrapper: {
    marginRight: 10,
  },
  dropdownTextWrapper: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#E8E8E8',
    paddingLeft: 10,
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#B9B9B9',
    fontFamily: Fonts[600],
  },
  dropdownValue: {
    fontSize: 18,
    color: '#7A7A7A',
    fontFamily: Fonts[600],
  },
  chevron: {
    fontSize: 16,
    color: '#333',
  },
  contractorItem: {
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 20,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  contractorText: {
    fontSize: 16,
    fontFamily: Fonts[600],
    color: '#7A7A7A',
  },
  error: {
    color: '#E02D3C',
    fontSize: 14,
    marginBottom: 8,
  },
  footer: {
    paddingHorizontal: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    width: '100%',
  },
  buttonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ObjectContractorScreen;
