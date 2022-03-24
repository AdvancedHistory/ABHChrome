import React, {FC, ChangeEvent, useState}  from 'react';
import './filter.css';

const Filter: FC<{start_date:(arg0:string)=>void,end_date:(arg0:string)=>void,close:(arg0:boolean)=>void}> =  ({start_date,end_date,close})  => {
    const [min_date, set_min_date] = useState<string>("");
    const set_start = (date:string) => {
        set_min_date(date);
        start_date(date);
    };

    const today = (new Date()).toISOString().substr(0,10);
    return (
        <div id="filter_box">
            <div id="darken" onClick={() => close(false)}/>
            <div id="box">
                Start Date
                <input type="date" max={today} onChange={(e: ChangeEvent<HTMLInputElement>) => set_start(e.target.value)}/>
                End Date
                <input type="date" min={min_date} max={today} onChange={(e: ChangeEvent<HTMLInputElement>) => end_date(e.target.value)}/>
            </div>
        </div>
    );
};
export default Filter;
