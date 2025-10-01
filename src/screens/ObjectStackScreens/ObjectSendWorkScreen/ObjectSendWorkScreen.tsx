import { useClearStatus } from "@/features/listObjects/hook/use-actions";
import { ObjectStackParamList } from "@/shared/types/root_stack.type";
import { SuccesSendForm } from "@/widgets/SuccesSendForm/SuccessSendForm";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ObjectRouteProp = RouteProp<
  ObjectStackParamList,
  "ObjectSendWork"
>;

const ObjectSendWorkScreen: React.FC = () => {
  const { params } = useRoute<ObjectRouteProp>();
  const clearStatus = useClearStatus()

  useEffect(() => {
    clearStatus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  return <SafeAreaView style={styles.container}>
    <SuccesSendForm {...params}/>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
})

export default ObjectSendWorkScreen