import { create } from 'zustand';
import { Individual, NewIndividual } from '@/main/db/schema-types';



interface IndividualState {
  individuals: Individual[];
  loading: boolean;
  error: string | null;
  fetchIndividuals: () => Promise<void>;
  addIndividual: (individual: NewIndividual) => void;
  setError: (error: string | null) => void;
}

export const useIndividualStore = create<IndividualState>((set) => ({
  individuals: [],
  loading: false,
  error: null,
  fetchIndividuals: async () => {
    set({ loading: true, error: null });
    try {
      // Replace with your IPC or API call
      const data = await window.ipc.invoke('get-individuals');
      set({ individuals: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  addIndividual: (individual: NewIndividual) => {
    // Generate a unique id and createdAt for the new Individual
    const newIndividual: Individual = {
      ...individual,
      id: Date.now(), // or use a better unique id generator
      createdAt: new Date(),
      image: null,
      idNumber: null,
      passportNumber: null,
    };
    set((state) => ({
      individuals: [...state.individuals, newIndividual],
    }));
  },
  setError: (error) => set({ error }),
}));