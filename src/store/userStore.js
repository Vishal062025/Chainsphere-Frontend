// Example Code For Zustand

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useUserStore = create(
  devtools(
    immer((set) => ({
      user: null,
      setUser: (user) => {
        set((state) => {
          state.user = user;
        });
      },
      logout: () => {
        set((state) => {
          state.user = null;
        });
      },
      updateUsername: (newName) => {
        const currentUser = get().user;

        if (currentUser) {
          set((state) => {
            state.user.name = newName;
          });
        }
      },

      isLoggedIn: () => {
        return !!get().user;
      },
    }))
  )
);

export default useUserStore;

// You Can Use Slices and Action In Any Component

// const user = useUserStore((state) => state.user);
// const updateUsername = useUserStore((state) => state.updateUsername);
