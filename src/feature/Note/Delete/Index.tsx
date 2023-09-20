import { DeleteNote } from "../api/Delete/DeleteNote";
import { GoTrash } from "react-icons/go";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";

type PropsType = {
  id: string;
}

export const NoteDeleteForm: React.FC<PropsType> = ({ id }) => {
  const navigation = useNavigate();
  const handleClick = useCallback(async () => {
    navigation("/");
    try {
      navigation("/");
      await DeleteNote(id);
      toast.success('削除できたよ。');
    } catch (error) {
      console.error(error);
      toast.error('なぜか削除できませんでした...')
    }
  }, [navigation, id]);

  return (
    <div>
      <span>削除しますか？</span>
      <IconButton aria-label="delete" size="small" onClick={handleClick}>
        <GoTrash />
      </IconButton>
    </div>
  );
};
