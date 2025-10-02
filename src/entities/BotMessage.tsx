import { colors, Icon, IconName } from "@/shared"
import { Fonts } from "@/shared/assets/fonts/fonts-config"
import CustomButton from "@/shared/ui/CustomButton/CustomButton"
import { PulseSpinner } from "@/shared/ui/PulseSpinner/PulseSpinner"
import { memo } from "react"
import { StyleSheet, Text, View } from "react-native"

interface IBotMessageComment{
  status?: "initial" | "main" | "create" | "error",
  title?: string,
  subtitle?: string,
  numberComment?: number | null,
  buttonMainText?: string,
  buttonSecondaryText?: string,
  disable?: boolean,
  loading?: boolean,
  buttonMainCallback?: () => void,
  buttonSecondCallback?: () => void,
}

const BotMessageComment = ({
  status,
  title,
  subtitle,
  numberComment,
  buttonMainText,
  buttonSecondaryText,
  disable,
  loading,
  buttonMainCallback,
  buttonSecondCallback
}: IBotMessageComment) => {
  return <View style={[styles.container, status === "initial" && styles.initial]}>
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>{numberComment && <Text style={styles.number}>№{numberComment} </Text>}{title}</Text>
        <Text style={[styles.subtitle, status === "create" && styles.succesText, status === "error" && styles.error]}>{subtitle}</Text>
      </View>
      {status === "initial" && <Icon name={IconName.SendComment}/>}
    </View>
    {status === "main" &&
      <>
        {(buttonMainText || buttonSecondaryText) && <View style={styles.buttonContainer}>
          {buttonMainText && 
          <View style={styles.buttonWrapper}>
            <CustomButton loading={loading} loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={4} offset={6.5}/>} styleText={styles.buttonText} styleButton={styles.button} disable={disable} text={buttonMainText} onPress={buttonMainCallback}/>
          </View>
          }
          {buttonSecondaryText &&
          <View style={styles.buttonWrapper}>
            <CustomButton loading={loading} loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={4} offset={6.5}/>} styleText={styles.buttonText} styleButton={styles.button} disable={disable} text={buttonSecondaryText} onPress={buttonSecondCallback}/>
          </View>
          }
        </View>}
      </>
    }
    {status === "initial" &&
      <View style={styles.initialBlock}>
        <CustomButton styleButton={styles.button} styleText={styles.buttonText} disable={disable} text={buttonMainText} onPress={buttonMainCallback}/>
      </View>
    }
  </View>
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
    paddingBottom: 14,
    backgroundColor: "white",
    alignSelf: "flex-start",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    shadowColor: "#000",
    width: "100%",
    maxWidth: 307,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 16,

    elevation: 5,
  },
  initial: {
    maxWidth: 282,
  },
  header: {
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts[600],
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: -0.2,
    color: "#191818",
  },
  error: {
    color: colors.warning,
  },
  subtitle: {
    fontFamily: Fonts[600],
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: -0.2,
    color: "#A9A9A9",
  },
  number: {
    color: colors.blue
  },
  buttonContainer: {
    display: "flex",
    gap: 8,
    flexDirection: "row",
    width: "100%",
    flexBasis: 0,
    justifyContent: "space-between",
  },
  buttonWrapper: {
    flex: 1,
    flexBasis: 0,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.2,
    fontFamily: Fonts[600],
  },
  succesText: {
    color: colors.success,
  },
  initialBlock: {
    paddingTop: 14,
    borderWidth: 1,
    borderColor: "#FFF",
    borderTopColor: "rgba(0, 122, 255, 0.4)",
    marginTop: 6,
  }
})

export default memo(BotMessageComment)