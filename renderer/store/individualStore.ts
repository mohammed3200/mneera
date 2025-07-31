// renderer/store/individualStore.ts
import { create } from "zustand";
import type { Individual } from "../../main/db/schema-types";

interface IndividualState {
  individuals: Individual[];
  loading: boolean;
  error: string | null;
  fetchIndividuals: () => Promise<void>;
  fetchIndividual: (id: number) => Promise<Individual | undefined>;
  addIndividual: (individual: Individual) => void;
  setError: (error: string | null) => void;
}

export const useIndividualStore = create<IndividualState>((set) => ({
  individuals: [],
  loading: false,
  error: null,

  fetchIndividuals: async () => {
    set({ loading: true, error: null });
    try {
      const data = await window.ipc.invoke("get-individuals");

      // Properly convert dates
      const individuals = data.map((ind: any) => ({
        ...ind,
        birthDate: new Date(ind.birthDate),
        createdAt: new Date(ind.createdAt),
      }));

      set({ individuals, loading: false });
    } catch (err: any) {
      set({
        error: err?.message || "حدث خطأ غير متوقع",
        loading: false,
      });
    }
  },

  fetchIndividual: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const data = await window.ipc.invoke("get-individual", id);

      if (data) {
        // Convert dates
        const individual = {
          ...data,
          birthDate: new Date(data.birthDate),
          createdAt: new Date(data.createdAt),
        };

        // Update store - add or update this individual
        set((state) => {
          const exists = state.individuals.some(ind => ind.id === id);
          return {
            individuals: exists
              ? state.individuals.map(ind => ind.id === id ? individual : ind)
              : [...state.individuals, individual],
            loading: false
          };
        });
        return individual;
      }
      return null;
    } catch (err: any) {
      set({
        error: err?.message || "حدث خطأ غير متوقع",
        loading: false,
      });
      return null;
    }
  },

  addIndividual: (individual) => {
    set((state) => ({
      individuals: [...state.individuals, individual],
    }));
  },

  setError: (error) => set({ error }),
}));