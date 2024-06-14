"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import useAxios from "@/hooks/useAxios";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";

const profileValidationSchema = yup.object({
  username: yup.string().required("El nombre de usuario es requerido"),
});

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    email: string;
    id: string;
    username: string;
  };
}

export default function EditProfileDialog({
  isOpen,
  onClose,
  userData,
}: EditProfileDialogProps) {
  const axios = useAxios();

  const formik = useFormik({
    initialValues: {
      username: userData.username,
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const res = await axios.put(`/users/`, values);
        signOut({
          callbackUrl:
            "/auth/login?callbackUrl=http%3A%2F%2Flocalhost%3A4000%2Fprofile",
        });
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Editar Perfil</DialogTitle>

      <IconButton
        aria-label="close"
        onClick={onClose}
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
        <DialogContentText>
          Para poder actualizar tu perfil, por favor ingresa tu nuevo nombre de
          usuario. La sesión actual se cerrará para aplicar los cambios.
        </DialogContentText>
        <TextField
          label="Nombre de usuario"
          id="username"
          name="username"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          sx={{ minWidth: { xs: "100%", md: "300px" }, mt: 3 }}
        />
      </DialogContent>
      <DialogActions>
        <Box display="flex" gap={2} width="100%">
          <Button
            variant="contained"
            color="primary"
            sx={{ alignSelf: "flex-start" }}
            onClick={(e) => formik.handleSubmit(e as any)}
          >
            Guardar cambios
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
