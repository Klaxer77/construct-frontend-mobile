import { Fonts } from "@/shared/assets/fonts/fonts-config"
import CustomButton from "@/shared/ui/CustomButton/CustomButton"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native"
import Svg, { Path } from "react-native-svg"

interface ISuccesSendForm{
  title: string,
  subtitle: string,
  text: string,
  link: string,
}

export const SuccesSendForm = ({
  title,
  subtitle,
  text,
  link,
}: ISuccesSendForm) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.dispatch(state => {
    const targetIndex = state.routes.findIndex(r => r.name === link);

    if (targetIndex === -1) {
      // если экрана нет в стеке, тогда обычный navigate
      return CommonActions.navigate(link);
    }

    const routes = state.routes.slice(0, targetIndex + 1);

    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });
  }

  return <View style={styles.main}> 
    <Svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    >
      <Path
        d="M43.32 20.88l-1.96 8.36c-1.68 7.22-5 10.14-11.24 9.54-1-.08-2.08-.26-3.24-.54l-3.36-.8c-8.34-1.98-10.92-6.1-8.96-14.46l1.96-8.38c.4-1.7.88-3.18 1.48-4.4 2.34-4.84 6.32-6.14 13-4.56l3.34.78c8.38 1.96 10.94 6.1 8.98 14.46z"
        stroke="#007AFF"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M30.12 38.78c-1.24.84-2.8 1.54-4.7 2.16l-3.16 1.04c-7.94 2.56-12.12.42-14.7-7.52L5 26.56c-2.56-7.94-.44-12.14 7.5-14.7l3.16-1.04c.82-.26 1.6-.48 2.34-.62-.6 1.22-1.08 2.7-1.48 4.4l-1.96 8.38c-1.96 8.36.62 12.48 8.96 14.46l3.36.8c1.16.28 2.24.46 3.24.54zM25.28 17.06l9.7 2.46M23.321 24.8l5.8 1.48"
        stroke="#007AFF"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Text style={styles.text}>{text}</Text>
    <View style={styles.buttonContainer}>
      <CustomButton styleText={styles.buttonText} text="Вернуться" onPress={handlePress} styleButton={styles.button}/>
    </View>
  </View>
}


const styles = StyleSheet.create({
  main: {
      gap: 10,
      paddingTop: 210,
    },
    title: {
      fontSize: 26,
      lineHeight: 34,
      letterSpacing: -0.4,
      fontFamily: Fonts[700]
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: -0.4,
      fontFamily: Fonts[600],
      color: "#585757",
    },
    button: {
      paddingHorizontal: 36.5,
      paddingVertical: 14,
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: -0.4,
      fontFamily: Fonts[600],
      color: "#A0A0A5",
    },
    buttonContainer: {
      paddingTop: 9,
      width: 167.5,
    },
    buttonText: {
      fontSize: 18,
      lineHeight: 28, 
      letterSpacing: -0.4, 
      fontFamily: Fonts[600],
    }
})