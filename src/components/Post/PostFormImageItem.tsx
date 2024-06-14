"use client";

/* eslint-disable @next/next/no-img-element */
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useAxios from "@/hooks/useAxios";

interface PostFormImageItemProps {
  postId: string;
  image: { url: string; id: string };
}

export default function PostFormImageItem({
  image,
  postId,
}: PostFormImageItemProps) {
  const axios = useAxios();

  const handleDeleteImage = async () => {
    try {
      const res = await axios.delete(`/posts/${postId}/images/${image.id}`);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      key={image.id}
      component="figure"
      sx={{
        width: { xs: 100, md: `calc(33.33% - 16px)` },
        height: 100,
        borderRadius: 1,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        margin: 0,

        boxShadow: (theme) => theme.shadows[2],
      }}
    >
      <img
        src={image.url}
        alt="Imagen de la publicación"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Button
        variant="contained"
        color="error"
        size="small"
        sx={{
          position: "absolute",
          right: 5,
          top: 5,
          padding: 0,
        }}
        onClick={handleDeleteImage}
      >
        <CloseIcon />
      </Button>
    </Box>
  );
}
