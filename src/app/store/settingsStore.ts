import { create } from "zustand";

interface ISettingsStore {
    profile: string;
    name: string;
    surname: string;
    description: string;
    setProfile: (login: string) => void;
    setName: (name: string) => void;
    setSurname: (surname: string) => void;
    setDescription: (desc: string) => void;
}

export const useSettingsStore = create<ISettingsStore>((set) => ({
    profile: "",
    name: "",
    surname: "",
    description: "",
    setProfile: (login: string) => set({ profile: login }),
    setName: (name) => {
        localStorage.setItem("name", name);
        return set({
            name: name,
        });
    },
    setSurname: (surname) => {
        localStorage.setItem("surname", surname);
        return set({
            surname: surname,
        });
    },
    setDescription: (desc) => {
        localStorage.setItem("description", desc);
        return set({
            description: desc,
        });
    },
}));
