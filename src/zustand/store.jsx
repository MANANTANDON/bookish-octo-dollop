import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserData = create(
  persist(
    (set) => ({
      formData: { name: "", email: "", bio: "" },

      //adds initial data
      setFormData: (newData) => set({ formData: newData }),

      //update the data
      updateField: (field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [field]: value,
          },
        })),
    }),
    {
      name: "user-data",
    },
  ),
);
