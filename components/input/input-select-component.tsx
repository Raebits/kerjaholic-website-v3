import { useRouter } from "next/router";
import React from "react";
import { InputSelectComponentProps } from "../../types/input/input-select-component-props";
import {useOnClickOutside} from "../../helper/click-outside";

export function InputSelectComponent( {showTitle, loading, disabled, onSelect, title, keyLabel, list, keyValue, value, label, onSearch, fetchData, showValidInput } : InputSelectComponentProps) {
    const router = useRouter()
    const [listOpened, setListOpened] = React.useState<boolean>(false)
    const [showedLabel, setShowedLabel] = React.useState<string>(!value ? "Pilih "+title : label) 
    const [search, setSearch] = React.useState<string>("")
    // click outside handler
    const ref = React.useRef()
    useOnClickOutside(ref, () => {setListOpened(false)});
    
    React.useEffect(() => {
        if(listOpened){
            fetchData(true)
        }else{
            fetchData(false)
        }
    },[listOpened])

    const isInvalid = (): boolean => {
        if (showValidInput && !value ) {
            return true
        }
        return false
    }

    return (
        <div className = " mb-3">
        {(showTitle == true) && (
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{title}</label>
        )}
        <div ref={ref} className = "relative bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 w-full rounded-lg" >
            <div onClick = {() => !disabled && setListOpened(!listOpened)}  className = "flex px-3 py-3">
                <div className = "flex-none font-medium text-xs text-gray-400 dark:text-gray-300">
                    {showedLabel}
                </div>
                <div className = "flex-grow"/>
                <div className = "flex-none flex items-center bg-blend-luminosity">
                    {listOpened ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 dark:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    ):(
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 dark:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>

                    )}
                </div>
            </div>
            {listOpened && (
                <div className = "absolute flex-col bg-white dark:bg-gray-500 rounded-lg w-full top-11 px-2 py-6 flex  items-center justify-center shadow-xl z-40">
                    {onSearch && (
                        <input type={"text" }
                            className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"
                            onChange={(e) => {
                                onSearch(e.target.value)
                            }}
                        />
                    )}
                    <div className = "flex flex-col h-32 w-full overflow-y-scroll bg-white dark:bg-gray-500">
                        {
                            !loading ? (
                                list.length > 0 ? (
                                    list.map((item, index) => {
                                        return (
                                            <div onClick={() => {onSelect(item); setShowedLabel(item[keyLabel]); setListOpened(false)}} key = {index} className = " w-full px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 text-sm dark:text-gray-300">
                                                {item[keyLabel]}
                                            </div>
                                        )
                                    })
                                ):(
                                    <div className = "flex items-center w-full justify-center">No Data</div>
                                )
                            ):(
                                <div className = "flex items-center w-full justify-center">Loading . . .</div>
                            )
                        }
                        
                    </div>
                </div>
            )}
            
        </div>
        {(isInvalid()) && (
            <div className="flex mt-1 text-xs text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span>
                <div className = "mx-1">
                    '{title}' {((router.locale == "en") ? " tidak boleh kosong" : " tidak boleh kosong")}
                </div>
            </div>
        )}
        </div>
    );
};
