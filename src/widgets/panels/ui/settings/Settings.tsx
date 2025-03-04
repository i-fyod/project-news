import { useSettingsStore } from "@/app/store";

import { useEffect, useRef } from "react";

import { Panel } from "@/entities/panel/ui";

import { Button, Input, PersonIcon } from "@/shared/ui";

import styles from "./styles.module.sass";

export function Settings() {
    const textareaRef = useRef(null);
    const { profile, name, surname, description, setName, setSurname, setProfile, setDescription } =
        useSettingsStore();

    useEffect(() => {
        const savedName = localStorage.getItem("name");
        const savedSurname = localStorage.getItem("surname");
        const savedDesc = localStorage.getItem("description");
        if (savedName && savedSurname) {
            setName(savedName);
            setSurname(savedSurname);
            setProfile(savedName + " " + savedSurname);
        }
        if (savedDesc) setDescription(savedDesc);
    }, []);

    return (
        <Panel icon={<PersonIcon />} title="Account settings">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setProfile(name + " " + surname);

                    const textarea = textareaRef.current! as HTMLTextAreaElement;
                    if (textarea.value) setDescription(textarea.value);
                }}
                className={styles.settings}>
                <Input
                    placeholder={profile.split(" ")[0] || "Your name here"}
                    onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        setName(target.value);
                    }}
                    required
                />
                <Input
                    placeholder={profile.split(" ")[1] || "Your surname here"}
                    onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        setSurname(target.value);
                    }}
                    required
                />
                <textarea
                    className={styles.settings__textarea}
                    name="about"
                    placeholder={description || "Your profile description here"}
                    ref={textareaRef}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}></textarea>
                <Button
                    type="submit"
                    className={styles.settings__confirm}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}>
                    Confirm
                </Button>
            </form>
        </Panel>
    );
}
