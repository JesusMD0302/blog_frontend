"use client";

import useAxios from "@/hooks/useAxios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const signUpValidationSchema = yup.object({
  email: yup
    .string()
    .email("El email ingresado no es valido")
    .required("El email es requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
    )
    .required("La contraseña es requerida"),
  username: yup
    .string()
    .required("El nombre de usuario es requerido")
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "El nombre de usuario no puede contener caracteres especiales"
    ),
});

export default function SignUpForm() {
  const axios = useAxios();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const res = await axios.post("/auth/signup", values);

        signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        router.push("/");
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
    <Card
      component="section"
      sx={{ borderRadius: (theme) => theme.shape.borderRadius }}
    >
      <CardHeader
        title={
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
            Registrar cuenta
          </Typography>
        }
        subheader="Ingresa tus datos para crear una nueva cuenta"
      />
      <CardContent>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            label="Nombre de usuario"
            id="username"
            name="username"
            placeholder="Ingresa tu nombre de usuario"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            label="Correo electrónico"
            id="email"
            name="email"
            type="email"
            placeholder="Ingresa tu correo electrónico"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Contraseña"
            id="password"
            name="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" type="submit">
            Registrarte
          </Button>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="flex-end">
          <Link href="/auth/login" passHref>
            <Button color="primary" variant="text">
              <Typography
                component="p"
                variant="button"
                color="black"
                sx={{ mr: 1 }}
              >
                ¿Ya tienes una cuenta?
              </Typography>
              Inicia sesión
            </Button>
          </Link>
        </Box>
      </CardActions>
    </Card>
  );
}
