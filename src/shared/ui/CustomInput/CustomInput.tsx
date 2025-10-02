import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from './CustomInput.styles';
import { ReactNode, useState } from 'react';
import { ClearIcon } from './Icons';
import { IconName } from '@/shared/assets/icons/types';
import { Icon } from '@/shared';

interface CustomInputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  disable?: boolean;
  placeholder?: string;
  IconLeft?: React.ComponentType<{ style?: object }>;
  icon?: ReactNode;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url';
  isSecure?: boolean;
  spanText?: string;
  checkEmail?: boolean;
  clearButton?: boolean;
}

export const CustomInput = ({
  value,
  icon,
  placeholder = '',
  checkEmail,
  clearButton,
  onChange,
  keyboardType,
  inputMode,
  isSecure,
  spanText,
  onBlur,
  disable,
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <View style={styles.iconLeft}>{icon}</View>
      <View style={styles.separator} />
      <View style={styles.containerInput}>
        <Text style={styles.span}>{spanText}</Text>
        <TextInput
          editable={disable}
          placeholderTextColor="#7A7A7A"
          keyboardType={keyboardType}
          inputMode={inputMode}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          secureTextEntry={isSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChangeText={onChange}
        />
      </View>
      {checkEmail && (
        <View style={styles.checkIcon}>
          <Icon width={10.8} height={10.08} name={IconName.Check} />
        </View>
      )}
      {clearButton && (
        <Pressable style={styles.clear} onPress={() => onChange('')}>
          <ClearIcon active={value.length > 0} />
        </Pressable>
      )}
    </View>
  );
};
