import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CustomButton } from "./Button";
import { Path } from "../routing";

export const NotFound = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            textAlign: "center",
            padding: 2,
          }}
        >
          <Typography fontSize={"3rem"} variant="h1">
            404 Not found
          </Typography>
          <Typography variant="subtitle1">
            Страница не найдена, вы можете вернуться на главную страницу
          </Typography>
          <CustomButton variant={"contained"} size="large" to={Path.main}>
            На главную
          </CustomButton>
        </Box>
      </Grid>
    </Grid>
  );
};
