import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import UploadImagesInput from "../Inputs/UploadImagesInput";

export default function PostUploadNewImage() {
  return (
    <Box component="form" mt={2}>
      <UploadImagesInput
        name="images"
        id="images"
        accept="image/png, image/jpg, image/jpeg"
        buttonTextContent="Subir Imagenes"
        multiple
      />
    </Box>
  );
}
