import React, {FC}  from "react";
import "./settings.css";

import { useAppDispatch, useAppSelector } from "../../store";
import { ADD_CATEGORY, SET_CATEGORY, REMOVE_CATEGORY } from "../../store/categoryReducer";
import "../../types.ts";

import Box from "./Box/box";

const Settings: FC = () => {

    const dispatch = useAppDispatch();
    const { categories } = useAppSelector(state => state.categories);

    //Helper funtion for adding a new rule to an existing Category
    const new_rule = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //used to clean regex characters out into escaped characters to prevent accidental matching
        // eslint-disable-next-line
        const reg_cleaner = /[\.\\\[\]\^\$\(\)\?\=\!\<\>\|\-\:\*\+\{\}\,]/gi;
        //@ts-ignore
        const regex:boolean = event.currentTarget.elements[0].checked;
        //@ts-ignore
        const pattern:string = event.currentTarget.elements[1].value;
        const rule = regex?pattern:(".*"+pattern.trim().replaceAll(reg_cleaner, m => '\\'+m)+".*");
        
        let valid_rule = true;
        try{
          new RegExp(rule);
        } catch(error) {
          let message = String(error);
          alert(message.substring(12))
          valid_rule = false;
        }

        //@ts-ignore
        const category:string = event.currentTarget.elements[2].selectedOptions[0].value;
        const old_category:Category|undefined = categories.find(el => el.name === category);

        //Applies the new rule
        if (valid_rule && old_category !== undefined && !old_category.patterns.includes(pattern)){
            dispatch(
                SET_CATEGORY({
                    name:category,
                    patterns:[...old_category.patterns, rule],
                })
            );
        }
    }

    //helper function to remove a rule from an existing category
    const delete_rule = (category_index:number, rule_index:number) => {
        const category:Category = categories[category_index];
        console.log("Delete ",category.name,category.patterns[rule_index]);
        let new_pat:string[] = [...category.patterns]
        new_pat.splice(rule_index,1);
        dispatch(
            SET_CATEGORY({
                name:category.name,
                patterns:new_pat,
            })
        );
    }

    //creates the html for a rule to be displayed
    const display_rule = (category_index:number,rule_index:number, categories:Category[]) => {
        return (
            <div className="Rule">
                <div>{categories[category_index].patterns[rule_index]}</div>
                <div>{categories[category_index].name}</div>
                <div onClick={() => delete_rule(category_index,rule_index)}><i className="material-icons">delete_forever</i></div>
            </div>
        );
    }

    //creates the html for a category to be displayed
    const display_category = (category:Category,category_index:number) => {
        return (
            <div className="Category" key={category_index}>
                <div>{category.name}</div>
                <div onClick={() => dispatch(REMOVE_CATEGORY(category))}><i className="material-icons">delete_forever</i></div>
            </div>
        );
    }

    //creates a new category
    const new_category = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //@ts-ignore
        const category_name:string = event.currentTarget.elements[0].value.trim();
        if(category_name.length == 0) {
          alert("Can not submit empty category name");
          return;
        }
        dispatch(
            ADD_CATEGORY({
                name:category_name,
                patterns:[],
            })
        );
    }

    //main html
    return (
        <div id="settings">
            <Box size={["40%","80%"]}>
                Categories
                <form className="Form" onSubmit={new_category}>
                    <label> Category Name: <input type="text" name="category"/></label>
                    <button type="submit" name="add">+</button>
                </form>
                <div className="Seperator"/>
                {categories.map((cat,cat_ind) => display_category(cat,cat_ind))}
            </Box>

            <Box size={["40%","80%"]}>
                Rules
                <form className="Form" id="rule_form" onSubmit={new_rule}>
                    <label>Regex:  <input type="checkbox" name="regex"/></label>
                    <label>Pattern:  <input type="text" name="pattern"/></label>
                    <label>Category: <br></br>
                        <select name="category">
                            <option value=""></option>
                            {categories.map((el,key) =><option key={key} value={el.name}>{el.name}</option>)}
                        </select>
                    </label>
                    <label>
                    <button type="submit" name="add">+</button>
                    </label>
                </form>
                <div className="Seperator"/>
                {categories.map((cat,cat_ind) => cat.patterns.map((pat,pat_ind) => display_rule(cat_ind,pat_ind,categories)))}
            </Box>
        </div>
    );
};

export default Settings;
