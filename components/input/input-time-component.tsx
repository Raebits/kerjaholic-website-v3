import { useRouter } from "next/router";
import React from "react";
import { InputSelectComponentProps } from "../../types/input/input-select-component-props";
import {useOnClickOutside} from "../../helper/click-outside";
import { InputTimeComponentProps } from "../../types/input/input-time-component-props";

export function InputTimeComponent( {showTitle, disabled, onSelect, title, showValidInput } : InputTimeComponentProps) {
    const router = useRouter()
    const [hourState, setHourState] = React.useState<string>("")
    const [minuteState, setMinuteState] = React.useState<string>("")
    const isInvalid = (): boolean => {
        if (showValidInput && (hourState == "" || minuteState == "" )) {
            return true
        }
        return false
    }
    

    let hour = []
    let minute = []
    for (let i = 0; i < 24; i++) {
        hour.push( i > 9 ? i.toString() : "0" + i)
    }

    for (let i = 0; i < 60; i++) {
        minute.push( i > 9 ? i.toString() : "0" + i)
    }

    async function timeChanged(type,e){
        if(type === "hour"){
            setHourState(e.target.value)
        }else if(type === "minute"){
            setMinuteState(e.target.value)
        }

    }

    React.useEffect(() => {
        onSelect(hourState+":"+minuteState)
    },[hourState, minuteState])
    
    return (
        <div className = " mb-3">
            {(showTitle == true) && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{title}</label>
            )}
            <div className="relative inline-flex text-lg border rounded-md shadow-lg p-1">
                <select value = {hourState} name="" id="" onChange = {(e) => timeChanged("hour",e)} className="px-2 outline-none appearance-none bg-transparent">
                    <option value="">--</option>
                    {hour.map((obj,key) => {
                        return(<option className = "bg-pink-600" key = {key} value={obj}>{obj}</option>)
                    })}
                    
                </select>
                <span className="px-2">:</span>
                <select value = {minuteState} name="" id="" onChange = {(e) => timeChanged("minute",e)} className="px-2 outline-none appearance-none bg-transparent">
                    <option value="">--</option>
                    {minute.map((obj,key) => {
                        return(<option key = {key} value={obj}>{obj}</option>)
                    })}
                </select>
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
