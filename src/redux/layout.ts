import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    theme: 'dark',
    layoutColor: 'dark',
    layoutType: 'horizontal',
    layoutWidth: 'fluid',
    menuPosition: 'scrollable',
    leftSideBarTheme: 'dark',
    leftSideBarType: 'default',
    showSidebarUserInfo: true,
    topbarTheme: 'dark',
    isOpenRightSideBar: false,
    pageTitle: { title: '', breadCrumbItems: [] },
};

export const login = createAsyncThunk('login', async (params: { email: string; password: string }) => {
    const response = await axios.post('/login/', params);
    return response.data;
});

const manageBodyClass = (cssClass: string, action = 'toggle') => {
    switch (action) {
        case 'add':
            if (document.body) document.body.classList.add(cssClass);
            break;
        case 'remove':
            if (document.body) document.body.classList.remove(cssClass);
            break;
        default:
            if (document.body) document.body.classList.toggle(cssClass);
            break;
    }

    return true;
};

const layout = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        showRightSidebar: (state) => {
            manageBodyClass('right-bar-enabled', 'add');
            state.isOpenRightSideBar = true;
        },
        hideRightSidebar: (state) => {
            manageBodyClass('right-bar-enabled', 'remove');
            state.isOpenRightSideBar = false;
        },
        changeLayout: (state, action) => {
            state.layoutType = action.payload;
        },
        changeLayoutColor: (state, action) => {
            state.layoutColor = action.payload;
        },
        changeLayoutWidth: (state, action) => {
            state.layoutWidth = action.payload;
        },
        changeMenuPositions: (state, action) => {
            state.menuPosition = action.payload;
        },
        changeSidebarTheme: (state, action) => {
            state.leftSideBarTheme = action.payload;
        },
        changeSidebarType: (state, action) => {
            state.leftSideBarType = action.payload;
        },
        toggleSidebarUserInfo: (state, action) => {
            state.showSidebarUserInfo = action.payload;
        },
        changeTopbarTheme: (state, action) => {
            state.topbarTheme = action.payload;
        },
        changePageTitle: (state, action) => {
            state.pageTitle = action.payload;
        },
    },
});

export const {
    showRightSidebar,
    hideRightSidebar,
    changeLayout,
    changeLayoutColor,
    changeLayoutWidth,
    changeMenuPositions,
    changeSidebarTheme,
    changeSidebarType,
    toggleSidebarUserInfo,
    changeTopbarTheme,
    changePageTitle,
} = layout.actions;
export default layout.reducer;
