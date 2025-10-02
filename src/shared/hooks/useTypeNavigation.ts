import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/shared/types/root_stack.type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useTypeNavigation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return navigation;
};
