import { colors, Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import React, { memo } from 'react';
import { StyleSheet, Dimensions, Image, View, Text, Pressable } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface IPopupChooseObject {
  isVisible: boolean,
  onClose: () => void,
  onPress?: () => void,
  title: string,
  check?: boolean,
  subtitle: string,
  fio: string,
  role: string,
}

const roles = {
  construction_control: "Строительный контроль",
  contractor: "Прораб",
  inspection: "Инспекция",
}

const LIST = [
  {
    icon: <Icon name={IconName.Chat}/>,
    title: "Чаты",
    subtitle: "Список доступных чатов",
    active: true,
  },
  {
    icon: <Icon name={IconName.Create}/>,
    title: "Создать запись",
    subtitle: "Отправить запись в журнал работ"
  },
  {
    icon: <Icon name={IconName.Access}/>,
    title: "Доступ",
    subtitle: "Запросить доступ к новому чату или журналу"
  },
]

export const PopupChooseObject = ({
  isVisible,
  onClose,
  onPress,
  title,
  subtitle,
  check,
  fio,
  role,
}: IPopupChooseObject) => {
  const { top, bottom } = useSafeAreaInsets();
  
  return (
      <ReactNativeModal
        isVisible={isVisible}
        animationIn="slideInLeft"
        coverScreen={true}
        style={[styles.modalContainer]}
        swipeDirection={"left"}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
      >
        <View style={[styles.modal, {paddingTop: top, paddingBottom: bottom}]}>
          <View style={styles.header}>
            <Image source={require("@/shared/assets/images/LogoGradient.png")}/>
            <View style={styles.headerText}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headerTitle}>
                {title}
              </Text>
              <Text style={styles.headerTitle}>
                {subtitle}
              </Text>
            </View>
            <Text style={styles.menu}>
              Меню
            </Text>
          </View>
          <View style={styles.main}>
            {LIST.map((item) => {
              return <View key={item.title} style={[styles.tab, item.active && styles.tabActive]}>
              {item.icon}
              <View>
                <Text style={[styles.tabTitle, item.active && styles.tabTextActvie]}>{item.title}</Text>
                <Text style={[styles.tabSubtitle, item.active && styles.tabTextActvie]}>{item.subtitle}</Text>
              </View>
            </View>
            })}
            
          </View>
          <View style={styles.footer}>
            {check && <View style={styles.tab}>
              <Icon name={IconName.Quit}/>
              <Pressable onPress={() => {onClose(); onPress && onPress()}}>
                <Text style={styles.tabTitle}>{"Выйти"}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.tabSubtitle}>{`Из ${title}`}</Text>
              </Pressable>
            </View>}
            <View style={styles.profile}>
              <View style={styles.profielImg}/>
              <View>
                <Text style={styles.profileFio}>{fio}</Text>
                {role && <Text style={styles.profileProf}>{roles[role as keyof typeof roles]}</Text> }
              </View>  
            </View>
          </View>
        </View>
      </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  modal: {
    width: width * 0.81,
    flexDirection: "column",
    justifyContent: "space-between",
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 14,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  header: {
    paddingLeft: 25,
  },
  img: {
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: Fonts[600],
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: "#6D6A6A",
  },
  headerText: {
    paddingTop: 18,
  },
  menu: {
    paddingTop: 30.68,
    paddingBottom: 10.68,
    fontFamily: Fonts[700],
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: -0.1,
    textTransform: "uppercase",
    color: "#B1B1B1",
  },
  main: {
    flex: 1,
  },
  tab: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    paddingLeft: 25,
    paddingVertical: 12,
    backgroundColor: "white",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 30,
  },
  profileFio: {
    fontFamily: Fonts[700],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.2,
    color: "#595959",
    maxWidth: 200,
  },
  profielImg: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#F1F1F1",
  },
  profileProf: {
    fontFamily: Fonts[600],
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.2,
    color: "#A0A0A5",
    maxWidth: 225,
    paddingTop: 2,
  },
  footer: {
    gap: 15,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  tabActive: {
    backgroundColor: colors.blue
  },
  tabTitle: {
    fontFamily: Fonts[700],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.2,
    color: "#595959",
  },
  tabTextActvie: {
    color: "#FFF"
  },
  tabSubtitle: {
    fontFamily: Fonts[600],
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.2,
    color: "#A0A0A5",
    maxWidth: 225,
    paddingTop: 2,
  }
});

export default memo(PopupChooseObject)