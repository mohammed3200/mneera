import { create } from "zustand";
import type { Battalion } from "../../main/db/schema-types";

interface BattalionState {
  battalions: Battalion[];
  loading: boolean;
  error: string | null;
  fetchBattalions: () => Promise<void>;
  fetchBattalion: (id: number) => Promise<Battalion | undefined>;
  addBattalion: (battalion: Battalion) => void;
  setError: (error: string | null) => void;
}

export const useBattalionStore = create<BattalionState>((set) => ({
  battalions: [],
  loading: false,
  error: null,

  fetchBattalions: async () => {
    set({ loading: true, error: null });
    try {
      const data = await window.ipc.invoke("get-battalions");
      set({ battalions: data, loading: false });
    } catch (err: any) {
      set({
        error: err?.message || "حدث خطأ غير متوقع",
        loading: false,
      });
    }
  },

  fetchBattalion: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const data = await window.ipc.invoke("get-battalion", id);
      set({ loading: false });
      return data;
    } catch (err: any) {
      set({
        error: err?.message || "حدث خطأ غير متوقع",
        loading: false,
      });
      return undefined;
    }
  },

  addBattalion: (battalion) => {
    set((state) => ({
      battalions: [...state.battalions, battalion],
    }));
  },

  setError: (error) => set({ error }),
}));
