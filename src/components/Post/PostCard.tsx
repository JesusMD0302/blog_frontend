"use client";
/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  ImageList,
  ImageListItem,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentsDialog from "@/components/Comment/CommentsDialog";
import EditrFormDialog from "@/components/Post/PostFormDialog";
import { useToggle } from "@/hooks/useToggle";
import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import useAxios from "@/hooks/useAxios";

interface PostCardProps extends Post {
  isEditable?: boolean;
}

export default function PostCard({
  id,
  title,
  content,
  author,
  images,
  comments,
  isEditable = false,
}: PostCardProps) {
  const [anchorElSettings, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );
  const [isCommentsOpen, _, onCloseComments, onOpenComments] = useToggle();
  const [isEditOpen, __, onCloseEdit, onOpenEdit] = useToggle();
  const axios = useAxios();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleOpenSettings = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorElUser(null);
  };

  const handleDeletePost = async () => {
    const confirmRes = confirm("¿Estás seguro de eliminar este post?");

    if (!confirmRes) return handleCloseSettings();

    try {
      await axios.delete(`/posts/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 2, mt: 2, height: "fit-content" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {author.username.replace("@", "")[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            {author.username}
          </Typography>
        }
        action={
          isEditable && (
            <>
              <Tooltip title="Configuraciones">
                <IconButton aria-label="edit" onClick={handleOpenSettings}>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="basic-menu"
                anchorEl={anchorElSettings}
                open={Boolean(anchorElSettings)}
                onClose={handleCloseSettings}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={onOpenEdit}
                    startIcon={<Edit />}
                  >
                    Editar
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    variant="text"
                    color="error"
                    onClick={handleDeletePost}
                    startIcon={<Delete />}
                  >
                    Eliminar
                  </Button>
                </MenuItem>
              </Menu>
            </>
          )
        }
      />
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body1" component="p">
            {content}
          </Typography>
          {images.length > 0 && (
            <ImageList
              sx={{ width: "100%", maxWidth: 500, maxHeight: 328 }}
              cols={matches ? 3 : 1}
              rowHeight={matches ? 150 : 300}
            >
              {images.map((item, index) => (
                <ImageListItem key={item.id} cols={1}>
                  <img
                    src={item.url}
                    alt={`Imagen ${index}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: theme.shape.borderRadius,
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Stack>

        <Button
          variant="text"
          color="primary"
          sx={{ mt: 2 }}
          onClick={onOpenComments}
        >
          {comments?.length} Comentarios
        </Button>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={onOpenComments}>
          Comentar
        </Button>
      </CardActions>
      <CommentsDialog
        idPost={id}
        comments={comments}
        isOpen={isCommentsOpen}
        onClose={onCloseComments}
      />
      <EditrFormDialog
        isOpen={isEditOpen}
        handleClose={onCloseEdit}
        defaultValues={{ title, content, images, id }}
      />
    </Card>
  );
}
