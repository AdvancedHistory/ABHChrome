import React, {FC}  from "react";
import "./visualize.css";

import Chart from "./PiChart/chart";
import Graph from "./History/graph";

import { useAppDispatch, useAppSelector } from "../../store";

const Visualize: FC<{browser_history:HistoryEntry[]}> = ({browser_history}) => {
    const { categories } = useAppSelector((state) => state.categories );

    let cat_data:{category:string,count:number}[] = []
    categories.forEach(cat =>cat_data.push({category:cat.name,count:0}));
    cat_data.push({category:"Unlabeled",count:0})
    let hist_data:number[] = []
    for(let i=0; i<48; i++){
        hist_data[i] = 0;
    }

    for(let i = 0; i< browser_history.length; i++){
        const item = browser_history[i];
        hist_data[Math.floor((item.time % 86400000)/1800000)] += 1;
        if(item.categories !== undefined && item.categories.length > 0){
            item.categories.forEach(cat => {
                let category = cat_data.find(el => el.category === cat);
                if(category !== undefined){
                    category.count += 1;
                }
            });
        } else {
            cat_data[cat_data.length-1].count += 1;
        }

    }

    let hist_max = Math.max(...hist_data);
    for(let i=0; i<hist_data.length; i++){
        hist_data[i] = hist_data[i] / hist_max;
    }

    let sum = cat_data.map(el => el.count).reduce((a,b) => a+b ,0);
    for(let i=0; i<cat_data.length; i++){
        cat_data[i].count = cat_data[i].count / sum;
    }
    cat_data.sort((a,b) => a.count - b.count)
    return (
        <div className="visualize">
            <Chart size={["40%","20em"]} browser_data={cat_data}/>
            <Graph size={["40%","20em"]} browser_data={hist_data}/>
        </div>
    );
};

export default Visualize;
