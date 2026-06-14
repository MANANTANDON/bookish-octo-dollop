import { create } from "zustand";

export const useUserData = create((set) => ({
  formData: {
    name: "",
    email: "",
    bio: "",
    username: "",
    location: "",
    website: "",
    profilePic: "",
  },
  setFormData: (newData) => set({ formData: newData }),
  updateField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  // Links cache
  linksCache: {},
  setLinksCache: (category, data) =>
    set((state) => ({
      linksCache: { ...state.linksCache, [category]: data },
    })),
}));
