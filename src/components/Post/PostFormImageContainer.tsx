import { Box, Typography } from "@mui/material";
import PostFormImageItem from "./PostFormImageItem";

interface PostFormImageContainerProps {
  postId: string;
  images: { url: string; id: string }[];
}

export default function PostFormImageContainer({
  images,
  postId,
}: PostFormImageContainerProps) {
  return (
    <Box component="article">
      <Typography variant="h6" component="p">
        Imágenes
      </Typography>
      <Box
        component="section"
        display="flex"
        gap={1}
        width="100%"
        p={1}
        sx={{ overflowX: "auto", whiteSpace: "nowrap" }}
      >
        {images.map((image) => (
          <PostFormImageItem key={image.id} postId={postId} image={image} />
        ))}
      </Box>
    </Box>
  );
}
