"use client";

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
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, helpers) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        helpers.setSubmitting(false);
        console.log(result.error);
        const error = JSON.parse(result.error);
        const errors = error.errors;
        if (!errors) {
          helpers.setErrors({ submit: error.message });
          return;
        }

        errors.forEach((error: any) => {
          helpers.setFieldError(error.field, error.message);
        });
      } else {
        helpers.setSubmitting(true);
        router.push(callbackUrl);
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
            Inicio de sesión
          </Typography>
        }
        subheader="Ingresa tus correo y contraseña para acceder a tu cuenta"
      />
      <CardContent>
        <Box component="form" display="flex" flexDirection="column" gap={2}>
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
            helperText={formik.touched.email ? formik.errors.email : ""}
          />
          <TextField
            label="Contraseña"
            id="password"
            name="password"
            type="text"
            placeholder="Ingresa tu contraseña"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password ? formik.errors.password : ""}
          />
          {formik.errors.submit && (
            <Typography color="error">{formik.errors.submit}</Typography>
          )}
          <Button
            color="primary"
            variant="contained"
            onClick={(e) => formik.handleSubmit(e as any)}
          >
            Iniciar sesión
          </Button>
        </Box>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="flex-end">
          <Link href="/auth/signup" passHref>
            <Button color="primary" variant="text">
              <Typography
                component="p"
                variant="button"
                color="black"
                sx={{ mr: 1 }}
              >
                ¿Aún no tienes una cuenta?
              </Typography>
              Regístrate
            </Button>
          </Link>
        </Box>
      </CardActions>
    </Card>
  );
}
