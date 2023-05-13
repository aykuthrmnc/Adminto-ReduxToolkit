// app constants
import { LayoutColor, TopbarTheme, LayoutWidth, SideBarTypes } from '~/constants';

enum LayoutActionTypes {
    CHANGE_LAYOUT = '@@layout/CHANGE_LAYOUT',
    CHANGE_LAYOUT_COLOR = '@@layout/CHANGE_LAYOUT_COLOR',
    CHANGE_LAYOUT_WIDTH = '@@layout/CHANGE_LAYOUT_WIDTH',
    CHANGE_MENU_POSITIONS = '@@layout/CHANGE_MENU_POSITIONS',
    CHANGE_SIDEBAR_THEME = '@@layout/CHANGE_SIDEBAR_THEME',
    CHANGE_SIDEBAR_TYPE = '@@layout/CHANGE_SIDEBAR_TYPE',
    TOGGLE_SIDEBAR_USER_INFO = '@@layout/TOGGLE_SIDEBAR_USER_INFO',
    CHANGE_TOPBAR_THEME = '@@layout/CHANGE_TOPBAR_THEME',

    TOGGLE_TWO_TONE_ICONS = '@@layout/TOGGLE_TWO_TONE_ICONS',
    SHOW_RIGHT_SIDEBAR = '@@layout/SHOW_RIGHT_SIDEBAR',
    HIDE_RIGHT_SIDEBAR = '@@layout/HIDE_RIGHT_SIDEBAR',
}

type LayoutActionType<TPayload> = {
    type:
        | LayoutActionTypes.CHANGE_LAYOUT
        | LayoutActionTypes.CHANGE_LAYOUT_COLOR
        | LayoutActionTypes.CHANGE_LAYOUT_WIDTH
        | LayoutActionTypes.CHANGE_MENU_POSITIONS
        | LayoutActionTypes.CHANGE_SIDEBAR_THEME
        | LayoutActionTypes.CHANGE_SIDEBAR_TYPE
        | LayoutActionTypes.TOGGLE_SIDEBAR_USER_INFO
        | LayoutActionTypes.CHANGE_TOPBAR_THEME
        | LayoutActionTypes.SHOW_RIGHT_SIDEBAR
        | LayoutActionTypes.HIDE_RIGHT_SIDEBAR;
    payload?: TPayload;
};

type ConfigTypes = {
    topbarTheme: TopbarTheme.TOPBAR_THEME_LIGHT | TopbarTheme.TOPBAR_THEME_DARK;
    leftSideBarType:
        | SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT
        | SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED
        | SideBarTypes.LEFT_SIDEBAR_TYPE_COMPACT;
};

// add property to change in particular option
let config: ConfigTypes = {
    topbarTheme: TopbarTheme.TOPBAR_THEME_LIGHT,
    leftSideBarType: SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT,
};

const getLayoutConfigs = (
    actionType: LayoutActionType<string | boolean | null>['type'],
    value: string | boolean | null
) => {
    switch (actionType) {
        case LayoutActionTypes.CHANGE_LAYOUT_COLOR:
            switch (value) {
                case LayoutColor.LAYOUT_COLOR_DARK:
                    config.topbarTheme = TopbarTheme.TOPBAR_THEME_DARK;
                    break;
                case LayoutColor.LAYOUT_COLOR_LIGHT:
                    config.topbarTheme = TopbarTheme.TOPBAR_THEME_LIGHT;
                    break;
                default:
                    return config;
            }
            break;

        case LayoutActionTypes.CHANGE_LAYOUT_WIDTH:
            switch (value) {
                case LayoutWidth.LAYOUT_WIDTH_FLUID:
                    config.leftSideBarType = SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT;
                    break;
                case LayoutWidth.LAYOUT_WIDTH_BOXED:
                    config.leftSideBarType = SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED;
                    break;
                default:
                    return config;
            }
            break;
        default:
            return config;
    }
    return config;
};

/**
 * Changes the body attribute
 */
const changeBodyAttribute = (attribute: string, value: string): void => {
    if (document.body) document.body.setAttribute(attribute, value);
};

export { getLayoutConfigs, changeBodyAttribute };
