import AuthService from "@/services/auth.service";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const LoginForm = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onToggleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const onLoginSubmit = async (data: FieldValues) => {
    try {
      const session = await AuthService.login(data as any);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${session.token}`;
     // router.push("/admin");
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <Container paddingTop={"4"}>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <FormControl marginTop={"4"}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register("email", {
              required: { message: "Campo obligatorio", value: true },
            })}
          />
          {errors.email && (
            <FormHelperText color={"red.500"}>
              {`* ${errors.email.message}`}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl marginTop={"4"}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: { message: "Campo obligatorio", value: true },
              minLength: {
                message: "La contraseña debe tener al menos 8 caracteres",
                value: 8,
              },
            })}
          />
          {errors.password && (
            <FormHelperText color={"red.500"}>
              {`* ${errors.password.message}`}
            </FormHelperText>
          )}
        </FormControl>
        <Box>
          <Checkbox
            checked={showPassword}
            onChange={onToggleShowPassword}
            marginTop={"4"}
            type="button"
          >
            Mostrar Contraseña
          </Checkbox>
        </Box>
        <Button type="submit" colorScheme="teal" marginTop={"4"}>
          Iniciar Sesión
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
