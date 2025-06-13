// Example Code For Zustand

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

const useUIStore = create(
  devtools(
    immer((set) => ({
      sidebarOpen: false,
      toggleSidebar: () => {
        set((state) => {
          state.sidebarOpen = !state.sidebarOpen;
        });
      },
    }))
  )
);

export default useUIStore;
