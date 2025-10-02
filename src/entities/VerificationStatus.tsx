import { colors, Status } from "@/shared"
import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { useCountdown } from "@/shared/hooks/useEndIso";
import CustomButton from "@/shared/ui/CustomButton/CustomButton";
import { PulseSpinner } from "@/shared/ui/PulseSpinner/PulseSpinner";
import { StyleSheet, Text, View } from "react-native"

interface IVerifiacationStatus {
  status: boolean,
  title?: string,
  subtitle?: string,
  endISO?: string,
  statusFetch: Status,
  onPress?: () => void
}

export const VerifiacationStatus = ({
  status = false,
  title,
  subtitle,
  statusFetch,
  endISO,
  onPress
}: IVerifiacationStatus) => {
  const { formatted } = useCountdown(endISO);
  
  return <View style={styles.wrapper}>
  <View style={[styles.container, status && styles.activeContainer]}>
    <Text style={[styles.status, status && styles.active]}>{!status ? "Не пройдена": "Активна"}</Text>
    {status && 
    <>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
      <Text style={styles.subtitle}>{subtitle} <Text style={styles.time}>{formatted}</Text></Text>
    </>
    }
  </View>
  {status &&
    <View style={styles.buttonContainer}>
      <CustomButton loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>} loading={statusFetch === "loading"} onPress={onPress} styleButton={styles.button} styleText={styles.buttonText} text="Завершить принудительно"/>
    </View>
  }
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 16 
  },
  button: {
    padding: 14,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.2,
    fontFamily: Fonts[800]
  },
  buttonContainer: {
    maxWidth: 218,
  },
  activeContainer: {
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    padding: 14,
    alignSelf: "flex-start",
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 5,
  },
  status: {
    color: colors.warning,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.2,
    fontFamily: Fonts[800]
  },
  title: {
    color: "#9FA1A6",
    fontSize: 16,
    lineHeight: 23,
    
    letterSpacing: -0.2,
    fontFamily: Fonts[600]
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.4,
    fontFamily: Fonts[700],
    color: "#808080",
  },
  active: {
    color: colors.success
  },
  time: {
    fontFamily: Fonts[600]
  },
  info: {
    
  }
})