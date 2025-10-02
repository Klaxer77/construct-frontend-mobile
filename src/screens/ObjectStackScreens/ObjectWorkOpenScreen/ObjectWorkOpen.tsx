import { Icon, IconName } from '@/shared';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


type ObjectRouteProp = RouteProp<
  ObjectStackParamList,
  "ObjectWorkOpen"
>;

const ObjectWorkOpenScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const { params } = useRoute<ObjectRouteProp>();
  
  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title={params.title ? params.title: 'Объекты'}/>
        </SafeAreaView>
        {/* <ScrollView contentContainerStyle={styles.container}>
            
        </ScrollView> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  
  container: {
    paddingHorizontal: 18,
    gap: 10,
    paddingTop: 11,
  },
})

export default ObjectWorkOpenScreen;