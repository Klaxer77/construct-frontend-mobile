import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { getTabIcon } from './getTabIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, Text, View } from 'react-native';
import { styles } from './TabBar.styles';

export const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
  descriptors
}) => {
  const pb = useSafeAreaInsets().bottom;
  
  return (
    <View style={[styles.outer, { paddingBottom: pb }]}>
      <View
        style={[styles.container]}
      >
        <View style={styles.simpleBar}>
          {state.routes.map((route, index) => {
            const isActive = state.index === index;
            const { options } = descriptors[route.key];

            return (
              <Pressable
                style={styles.tabButton}
                onPress={() => navigation.navigate(route.name)}
                key={route.name}
              >
                {getTabIcon(route.name, isActive)}
                <Text style={[styles.text, isActive && styles.isActive]}>
                  {options.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};
