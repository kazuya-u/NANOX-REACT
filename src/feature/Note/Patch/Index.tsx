import { BASE_API_URL } from "../../../utils/EndPoint";
import { ChangeEvent, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ExtractDefaultOptionData, GetOptions } from "../../../feature/Task/api/GetData";
import { getAccessTokenFromLocalStorage } from "../../../feature/AuthUser/utils/LocalStorageUtils";
import { NoteBodyDataType } from "../type/Index";
import { patchData } from "../../../feature/Task/utils/Utils";
import { StyledModalForm } from "../../../feature/UserInterface/styles/components";
import { TextField } from "@mui/material";
import { useGetNoteDefaultValue } from "../../../utils/api/useGetDefaultValue";
import { useParams } from "react-router-dom";
import Select from "react-select";

const dataParams =
  "?include=field_ref_project,field_ref_tags&fields[node--note]=name,title,created,field_description&fields[taxonomy_term--project]=name&fields[taxonomy_term--tags]=name";

const Index: React.FC = () => {
  const { control } = useForm();
  const pageParams = useParams();
  const pageId = typeof pageParams.NoteId !== "undefined" ? pageParams.NoteId : "";
  const [title, setTitle] = useState<string>('');
  const [draftTimer, setDraftTimer] = useState<number | null>(null);
  const TitleSubmit = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(draftTimer || undefined);
    const newTimer = setTimeout(() => {
      setTitle(e.target.value);
      const endpoint = `${BASE_API_URL}/jsonapi/node/note/${pageParams.NoteId}`;
      const accessToken = getAccessTokenFromLocalStorage();
      const headers = {
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${accessToken}`,
      };
      const bodyData: NoteBodyDataType = {
        data: {
          id: pageId,
          type: "node--note",
          attributes: {
            title: e.target.value,
          },
        },
      };
      patchData(endpoint, headers, bodyData);
    }, 1000);
    setDraftTimer(newTimer);
  }, [draftTimer, pageId, pageParams.NoteId]);

  const DescriptionSubmit = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(draftTimer || undefined);
    const newTimer = setTimeout(() => {
      setTitle(e.target.value);
      const endpoint = `${BASE_API_URL}/jsonapi/node/note/${pageParams.NoteId}`;
      const accessToken = getAccessTokenFromLocalStorage();
      const headers = {
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${accessToken}`,
      };
      const bodyData: NoteBodyDataType = {
        data: {
          id: pageId,
          type: "node--note",
          attributes: {
            field_description: e.target.value,
          },
        },
      };
      patchData(endpoint, headers, bodyData);
    }, 1000);
    setDraftTimer(newTimer);
  }, [draftTimer, pageId, pageParams.NoteId]);

  type ProjectFormType = {
    label: string;
    value: string;
  }

  const ProjectSubmit = async (data: ProjectFormType) => {
    const endpoint = `${BASE_API_URL
      }/jsonapi/node/note/${pageParams.NoteId}`;
    const accessToken = getAccessTokenFromLocalStorage();
    const headers = {
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${accessToken}`,
    };
    const bodyData: NoteBodyDataType = {
      data: {
        id: pageId,
        type: "node--note",
        relationships: {
          "field_ref_project": {
            "data": {
              "type": "taxonomy_term--project",
              "id": data.value,
            }
          }
        },
      },
    };
    await patchData(endpoint, headers, bodyData);
  };
  
  type TagFormType = {
    label: string;
    value: string;
  }
  const TagsSubmit = async (data: TagFormType) => {
    const endpoint = `${BASE_API_URL
      }/jsonapi/node/note/${pageParams.NoteId}`;
    const accessToken = getAccessTokenFromLocalStorage();
    const headers = {
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${accessToken}`,
    };
    let values;
    if (Array.isArray(data)) {
      values = {
        data: data.map(item => ({
          type: "taxonomy_term--project",
          id: item.value,
        })),
      };
    } else {
      values = {
        data: {
          type: "taxonomy_term--project",
          id: data.value,
        },
      };
    }
    const bodyData: NoteBodyDataType = {
      data: {
        id: pageId,
        type: "node--note",
        relationships: {
          "field_ref_tags": values,
        },
      },
    };
    await patchData(endpoint, headers, bodyData);
  };

  // About default value.
  const { TitleDefaultValue, DescriptionDefaultValue, ProjectDefaultValue, TagsDefaultValue, isLoading } = useGetNoteDefaultValue(pageId, dataParams);

  if (!isLoading) {
    return (
      <>
        <StyledModalForm>
          <TextField
            id="standard-basic"
            label="What is the Task's name..."
            variant="standard"
            defaultValue={TitleDefaultValue || ''}
            onChange={TitleSubmit}
          >{title}</TextField>

          <Controller
            control={control}
            name="project"
            render={({ field: { value } }) => (
              <Select
                defaultValue={ExtractDefaultOptionData(ProjectDefaultValue[0])}
                isSearchable
                onChange={ProjectSubmit}
                value={value}
                options={GetOptions(
                  `${BASE_API_URL}/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name`
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { value } }) => (
              <TextField
                id="standard-multiline-static"
                label="Detail..."
                rows={4}
                multiline
                placeholder="Placeholder"
                variant="standard"
                defaultValue={DescriptionDefaultValue || ''}
                value={value}
                onChange={DescriptionSubmit}
              />
            )}
          />
          <Controller
            control={control}
            name="tags"
            render={({ field: { value } }) => (
              <Select
                defaultValue={TagsDefaultValue}
                isClearable
                isMulti
                isSearchable
                value={value}
                onChange={TagsSubmit}
                options={GetOptions(
                  `${BASE_API_URL}/jsonapi/taxonomy_term/tags?fields[taxonomy_term--tags]=name`
                )}
                placeholder="Tag"
              />
            )}
          />
        </StyledModalForm>
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
