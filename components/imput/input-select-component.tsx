import { useRouter } from "next/router";
import React from "react";
import { InputSelectComponentProps } from "../../types/input/input-select-component-props";
import {useOnClickOutside} from "../../helper/click-outside";

export function InputSelectComponent( { loading, onSelect, label, list, placeHolder, value, onSearch, fetchData } : InputSelectComponentProps) {
    const router = useRouter()
    const [listOpened, setListOpened] = React.useState<boolean>(false)
    const [showedLabel, setShowedLabel] = React.useState<string>(placeHolder)
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

    
    return (
        <div ref={ref} className = "relative bg-gray-50 mb-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 w-full rounded-lg" >
            <div onClick = {() => setListOpened(!listOpened)}  className = "flex px-3 py-2">
                <div className = "flex-none font-medium text-sm text-gray-400 dark:text-gray-300">
                    {showedLabel}
                </div>
                <div className = "flex-grow"/>
                <div className = "flex-none">

                </div>
            </div>
            {listOpened && (
                <div className = "absolute flex-col bg-white dark:bg-gray-500 rounded-lg w-full top-10 px-2 py-6 flex  items-center justify-center shadow-xl">
                     <input type={"text" }
                        className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        onChange={(e) => {
                            onSearch(e.target.value)
                        }}
                    />
                    <div className = "flex flex-col h-32 w-full overflow-y-scroll bg-white dark:bg-gray-500">
                        {
                            !loading ? (
                                list.length > 0 ? (
                                    list.map((item, index) => {
                                        return (
                                            <div onClick={() => {onSelect(item); setShowedLabel(item[label]); setListOpened(false)}} key = {index} className = " w-full px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 text-sm dark:text-gray-300">
                                                {item[label]}
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
    );
};
