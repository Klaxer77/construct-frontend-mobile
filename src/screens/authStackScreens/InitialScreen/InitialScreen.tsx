import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Icon, IconName } from "@/shared"
import { PulseSpinner } from "@/shared/ui/PulseSpinner/PulseSpinner"
import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { useEffect } from "react"
import { useTypeNavigation } from "@/shared/hooks/useTypeNavigation"
import { useCurrentUser } from "@/features/auth/hooks/use-actions"
import { useStatusAuth } from "@/features/auth/hooks/use-selectors"

const InitialScreen: React.FC = () => {
  const navigate = useTypeNavigation()
  const { getCurrentUser } = useCurrentUser()
  const status = useStatusAuth();
  
  useEffect(() => {
    getCurrentUser()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (status === "received"){
      navigate.navigate("main")
    } else if (status === "rejected") {
      navigate.navigate("authStack", {screen: "Auth"})
    }
  }, [status, navigate])

  return <ImageBackground style={{ flex: 1 }}
    resizeMode="cover"  source={require("@/shared/assets/images/back.png")}>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name={IconName.LogoToolls}/>
      </View>
      <View style={styles.main}>
        <Image source={require("@/shared/assets/images/logoInitialState.png")}/>
      </View>
      <View style={styles.footer}>
        <View style={styles.spinner}>
          <PulseSpinner backgroundColorSecondary="#3A3A3A" backgroundColorMain="white" offset={10} size={7.58}/>
        </View>
        <Text style={styles.footerText}>Система управления строительством</Text>
      </View>
    </SafeAreaView>
  </ImageBackground>
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  spinner: {
    width: 45.5,
    height: 45.5,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    alignItems: 'center', 
    justifyContent: "center",
    gap: 17.5,
  },
  footerText: {
    color: "#FFFFFF",
    fontFamily: Fonts[700],
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.4,
  }
})

export default InitialScreen