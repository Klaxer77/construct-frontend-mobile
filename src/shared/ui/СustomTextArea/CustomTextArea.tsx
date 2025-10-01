import { Fonts } from "@/shared/assets/fonts/fonts-config";
import { Icon } from "@/shared/assets/icons/icons";
import { IconName } from "@/shared/assets/icons/types";
import { colors } from "@/shared/config/colors";
import React, { memo, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface TextareaFieldProps {
  label?: string;
  value: string;
  onChange: (text: string) => void;
  initialLines?: number;
  lineHeight?: number;
  secondary?: boolean,
  placeholder: string,
  titleInput?: boolean,
  disable?: boolean
  readonly?: boolean
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

const CustomTextArea: React.FC<TextareaFieldProps> = ({
  label,
  value,
  onChange,
  initialLines = 1,
  lineHeight = 22,
  placeholder,
  secondary,
  titleInput,
  disable,
  readonly = false,
  keyboardType
}) => {
  const [lines, setLines] = useState(initialLines);
  
  const handleContentSizeChange = (e: any) => {
    const contentHeight = e.nativeEvent.contentSize.height;
    const newLines = Math.max(initialLines, Math.ceil(contentHeight / lineHeight));
    if (newLines !== lines) setLines(newLines);
  };

  return (
    <View style={[styles.field, titleInput && styles.titleInputField]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.containerInput}>
        <TextInput
          keyboardType={keyboardType}
          readOnly={readonly}
          editable={!disable}
          style={[styles.input, secondary && styles.secondary, titleInput && styles.titleInput]}
          value={value}
          onChangeText={onChange}
          multiline
          numberOfLines={lines}
          onContentSizeChange={handleContentSizeChange}
          textAlignVertical="top"
          placeholderTextColor={secondary ? "#A0A0A5": titleInput? colors.blue : "#3D3D3D"}
          placeholder={placeholder}
        />
        {(!secondary && !disable) && <View style={styles.icon}>
          <Icon name={IconName.Pencil}/>
        </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(202, 200, 218, 0.2)",
  },
  titleInputField: {
    paddingBottom: 15,
    paddingTop: 10,
    borderBottomWidth: 0,
  },
  icon: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  containerInput: {
    position: "relative",
  },
  label: {
    fontSize: 14,
    letterSpacing: -0.2,
    fontFamily: Fonts[700],
    color: "#A0A0A5",
    marginBottom: 6,
  },
  input: {
    paddingRight: 32,
    fontSize: 16,
    fontFamily: Fonts[700],
    color: "#3D3D3D",
    textAlignVertical: "top",
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  titleInput: {
    fontFamily: Fonts[800],
    lineHeight: 24,
    textTransform: "uppercase",
    letterSpacing: -0.1,
    color: colors.blue
  },
  secondary: {
    fontSize: 14,
    letterSpacing: -0.2,
    fontFamily: Fonts[600],
  }
});

export default memo(CustomTextArea);