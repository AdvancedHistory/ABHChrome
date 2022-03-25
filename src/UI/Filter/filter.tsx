import React, {FC, ChangeEvent, useEffect}  from 'react';
import './filter.css';

const Filter: FC<{dates:string[],set_dates:((arg0:string)=>void)[],close:(arg0:boolean)=>void}> =  ({dates,set_dates,close})  => {

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27){
                close(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    });

    const today = (new Date()).toISOString().substring(0,10);
    return (
        <div id="filter_box">
            <div id="darken" onClick={() => close(false)}/>
            <div id="box">
                <div>
                    Start Date
                    <input type="date" value={dates[0]} max={today} onChange={(e: ChangeEvent<HTMLInputElement>) => set_dates[0](e.target.value)}/>
                </div>
                <div>
                    End Date
                    <input type="date" value={dates[1]} min={dates[0]} max={today} onChange={(e: ChangeEvent<HTMLInputElement>) => set_dates[1](e.target.value)}/>
                </div>
            </div>
        </div>
    );
};
export default Filter;
