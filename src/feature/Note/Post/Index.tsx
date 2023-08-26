import { Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { GetOptions, postData } from "../../../feature/Task/utils/Utils";
import { NoteBodyDataType, NoteFormData, NoteRelatedData } from "../type/Index";
import { toast } from "react-toastify";
import CreatableSelect from "react-select";
import Select from "react-select";

const Index: React.FC = () => {

  const { register, handleSubmit, control } = useForm();

  const onSubmit: SubmitHandler<NoteFormData> = async (data) => {
    const endpoint = `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/note`;
    const accessToken = getAccessTokenFromLocalStorage();
    const headers = {
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${accessToken}`,
    };
    const bodyData: NoteBodyDataType = {
      data: {
        type: "node--note",
        attributes: {
          title: data.title,
          field_description: data.description,
        },
        relationships: {},
      },
    };
    
    const relatedData: NoteRelatedData[] = [];
    if (data.project && data.project.value) {
      relatedData.push({
        type: "taxonomy_term--project",
        id: data.project.value,
      });
    }
  
    const generateRelatedData = (value: string, type: string): NoteRelatedData => ({
      type,
      id: value,
    });
    if (data.tags && data.tags.length) {
      data.tags.forEach((tag) => {
        relatedData.push(generateRelatedData(tag.value, "taxonomy_term--tags"));
      });
    }
  
    relatedData.forEach((related) => {
      const relationshipKey = `field_ref_${related.type.split("--")[1]}`;
      bodyData.data.relationships[relationshipKey] = {
        data: related,
      };
    });

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
