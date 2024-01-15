import { create } from "zustand";

type PostData = {
  authorId: string;
  text: string;
};

interface PostState {
  postData: PostData | null;

  setPost: (text: string, authorId: string) => void;
  getPost: () => string;
}

export const usePostStore = create<PostState>((set, get) => ({
  postData: null,

  setPost: (text, authorId) =>
    set({ postData: { authorId: authorId, text: text } }),
  getPost: () => {
    const { postData } = get();
    if (postData) {
      return postData.text;
    }
    return "";
  },
}));
