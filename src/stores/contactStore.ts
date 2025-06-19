import { create } from "zustand";

type ContactState = {
    loading: boolean;
    success: boolean;
    setLoading: (loading: boolean) => void;
    setSuccess: (success: boolean) => void;
};

export const useContactStore = create<ContactState>((set) => ({
    loading: false,
    success: false,
    setLoading: (loading) => set({ loading }),
    setSuccess: (success) => set({ success }),
}));
