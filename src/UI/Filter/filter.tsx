import React, {FC, ChangeEvent, useEffect}  from 'react';
import './filter.css';

import { useAppDispatch, useAppSelector } from "../../store";


//Page Used as a Pop up to filter
const Filter: FC<{dates:string[],set_dates:((arg0:string)=>void)[],close:(arg0:boolean)=>void, category_masks:[boolean[],(arg0:boolean[])=>void]}> =  ({dates,set_dates,close,category_masks})  => {

    const { categories } = useAppSelector(state => state.categories);

    //Will close the pop up on esc key
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

    //used to set the category filters if unintialized
    if(category_masks[0].length !== categories.length +1){
        const temp:boolean[] = Array(categories.length+1);
        temp.forEach((el,index)=> temp[index]=false);
        temp[0] = true;
        category_masks[1](temp);
    }

    //toggles the check box
    const toggle_cat = (index:number)  => {
        const temp:boolean[] = [...category_masks[0]];
        temp.splice(index,1,!temp[index]);
        category_masks[1](temp);
    }

    //Used to prevent a user from selecting a future date
    const today = (new Date()).toISOString().substring(0,10);
    return (
        <div id="filter_box">
            <div id="darken" onClick={() => close(false)}/>
            <div id="box">
                <div id="dates">
                    <div>
                        Start Date
                        <input type="date" value={dates[0]} max={today} onChange={(e: ChangeEvent<HTMLInputElement>) => set_dates[0](e.target.value)}/>
                    </div>
                    <div>
                        End Date
                        <input type="date" value={dates[1]} min={dates[0]} max={today} onChange={(e: ChangeEvent<HTMLInputElement>) => set_dates[1](e.target.value)}/>
                    </div>
                </div>
                <div id="cat_filter">
                    <label>All: <input name="All" type="checkbox" onClick={() => toggle_cat(0)} checked={category_masks[0][0]}/></label>
                    {categories.map((el,index) => <label>{el.name}: <input name={el.name} type="checkbox" onClick={()=> toggle_cat(index+1)} checked={category_masks[0][index+1]}/></label>)}
                </div>
            </div>
        </div>
    );
};
export default Filter;
