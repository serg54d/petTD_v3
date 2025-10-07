import { CustomButton } from "@/common/components";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { loginTC } from "../model/auth-slice";

import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputs, loginSchema } from "../lib/schemas/loginSchema";

export const Login = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "all",
  });
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    dispatch(loginTC(data));
    reset();
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ minHeight: "100vh" }}
    >
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                margin="normal"
                type="email"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                margin="normal"
                type="password"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e, checked) => field.onChange(checked)}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                }
                label="Remember me"
              />
            )}
          />

          <CustomButton variant="contained" color="primary" type="submit">
            Login
          </CustomButton>
        </FormGroup>
      </FormControl>
    </Grid>
  );
};
