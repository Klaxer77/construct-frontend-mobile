import { IForm } from "@/screens/ObjectStackScreens/ObjectTalksScreen/ObjectTalksScreen";
import { parseDateToISO } from "./formatDate";

export const buildFormData = (formsBuild: IForm[]): FormData => {
  const formData = new FormData();
  
  const userData = formsBuild.map((formBuild) => {
    const photosKeys: string[] = [];

    if (formBuild.files) {
        formBuild.files.forEach((file) => {
          // const fileExt = file.fileName?.split(".").pop() || "jpg";

          photosKeys.push(file.fileName ?? "");

          formData.append("files", {
            uri: file.uri,
            type: file.type || "image/jpeg",
            name: file.fileName,
          } as any);
        });
      }

      return {
        violations: formBuild.violations,
        name_regulatory_docx: formBuild.nameDocument,
        expiration_date: parseDateToISO(formBuild.date),
        comment: formBuild.comment,
        photos_keys: photosKeys,
      };
    });

    formData.append("user_data", JSON.stringify(userData));
    console.log(formData)
    return formData;
  };