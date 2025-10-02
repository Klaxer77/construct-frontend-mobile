import { useGetCurrentObject } from '@/features/auth/hooks/use-selectors';
import { Icon, IconName } from '@/shared';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { getCord } from '@/shared/utils/coordinates';
import Header from '@/widgets/Header/ui/Header';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YaMap, { Point, Polygon } from 'react-native-yamap';

const ObjectMapScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const currentObject = useGetCurrentObject()
  const objCoord = currentObject?  getCord(currentObject?.coords): null

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title={"Карта"}/>
        </SafeAreaView>
        <View style={styles.containerMain}> 
        <YaMap
          initialRegion={{
            lat: objCoord?.initialCoord.lat ?? 55.7558,
            lon: objCoord?.initialCoord.lon ?? 37.6173,
            zoom: 9,
          }}
          style={styles.containerMain}
        > 
            {objCoord?.polygon && (
              <Polygon
                points={objCoord?.polygon}
                strokeWidth={2}
                strokeColor="rgba(255,0,0,0.5)"
                fillColor="rgba(255,0,0,0.2)"
              />
            )}
            {objCoord?.multiPolygon &&
              objCoord?.multiPolygon.map((polygon: Point[], idx: number) => (
                <Polygon
                  key={idx}
                  points={polygon} // yamap ожидает массив объектов {lat, lon}
                  strokeWidth={2}
                  strokeColor="rgba(0,0,255,0.5)"
                  fillColor="rgba(0,0,255,0.2)"
                />
              ))}
        </YaMap>
        </View>
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

export default ObjectMapScreen;