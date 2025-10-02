import ReceiverMessage from '@/entities/ReceiverMessage';
import SenderMessage from '@/entities/SenderMessage';
import { Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { MessageComposer } from '@/widgets';
import Header from '@/widgets/Header/ui/Header';
import { useState } from 'react';
import { FlatList, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IMessage {
  time: string,
  title: string,
  id: string,
  type: string,
  img?: string
}

const ChatTalksScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const [messages, setMessages] = useState<IMessage[]>([
    { time: '00:30', title: 'Привет!', id: "0", type: "sender" },
    { time: '00:31', title: 'Как дела?', id: "1", type: "sender" },
  ]);

  const sendMessage = (value: string) => {
    if (value.trim() === '') return;
    setMessages(prev => [...prev, { time: getCurrentTime(), title: value, id: `${messages.length}`, type: "recieved" }]);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  
  return (
    <>
    <ImageBackground
        source={require("@/shared/assets/images/BackImg.png")}
        style={styles.containerMain}
        resizeMode="cover"
      >
      <KeyboardAvoidingView
        style={styles.containerSecondary}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.containerMain}>
          
            <SafeAreaView style={styles.safeContainer} edges={["left", "right", "top"]}>
              <Header styleHeader={styles.containerHeader} style={styles.header} IconRigth={<Icon name={IconName.Settings}/>} IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title="Чат">
                <View style={styles.headerContainer}>
                  <Icon width={36} height={36} name={IconName.Logo}/>
                  <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>Разговорный чат</Text>
                    <Text style={styles.headerSubtitle}>4 онлайн</Text>
                  </View>
                </View>
              </Header>
            </SafeAreaView>
            <SafeAreaView style={styles.container} edges={["left", "right"]}>
              <View
                style={styles.containerSecondary}
              >
                <FlatList
                  data={[...messages].reverse()}
                  inverted
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return item.type === "sender" ? <SenderMessage {...item}/>: <ReceiverMessage {...item}/>
                  }}
                  contentContainerStyle={styles.containerListMessage}
                />
                <SafeAreaView style={styles.safeContainer} edges={["bottom"]}>
                  <View style={styles.containerInput} >
                    <MessageComposer sendMessage={sendMessage}/>
                  </View>
                </SafeAreaView>
              </View>
            </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,      
  },
  
  containerSecondary: {
    flex: 1,
    position: "relative",
  },
  backContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    flex: 1,
    display: "flex",
    flexDirection: 'row',
    gap: 12,
    alignItems: "center",
    paddingLeft: 10,
  },
  containerHeader: {
    maxWidth: 343,
  },
  safeContainer: {
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.01,
    shadowRadius: 28,
    elevation: 3,
  },
  headerText: {

  },
  headerTitle: {
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: -0.2,
    fontFamily: Fonts[800],
    color: "#595959",
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.2,
    fontFamily: Fonts[600],
    color: "#A0A0A5",
  },
  container: {
    flex: 1,
  },
  backImg: {
    position: "absolute",
    top: -20,
    left: -20,
    width: 500,
    zIndex: -1,
    height: 800,

  },
  containerListMessage: {
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 46,
  },
  containerInput: {
    paddingVertical: 16,
    paddingTop: 14,
    paddingBottom: 4,
    height: 52,
    paddingHorizontal: 14,
    width: "100%",
    backgroundColor: "white"
  }
})

export default ChatTalksScreen;