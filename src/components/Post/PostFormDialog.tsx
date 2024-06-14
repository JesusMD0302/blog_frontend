"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PostFormImageContainer from "./PostFormImageContainer";
import UploadImagesInput from "../Inputs/UploadImagesInput";
import { useFormik } from "formik";
import * as yup from "yup";
import useAxios from "@/hooks/useAxios";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export const createPostSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
});

interface NewPostDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  defaultValues?: Pick<Post, "title" | "content" | "images" | "id">;
}

export default function NewPostDialog({
  isOpen,
  handleClose,
  defaultValues,
}: NewPostDialogProps) {
  const axios = useAxios();
  const router = useRouter();
  const pathName = usePathname();

  const formik = useFormik({
    initialValues: {
      title: defaultValues?.title || "",
      content: defaultValues?.content || "",
      images: [],
    },
    validationSchema: createPostSchema,
    onSubmit: async (values, helpers) => {
      if (defaultValues) {
        const { images, ...newValues } = values;

        try {
          const res = await axios.put(`/posts/${defaultValues.id}`, newValues);
          helpers.resetForm();
          window.location.reload();
          handleClose();
        } catch (error) {
          if (error instanceof AxiosError) {
            const errors = error.response?.data.errors;

            if (errors) {
              errors.forEach((error: any) => {
                helpers.setFieldError(error.field, error.message);
              });
            }
          }

          console.error(error);
        }
        return;
      }

      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        for (const file of values.images) {
          formData.append("images", file);
        }

        const res = await axios.post("/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        helpers.resetForm();

        window.location.reload();
        handleClose();
      } catch (error) {
        if (error instanceof AxiosError) {
          const errors = error.response?.data.errors;

          if (errors) {
            errors.forEach((error: any) => {
              helpers.setFieldError(error.field, error.message);
            });
          }
        }

        console.error(error);
      }
    },
  });

  return (
    <Dialog open={isOpen} onClose={handleClose} component="article">
      <DialogTitle
        component="section"
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
      >
        {defaultValues ? "Editar publicación" : "Nueva publicación"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={{ width: "100%" }}>
        <form action="#">
          <TextField
            label="Titulo"
            id="title"
            name="title"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            label="Contenido"
            id="content"
            name="content"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          {!defaultValues && (
            <UploadImagesInput
              id="images"
              name="images"
              accept="image/png, image/jpg, image/jpeg"
              buttonTextContent="Subir Imagenes"
              multiple
              onChange={(e) => formik.setFieldValue("images", e.target.files)}
              onBlur={formik.handleBlur}
              error={formik.touched.images && Boolean(formik.errors.images)}
              helperText={formik.touched.images && formik.errors.images}
            />
          )}
        </form>

        {defaultValues && defaultValues.images.length > 0 && (
          <PostFormImageContainer
            postId={defaultValues.id}
            images={defaultValues.images}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Box display="flex" gap={2} width="100%">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ px: 4 }}
            onClick={(e) => formik.handleSubmit(e as any)}
            disabled={formik.isSubmitting}
          >
            {defaultValues ? "Editar" : "Publicar"}
          </Button>
          <Button onClick={handleClose} variant="outlined" sx={{ px: 4 }}>
            Cancelar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
