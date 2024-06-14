import { Box, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface VisuallyHiddenInputProps {
  buttonTextContent: string;
  accept: string;
  name: string;
  multiple?: boolean;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: any;
}

export default function UploadImagesInput({
  buttonTextContent,
  error,
  helperText,
  onChange,
  ...inputProps
}: VisuallyHiddenInputProps) {
  const [imagesCount, setImagesCount] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      setImagesCount(files.length);
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Box mt={2}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {buttonTextContent}
        <VisuallyHiddenInput
          type="file"
          onChange={handleChange}
          {...inputProps}
        />
      </Button>
      {imagesCount && (
        <Box color="text.secondary" mt={1}>
          {imagesCount}{" "}
          {imagesCount > 1 ? "imagenes seleccionadas" : "imagen seleccionada"}
        </Box>
      )}
      {error && <Box color="error.main">{helperText}</Box>}
    </Box>
  );
}
