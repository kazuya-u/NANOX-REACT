import { Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { GetOptions, postData } from "../../../feature/Task/utils/Utils";
import { NoteBodyDataType, NoteFormData, TmpRelatedDataType } from "../type/Index";
import { toast } from "react-toastify";
import CreatableSelect from "react-select";
import Select from "react-select";

const Index: React.FC = () => {
  const { register, handleSubmit, control } = useForm<NoteFormData>();
  const onSubmit: SubmitHandler<NoteFormData> = async (data) => {
    const endpoint = `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/note`;
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
      <div>Add Note</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("title")}
          id="standard-basic"
          label="Note"
          variant="standard"
        />
        <Controller
          control={control}
          name="project"
          render={({ field: { onChange, value } }) => (
            <Select
              isClearable
              isSearchable
              onChange={onChange}
              value={value}
              options={GetOptions(
                `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name`
              )}
            />
          )}
        />
        <TextField
          {...register("description")}
          id="standard-textarea"
          label="Detail..."
          minRows={2}
          multiline
          placeholder="Placeholder"
          variant="standard"
        />
    <Controller
      control={control}
      name="tags"
      render={({ field }) => (
        <CreatableSelect
          {...field}
          isClearable
          isMulti
          isSearchable
          options={GetOptions(
            `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/taxonomy_term/tags?fields[taxonomy_term--tags]=name`
          )}
          placeholder="Tag"
        />
      )}
    />
        <Button type="submit">送信</Button>
      </form>
    </>
  );
};

export default Index;
