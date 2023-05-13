import { useState, useEffect, useCallback } from 'react';
import { Alert, Button } from 'react-bootstrap';

// constants
import * as layoutConstants from '~/constants/layout';

// components
import LayoutTypes from './LayoutTypes';
import LayoutColor from './LayoutColor';
import LayoutWidth from './LayoutWidth';
import MenuPositions from './MenuPositions';
import LeftSideBarTheme from './LeftSideBarTheme';
import LeftSideBarType from './LeftSideBarType';
import SidebarUserInfo from './SidebarUserInfo';
import TopbarTheme from './TopbarTheme';
import { useDispatch, useSelector } from 'react-redux';
import { useViewport } from '~/hooks';
import { changeLayout, changeLayoutColor, changeLayoutWidth, changeMenuPositions, changeSidebarTheme, changeSidebarType, changeTopbarTheme, toggleSidebarUserInfo } from '~/redux/layout';

const ThemeCustomizer = () => {
    const dispatch = useDispatch();
    const { width } = useViewport();

    const {
        layoutColor,
        layoutType,
        layoutWidth,
        menuPosition,
        leftSideBarType,
        leftSideBarTheme,
        showSidebarUserInfo,
        topbarTheme,
    } = useSelector((state: any) => ({
        layoutColor: state.Layout.layoutColor,
        layoutType: state.Layout.layoutType,
        layoutWidth: state.Layout.layoutWidth,
        menuPosition: state.Layout.menuPosition,
        leftSideBarTheme: state.Layout.leftSideBarTheme,
        leftSideBarType: state.Layout.leftSideBarType,
        showSidebarUserInfo: state.Layout.showSidebarUserInfo,
        topbarTheme: state.Layout.topbarTheme,
    }));

    const [disableTopbarTheme, setDisableTopbarTheme] = useState<boolean>(false);
    const [disableSidebarTheme, setDisableSidebarTheme] = useState<boolean>(false);
    const [disableSidebarType, setDisableSidebarType] = useState<boolean>(false);
    const [disableSidebarUser, setDisableSidebarUser] = useState<boolean>(false);

    /**
     * change state based on props changes
     */
    const _loadStateFromProps = useCallback(() => {
        setDisableTopbarTheme(layoutColor !== layoutConstants.LayoutColor.LAYOUT_COLOR_DARK);
        setDisableSidebarTheme(layoutType !== layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL);
        setDisableSidebarType(layoutType !== layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL && width > 991);
        setDisableSidebarUser(layoutType !== layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL);
    }, [layoutColor, layoutType, width]);

    useEffect(() => {
        _loadStateFromProps();
    }, [_loadStateFromProps]);

    /**
     * On layout change
     */
    const changeLayoutType = (value: string) => {
        const layout = value;
        switch (layout) {
            case 'horizontal':
                dispatch(changeLayout(layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL));
                break;
            default:
                dispatch(changeLayout(layoutConstants.LayoutTypes.LAYOUT_VERTICAL));
                break;
        }
    };

    /**
     * Change the layout color
     */
    const changeLayoutColorScheme = (value: string) => {
        const mode = value;

        switch (mode) {
            case 'dark':
                dispatch(changeLayoutColor(layoutConstants.LayoutColor.LAYOUT_COLOR_DARK));
                break;
            default:
                dispatch(changeLayoutColor(layoutConstants.LayoutColor.LAYOUT_COLOR_LIGHT));
                break;
        }
    };

    /**
     * Change the width mode
     */
    const changeWidthMode = (value: string) => {
        const mode = value;

        switch (mode) {
            case 'boxed':
                dispatch(changeLayoutWidth(layoutConstants.LayoutWidth.LAYOUT_WIDTH_BOXED));
                break;
            default:
                dispatch(changeLayoutWidth(layoutConstants.LayoutWidth.LAYOUT_WIDTH_FLUID));
                break;
        }
    };

    /*
     * Change menus position
     */
    const changeMenuPosition = (value: string) => {
        const position = value;

        switch (position) {
            case 'scrollable':
                dispatch(changeMenuPositions(layoutConstants.MenuPositions.MENU_POSITION_SCROLLABLE));
                break;
            default:
                dispatch(changeMenuPositions(layoutConstants.MenuPositions.MENU_POSITION_FIXED));
                break;
        }
    };

    /**
     * Changes the theme
     */
    const changeLeftSidebarTheme = (value: string) => {
        const theme = value;

        switch (theme) {
            case 'dark':
                dispatch(changeSidebarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_DARK));
                break;
            case 'brand':
                dispatch(changeSidebarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_BRAND));
                break;
            case 'gradient':
                dispatch(changeSidebarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_GRADIENT));
                break;
            default:
                dispatch(changeSidebarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT));
                break;
        }
    };

    /**
     * Change the leftsiderbar type
     */
    const changeLeftSiderbarType = (value: string) => {
        const type = value;

        switch (type) {
            case 'condensed':
                dispatch(changeSidebarType(layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
                break;
            case 'compact':
                dispatch(changeSidebarType(layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_COMPACT));
                break;
            default:
                dispatch(changeSidebarType(layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
                break;
        }
    };

    /*
     * Toggle the leftsidebar use info
     */
    const toggleLeftSidebarUserInfo = (value: boolean) => {
        const checked = value;

        dispatch(toggleSidebarUserInfo(checked));
    };

    /*
     * Change topbar theme
     */
    const changeTopBarTheme = (value: string) => {
        const theme = value;
        
        switch (theme) {
            case 'light':
                dispatch(changeTopbarTheme(layoutConstants.TopbarTheme.TOPBAR_THEME_LIGHT));
                break;
            default:
                dispatch(changeTopbarTheme(layoutConstants.TopbarTheme.TOPBAR_THEME_DARK));
                break;
        }
    };

    /**
     * Reset everything
     */
    const reset = () => {
        changeLayoutType(layoutConstants.LayoutTypes.LAYOUT_VERTICAL);
        changeLayoutColorScheme(layoutConstants.LayoutColor.LAYOUT_COLOR_LIGHT);
        changeWidthMode(layoutConstants.LayoutWidth.LAYOUT_WIDTH_FLUID);
        changeMenuPosition(layoutConstants.MenuPositions.MENU_POSITION_FIXED);
        changeLeftSidebarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT);
        toggleLeftSidebarUserInfo(true);
        changeTopBarTheme(layoutConstants.TopbarTheme.TOPBAR_THEME_LIGHT);
        changeLeftSiderbarType(layoutConstants.SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT);
    };

    return (
        <div className="p-3">
            <Alert variant="warning">
                <strong>Customize </strong> the overall color scheme, Layout, etc.
            </Alert>

            {/* Layouts */}
            <LayoutTypes
                changeLayoutType={changeLayoutType}
                layoutType={layoutType}
                layoutConstants={layoutConstants.LayoutTypes}
            />
            <LayoutColor
                changeLayoutColorScheme={changeLayoutColorScheme}
                layoutColor={layoutColor}
                layoutConstants={layoutConstants.LayoutColor}
            />

            {/* Width */}
            <LayoutWidth
                changeWidthMode={changeWidthMode}
                layoutWidth={layoutWidth}
                layoutConstants={layoutConstants.LayoutWidth}
            />

            {/* Menu Posiotions */}
            <MenuPositions
                menuPosition={menuPosition}
                changeMenuPosition={changeMenuPosition}
                layoutConstants={layoutConstants.MenuPositions}
            />

            {/* Left Sidebar */}
            {disableSidebarTheme && (
                <LeftSideBarTheme
                    changeLeftSidebarTheme={changeLeftSidebarTheme}
                    leftSideBarTheme={leftSideBarTheme}
                    layoutConstants={layoutConstants.SideBarTheme}
                />
            )}

            {/* Left Sidebar Size */}
            {disableSidebarType && (
                <LeftSideBarType
                    changeLeftSiderbarType={changeLeftSiderbarType}
                    leftSideBarType={leftSideBarType}
                    layoutConstants={layoutConstants.SideBarTypes}
                />
            )}

            {/* User Info */}
            {disableSidebarUser && (
                <SidebarUserInfo
                    toggleLeftSidebarUserInfo={toggleLeftSidebarUserInfo}
                    showSidebarUserInfo={showSidebarUserInfo}
                />
            )}

            {/* Topbar */}
            {disableTopbarTheme && (
                <TopbarTheme
                    changeTopBarTheme={changeTopBarTheme}
                    topbarTheme={topbarTheme}
                    layoutConstants={layoutConstants.TopbarTheme}
                />
            )}

            <div className="d-grid mt-4">
                <Button id="resetBtn" onClick={() => reset()}>
                    Reset to Default
                </Button>
            </div>
        </div>
    );
};

export default ThemeCustomizer;
