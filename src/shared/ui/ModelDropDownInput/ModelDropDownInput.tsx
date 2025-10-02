import MersedesIcon from '@/screens/authStackScreens/RegisterScreen/Icons';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { ReactNode, useState } from 'react';
import { Controller } from 'react-hook-form';
import { TouchableOpacity, ScrollView, TextInput, View, Text, StyleSheet, Pressable } from 'react-native';
import IconDown from './Icons';

interface ModelDropdownInterface{
  // control из react hook form
  control: any, 
  name: string,
  inputLabel: string,
  disabled?: boolean,
  list: {label: string, value: string, icon?: ReactNode}[],
}

export const ModelDropdownInput = ({ control, name, disabled, inputLabel, list }: ModelDropdownInterface) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const filteredModels = list.filter(item =>
    item.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const selectedModel = list.find(item => item.value === value);
        
        return (
          <View style={styles.blockInput}>
            <Text style={styles.blockInputLabel}>{inputLabel}</Text>
            {/* иконка переделать потом */}
            {inputValue === "Mercedes" && 
            <View style={styles.icon}>
              <MersedesIcon/>
            </View>
            }
            {/* toggler */}
            <Pressable disabled={disabled} onPress={() => setIsVisible(prevState => !prevState)} style={styles.toggleInput}>
              <IconDown style={{ transform: [{ rotate: isVisible ?'180deg': "0deg" }] }}/>
            </Pressable>
            {/* Input поле */}
            <TextInput
              style={[styles.input, inputValue === "Mercedes" && styles.inputWithIcon]}
              placeholder=""
              value={selectedModel ? selectedModel.label : inputValue}
              onChangeText={(text) => {
                setInputValue(text);
                onChange(text);
              }}
              onFocus={() => setIsVisible(true)}
              onBlur={() => setTimeout(() => setIsVisible(false), 200)}
            />

            {/* Выпадающий список (появляется под полем ввода) */}
            {isVisible && (
              <View style={styles.dropdown}>
                <ScrollView 
                  style={styles.scrollView}
                  nestedScrollEnabled={true}
                >
                  {filteredModels.length > 0 ? (
                    filteredModels.map(item => (
                      <TouchableOpacity
                        key={item.value}
                        style={styles.option}
                        onPress={() => {
                          onChange(item.value);
                          setInputValue(item.label);
                          setIsVisible(false);
                        }}
                      > 
                        {item.icon && item.icon}
                        <Text style={styles.optionText}>{item.label}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>Ничего не найдено</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  blockInput: {
    position: 'relative',
  },
  icon: { 
    position: "absolute",
    top: 10,
    left: 20,
    zIndex: 2,
  },
  toggleInput: {
    position: "absolute",
    right: 0,
    zIndex: 2,
    width: 36,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  blockInputLabel: {
    position: "absolute",
    zIndex: 11,
    fontFamily: Fonts[600],
    fontSize: 12,
    lineHeight: 16,
    color: "rgba(27, 29, 33, 0.4)",
    letterSpacing: -0.2,
    top: -10,
    left: 16,
    backgroundColor: "white",
    paddingHorizontal: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(27, 29, 33, 0.1)",
    borderRadius: 16,
    color: "#040415",
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontFamily: Fonts[400],
    letterSpacing: -0.3,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  inputWithIcon: {
    paddingLeft: 51,
  },
  dropdown: {
    position: 'absolute',
    zIndex: 12,
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: "rgba(27, 29, 33, 0.1)",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 100,
  },
  scrollView: {
    flex: 1,
    position: 'relative',
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    gap: 10,
    zIndex: 3,
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    
    fontFamily: Fonts[400],
    letterSpacing: -0.3,
    fontSize: 14,
    color: "#040415",
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts[400],
    letterSpacing: -0.3,
    fontSize: 14,
    color: "#040415",
  },
});