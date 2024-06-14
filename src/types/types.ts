interface Author {
  username: string;
}

interface Image {
  id: string;
  url: string;
}

interface Comment {
  author: Author;
  content: string;
  createdAt: string;
  id: string;
}

interface Post {
  author: Author;
  authorId: string;
  comments: Comment[];
  content: string;
  createdAt: string;
  id: string;
  images: Image[];
  title: string;
  updatedAt: string;
}
