import { View } from 'react-native';
import { ScreenWrapper, Typography } from '@/shared/ui';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { useEffect, useState } from 'react';
import { styles } from './LoginScreen.style';
import { Text } from 'react-native-gesture-handler';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import { CustomInput } from '@/shared/ui/CustomInput/CustomInput';
import { Icon, IconName } from '@/shared';
import Checkbox from '@/shared/ui/Checkbox/Checkbox';
import { PulseSpinner } from '@/shared/ui/PulseSpinner/PulseSpinner';
import { endpoints } from '@/shared/config/endpoints';
import { api } from '@/shared/config/api';
import { useLoginAuth } from '@/features/auth/hooks/use-actions';
import { useStatusAuth } from '@/features/auth/hooks/use-selectors';

const roles = {
  construction_control: "Строительный контроль",
  contractor: "Прораб",
  inspection: "Инспекция",
}

const LoginScreen: React.FC = () => {
  const navigation = useTypeNavigation();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [disable, setDisable] = useState(true)
  const [chekbox, setCheckbox] = useState(false)
  const [role, setRole] = useState("")
  const {loginUser} = useLoginAuth()
  const status = useStatusAuth()

  useEffect(() => {
    if (email.length > 0 && password.length > 0){
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [email, password])

  const handleBlurEmail = () => {
    api.get(endpoints.users.role(email))
    .then((data) => {
      setRole(data.data.data.role);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    if (status === "received"){
      navigation.navigate("main")
    }
  }, [status, navigation])

  const handlePress = () => {
    loginUser({email: email, password: password})
  }
  
  return (
      <ScreenWrapper heigth={"100%"}>
        <View style={styles.container}>
          <View>
            <View style={[styles.logo]}>
              <Icon name={IconName.Logo}/>
            </View>
            <View>
              <View style={styles.text}>
                <Typography color='#373737' font={700} letterSpacing={-0.4} fontSize={30}>Добро пожаловать!</Typography>
                <Typography style={styles.textEnter} color='#7A7A7A' lineHeight={26} font={600} letterSpacing={-0.4} fontSize={16}>Введите свои данные для входа</Typography>
              </View>
              <View style={styles.containerInputs}>
                <CustomInput onBlur={handleBlurEmail} inputMode="email" keyboardType="email-address" checkEmail={!!role} icon={<Icon name={IconName.Email}/>} spanText='Email' placeholder='Введите вашу почту' value={email}  onChange={setEmail}/>
                <CustomInput icon={<Icon name={IconName.Password}/>} spanText='Пароль' placeholder='Введите пароль' isSecure value={password}  onChange={setPassword}/>
                {role && <CustomInput disable icon={<Icon name={IconName.Role}/>} spanText='Роль' placeholder={roles[role as keyof typeof roles]} value={""}  onChange={() => {}}/>}
              </View>
              <View style={styles.checkboxContainer}>
                <Checkbox 
                onPress={() => setCheckbox((prevState) => !prevState)} 
                value={chekbox} 
                text={<Text style={styles.textCheckbox}>
                  Запомнить меня <Text style={styles.spanCheckbox}>(5 дней)</Text>
                </Text>} />
              </View>
              <Text style={styles.forgotPassword}>Забыли пароль?</Text>
            </View>
          </View>
          <View>
            <View style={styles.buttonContainer}>
              <CustomButton styleButton={styles.button} loading={status=== "loading"} loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>} disable={disable}  text='Продолжить' onPress={handlePress}/>
            </View>
          </View>
        </View>
      </ScreenWrapper>
  );
};

export default LoginScreen;
