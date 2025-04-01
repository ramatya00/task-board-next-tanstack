import { useForm } from "react-hook-form";

export function useBoardForm(defaultValues: { name: string; description: string }) {
    return useForm({
        defaultValues,
    });
}