import { Fonts } from "@/shared/assets/fonts/fonts-config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  logo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 90,
  },
  container: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 4,
    flexDirection: "column",
    paddingTop: 88,
    justifyContent: "space-between",
  },
  containerInputs: {
    display: "flex",
    gap: 20,
  },
  checkboxContainer: {
    paddingTop: 25,
  },
  textCheckbox: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.4,
    fontFamily: Fonts[700],
    color: "#373737",
  },
  spanCheckbox: {
    color: "#7A7A7A",
    fontFamily: Fonts[600],
  },
  forgotPassword: {
    fontFamily: Fonts[700],
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: -0.4,
    color: "#373737",
    textDecorationLine: "underline",
    paddingTop: 20,
  },
  text: {
    paddingBottom: 22,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textEnter: {
    textAlign: "center"
  },
  agree: {
    fontSize: 15,
    fontFamily: Fonts[600],
    textDecorationLine: "underline",
    letterSpacing: 0.2,
    color: "#656972",
    textAlign: "center",
    paddingVertical: 15, 
  },
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 22,
  },
  button: {
    height: 56,
  }
})