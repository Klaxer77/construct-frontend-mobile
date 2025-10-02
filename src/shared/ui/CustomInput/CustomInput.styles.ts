import { Fonts } from "@/shared/assets/fonts/fonts-config";
import { colors } from "@/shared/config/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1.1,
    borderRadius: 20,
    gap: 10,
    paddingLeft: 16,
    borderColor: "#E8E8E8",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    height: 74,
  },
  containerInput: {
    flex: 1,
  },
  span: {
    fontFamily: Fonts[600],
    letterSpacing: -0.3,
    fontSize: 12,
    top: 9,
    position: "absolute",
    lineHeight: 22,
    color: "#B9B9B9",
  },
  separator: {
    width: 1,
    marginTop: 14,
    marginBottom: 14,
    backgroundColor: "#E8E8E8", 
    height: 46,
  },
  input: {
    width: '100%',
    paddingTop: 34,
    paddingBottom: 14,
    lineHeight: 16,
    fontFamily: Fonts[700],
    letterSpacing: -0.4,
    fontSize: 16,
    paddingRight: 44,
  },
  iconLeft: {
    alignItems: "center", 
    justifyContent: "center",
  },
  clear: {
    position: "absolute",
    right: 5,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignContent: "center",
  },
  containerFocused: {
    borderColor: colors.blue
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 16,
    backgroundColor: colors.success
  },
  
});