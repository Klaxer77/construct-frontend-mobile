import { PropsWithChildren } from 'react';
import { DimensionValue, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ScreenWrapper: React.FC<
  PropsWithChildren<{ center?: boolean, heigth?: DimensionValue | undefined, paddingBottom?: number}>
> = ({ children, center = false, heigth = "auto", paddingBottom = 0 }) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: top,
        height: heigth,
        paddingBottom: bottom + paddingBottom,
        justifyContent: center ? 'center' : 'flex-start',
        alignItems: center ? 'center' : 'flex-start',
        backgroundColor: 'white',
      }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};
