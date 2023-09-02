import { BASE_API_URL } from "../../../utils/EndPoint";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { DescriptionTextarea, ProjectSelect, SubmitButton, TagSelect, TitleInput } from "../../../feature/UserInterface/components/Input";
import { ExtractDefaultOptionData } from "../../../feature/Task/api/GetData";
import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { NoteBodyDataType, NoteFormData, TmpRelatedDataType } from "../type/Index";
import { patchData } from "../../../feature/Task/utils/Utils";
import { StyledModalForm } from "../../../feature/UserInterface/styles/components";
import { toast } from "react-toastify";
import { useGetNoteDefaultValue } from "../../../utils/api/useGetDefaultValue";
import { useParams } from "react-router-dom";

const dataParams =
  "?include=field_ref_project,field_ref_tags&fields[node--note]=name,title,created,field_description&fields[taxonomy_term--project]=name&fields[taxonomy_term--tags]=name";

const Index: React.FC = () => {
  const methods = useForm<NoteFormData>();
  const pageParams = useParams();
  const pageId = typeof pageParams.NoteId !== "undefined" ? pageParams.NoteId : "";
  const onSubmit: SubmitHandler<NoteFormData> = async (data) => {
    const endpoint = `${BASE_API_URL
      }/jsonapi/node/note/${pageParams.NoteId}`;
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
        id: pageId,
        type: "node--note",
        attributes: {
          title: data.title,
          field_description: data.description,
        },
        relationships: relatedData,
      },
    };
    try {
      await patchData(endpoint, headers, bodyData);
      toast.success(`Noteの投稿に成功しました。${data.title}`);
    } catch (error) {
      console.error("Nodeの投稿に失敗しました。", error);
      toast.error("Nodeの投稿に失敗しました。");
    }
  };

  // About default value.
  const { TitleDefaultValue, DescriptionDefaultValue, ProjectDefaultValue, TagsDefaultValue, isLoading } = useGetNoteDefaultValue(pageId, dataParams);

  if (!isLoading) {
    return (
      <>
        <FormProvider {...methods}>
          <StyledModalForm onSubmit={methods.handleSubmit(onSubmit)}>
            <TitleInput defaultValue={TitleDefaultValue} />
            <ProjectSelect defaultValue={ExtractDefaultOptionData(ProjectDefaultValue[0])} />
            <DescriptionTextarea defaultValue={DescriptionDefaultValue} />
            <TagSelect defaultValue={TagsDefaultValue} />
            <SubmitButton />
          </StyledModalForm>
        </FormProvider>
      </>
    );
  }
  return (
    <>
      読み込み中...
    </>
  )
};

export default Index;
