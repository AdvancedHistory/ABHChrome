import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const categoryInitialState: CategoryState = {
    categories: [],
};

// CategoryState slice with custom reducers
const categorySlice = createSlice({
    name: "category",
    initialState: categoryInitialState,
    reducers: {
        // Add a new category if one with that name does not exist
        ADD_CATEGORY: (state, action: PayloadAction<Category>) => {
            let index = state.categories.findIndex((category) => category.name === action.payload.name);
            if(index === -1) {
                state.categories.push(action.payload)
                console.log("REDUX: Added category: " + action.payload.name);
            } else {
                console.log("REDUX: did not add category, one already exists with name '" + action.payload.name + "'");
            }
        },
        // Add a new category; if one with that name already exists, replace it
        SET_CATEGORY: (state, action: PayloadAction<Category>) => {
            let index = state.categories.findIndex((category) => category.name === action.payload.name);
            if(index === -1) {
                state.categories.push(action.payload)
                console.log("REDUX: Added category: " + action.payload.name);
            } else {
                console.log("REDUX: Replaced category with name: '" + action.payload.name + "'");
            }
        },
        // Remove a category of the given name if it exists
        REMOVE_CATEGORY: (state, action: PayloadAction<Category>) => {
            let index = state.categories.findIndex((category) => category.name === action.payload.name);
            if(index !== -1) {
                state.categories.splice(index, 1);
                console.log("REDUX: Removed category: " + action.payload.name);
            } else {
                console.log("REDUX: did not remove category, one does not exist with name '" + action.payload.name + "'");
            }
        },
        // Clear the stored categories
        CLEAR_CATEGORIES: (state) => {
            state.categories = [];
            console.log("REDUX: Cleared categories");
        },
    },
});

export const { ADD_CATEGORY, SET_CATEGORY, REMOVE_CATEGORY, CLEAR_CATEGORIES } = categorySlice.actions;

export default categorySlice.reducer;