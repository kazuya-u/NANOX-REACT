import { BASE_API_URL } from "../../../utils/EndPoint";
import { DescriptionTextarea, ProjectSelect, SubmitButton, TagSelect, TitleInput } from "../../../feature/UserInterface/components/Input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { NoteBodyDataType, NoteFormData, TmpRelatedDataType } from "../type/Index";
import { postData } from "../../../utils/api/Utils";
import { StyledModalForm } from "../../../feature/UserInterface/styles/components";
import { toast } from "react-toastify";

const NoteForm: React.FC = () => {
  const methods = useForm<NoteFormData>();
  const onSubmit: SubmitHandler<NoteFormData> = async (data) => {
    const endpoint = `${BASE_API_URL}/jsonapi/node/note`;
    const accessToken = getAccessTokenFromLocalStorage();
    const headers = {
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${accessToken}`,
    };
    const TmpRelatedData: TmpRelatedDataType[] = [];
    if (data.project && data.project.value) {
      TmpRelatedData.push({
        type: "taxonomy_term--project",
        id: data.project.value,
      });
    }
    const generateRelatedData = (
      value: string,
      type: string
    ): TmpRelatedDataType => ({
      type,
      id: value,
    });
    if (data.tags && data.tags.length) {
      data.tags.forEach((tag) => {
        TmpRelatedData.push(
          generateRelatedData(tag.value, "taxonomy_term--tags")
        );
      });
    }
    
    const relatedData = {
      field_ref_project: {
        data: TmpRelatedData.filter(
          (item) => item.type === "taxonomy_term--project"
        )[0],
      },
      field_ref_tags: {
        data: TmpRelatedData.filter(
          (tag) => tag.type === "taxonomy_term--tags"
        ).map((tag) => ({
          type: tag.type,
          id: tag.id,
        })),
      },
    };
    const bodyData: NoteBodyDataType = {
      data: {
        type: "node--note",
        attributes: {
          title: data.title,
          field_description: data.description,
        },
        relationships: relatedData,
      },
    };

    try {
      await postData(endpoint, headers, bodyData);
      toast.success(`Noteの投稿に成功しました。${data.title}`);
    } catch (error) {
      console.error("Nodeの投稿に失敗しました。", error);
      toast.error("Nodeの投稿に失敗しました。");
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <StyledModalForm onSubmit={methods.handleSubmit(onSubmit)}>
          <TitleInput />
          <ProjectSelect />
          <DescriptionTextarea />
          <TagSelect />
          <SubmitButton />
        </StyledModalForm>
      </FormProvider>
    </>
  );
};

export default NoteForm;
