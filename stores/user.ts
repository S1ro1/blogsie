import create from "zustand";
import { UserType } from "@/lib/types";
// Define the store's state and actions
interface UserStore {
  user: UserType | null;
  setUser: (user: UserType) => void;
  updateUser: (update: Partial<UserType>) => void;
  getUser: () => UserType | null;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null, // initial state
  setUser: (user) => set({ user }),

  updateUser: (update) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...update } });
    }
  },
  getUser: () => get().user,
}));

export default useUserStore;
