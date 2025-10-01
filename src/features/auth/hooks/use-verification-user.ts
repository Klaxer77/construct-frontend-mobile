import { Status } from "@/shared"
import { useEffect } from "react"
import NfcManager, { NfcTech } from "react-native-nfc-manager";

interface IVerificationUser {
  status: Status;
  changeStatusVerification: (status: Status) => void
  handleSaveNfc: (nfc_uid: string) => void
}

export const useVerificationUser = ({
  changeStatusVerification,
  status,
  handleSaveNfc
}: IVerificationUser) => {

  async function readTag() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag?.id){
        console.warn(tag.id)
        handleSaveNfc(tag?.id)
      }
    } catch (ex) {
      throw new Error(`Ошибка NFC ${ex}`);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  useEffect(() => {
    if (status === "loading"){
      readTag()
      .then(() => {
        changeStatusVerification("received")
      })
      .catch((error) => {
        changeStatusVerification("rejected")
        console.log(error)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, changeStatusVerification])
}