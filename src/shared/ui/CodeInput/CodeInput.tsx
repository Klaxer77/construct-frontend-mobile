import { Fonts } from "@/shared/assets/fonts/fonts-config";
import React, { RefObject, useState } from "react";
import { StyleSheet, View, Text, TextStyle, ViewStyle, TextInput } from "react-native";
import MaskInput from "react-native-mask-input";

interface CodeInputProps {
  values: string[];
  onChangeText: (text: string, index: number) => void;
  isError?: boolean; 
  inputStyles?: TextStyle; 
  containerStyle?: ViewStyle; 
  errorText?: string;
  inputRefs: RefObject<TextInput | null>[];
  [key: string]: any;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  values,
  inputRefs,
  onChangeText,
  isError = false,
  inputStyles = {},
  containerStyle = {},
  errorText = "Неверный код",
  ...rest
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from(Array(values.length).keys()).map((_, index) => {
        const isFocused = focusedIndex === index;

        return (
          <MaskInput
            key={index}
            style={[
              styles.input,
              inputStyles,
              isError && styles.inputError,
              isFocused && styles.inputFocus,
            ]}
            maxLength={1}
            autoFocus={index === 0}
            autoComplete="one-time-code"
            mask={[/\d/]}
            ref={inputRefs[index]}
            placeholder=""
            value={values[index] || ""}
            onChangeText={(text) => onChangeText(text, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            keyboardType="number-pad"
            {...rest}
          />
        );
      })}
      {isError && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    width: 48,
    height: 62,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    textAlign: "center",
    fontFamily: Fonts[700],
    fontSize: 36,
    letterSpacing: -1.6,
    marginHorizontal: 5,
  },
  inputFocus: {
    borderColor: "#FD8002",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
});