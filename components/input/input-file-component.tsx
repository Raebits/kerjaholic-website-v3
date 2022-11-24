import { useRouter } from "next/router";
import React from "react";
import { InputFileComponentProps } from "../../types/input/input-file-component-props";

export function InputFileComponent( { onChange, placeholder, label, type, className, showValidInput, initValue } : InputFileComponentProps) {
    const router = useRouter()

    const dokumenInputRef= React.useRef<HTMLInputElement>();
    
    const [ value, setValue ] = React.useState<File>(initValue)

    const isInvalid = (): boolean => {
        if (showValidInput && value == null) {
            return true
        }
        return false
    }

    return (
        <div>
            <button
                onClick={() => dokumenInputRef.current.click()}
                className="bg-red-600 p-3">
                {(router.locale == "en") ? "Select File" : "Pilih File"}
            </button>
            <input
                ref={dokumenInputRef}
                onChange={(e) => {
                    onChange(e.target.files[0])
                    setValue(e.target.files[0])
                }}
                type="file"
                // hidden
                accept={type}
            />
        </div>
    );
};
