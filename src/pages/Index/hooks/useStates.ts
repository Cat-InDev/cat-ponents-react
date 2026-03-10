import { useState } from "react";
import { StateHooksProps } from "@cat.in.dev/cat-ponents-react";

export const useIndex = (hookProps: StateHooksProps) => {
    hookProps;
    
    const [modalPropsRef, setModalPropsRef] = useState({});

    return {
        modalPropsRef, setModalPropsRef
    }
}

export type UseIndexStates = ReturnType<typeof useIndex>;