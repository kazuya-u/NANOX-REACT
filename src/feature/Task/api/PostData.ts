import { ActionFunction } from "react-router-dom";

const baseURL = "http://drupal.sandbox.dev.lando/jsonapi/node/task/";

export const action: ActionFunction = async ({ request, params }) => {
  const data = Object.fromEntries(await request.formData());

  const res = await fetch(`${baseURL}${params.taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    body: JSON.stringify({
      data: {
        type: "node--task",
        id: params.taskId,
        attributes: {
          title: data.title,
          field_description: data.description,
        },
      },
    }),
  });
  const task = await res.json();
  return { task };
};
