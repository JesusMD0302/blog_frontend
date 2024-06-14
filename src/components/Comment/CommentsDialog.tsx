import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon, Send as SendIcon } from "@mui/icons-material";
import CommentsContainer from "@/components/Comment/CommentsContainer";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import useAxios from "@/hooks/useAxios";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

const commentsValidationSchema = yup.object({
  content: yup.string().required("El comentario es requerido"),
});

interface CommentsDialogProps {
  idPost: string;
  comments: {
    author: {
      username: string;
    };
    createdAt: string;
    content: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
}

export default function CommentsDialog({
  idPost,
  comments,
  isOpen = false,
  onClose = () => {},
}: CommentsDialogProps) {
  const { data } = useSession();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const axios = useAxios();

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: commentsValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const res = await axios.post(`/posts/${idPost}/comments/`, values);
        helpers.resetForm();
        onClose();
        window.location.reload();
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

  const handleClose = onClose;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Comentarios</DialogTitle>
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
      <DialogContent dividers>
        <CommentsContainer comments={comments} />
      </DialogContent>
      <DialogActions>
        <Box display="flex" component="form" gap={2} width="100%">
          {data ? (
            <>
              <TextField
                label="Comentario"
                name="content"
                onChange={formik.handleChange}
                value={formik.values.content}
                onBlur={formik.handleBlur}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                fullWidth
              />
              <Button
                onClick={(e) => formik.handleSubmit(e as any)}
                variant="contained"
                sx={{ px: 4 }}
              >
                {matches ? "Enviar" : ""}{" "}
                <SendIcon sx={{ ml: matches ? 2 : 0 }} />
              </Button>
            </>
          ) : (
            <Link href="/auth/login" passHref style={{ width: "100%" }}>
              <Button variant="contained" sx={{ px: 4 }} fullWidth>
                Inicia sesión para comentar
              </Button>
            </Link>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
