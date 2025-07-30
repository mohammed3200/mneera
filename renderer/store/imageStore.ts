import { create } from 'zustand';

interface ImageState {
  cache: Record<string, string>; // imageId -> base64 data
  loading: boolean;
  error: string | null;
  getImage: (imageId: string) => Promise<string | null>;
  clearCache: () => void;
}

export const useImageStore = create<ImageState>((set, get) => ({
  cache: {},
  loading: false,
  error: null,
  
  getImage: async (imageId) => {
    // Return cached image if available
    if (get().cache[imageId]) {
      return get().cache[imageId];
    }
    
    set({ loading: true, error: null });
    
    try {
      const imageData = await window.ipc.invoke('get-image', imageId);
      
      if (imageData && typeof imageData === 'string') {
        const base64Data = `data:image/jpeg;base64,${imageData}`;
        set((state) => ({
          cache: { ...state.cache, [imageId]: base64Data },
          loading: false
        }));
        return base64Data;
      }
      
      return null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'فشل تحميل الصورة';
      set({ error: errorMessage, loading: false });
      return null;
    }
  },
  
  clearCache: () => set({ cache: {} })
}));