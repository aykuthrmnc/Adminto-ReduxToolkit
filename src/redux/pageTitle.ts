import { createSlice } from '@reduxjs/toolkit';

type PageTitle = {
    title: string;
    breadCrumbItems: {
        label: string;
        path: string;
        active?: boolean;
    }[];
};

const initialState = {
    PageTitle: { title: '', breadCrumbItems: [] },
};

const pageTitle = createSlice({
    name: 'pageTitle',
    initialState,
    reducers: {
        changePageTitle: (state, action) => {
            state.PageTitle = action.payload;
        },
    },
});

export const { changePageTitle } = pageTitle.actions;
export default pageTitle.reducer;
