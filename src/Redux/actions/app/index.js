import { createActionString, createActionType } from "../../../_shared/utils";

export const UI_LOADING = createActionType("UI_LOADING", "UI");
export const UI_ERROR = createActionString("UI_ERROR", "UI");
export const UI_NAVIGATE = createActionString("UI_NAVIGATE", "UI");
export const API_REQUEST = createActionType("API_REQUEST", "API");

export const startUILoading = key => ({
    type: UI_LOADING.START,
    key
});

export const stopUILoading = key => ({
    type: UI_LOADING.END,
    key
});

export const updateUIError = (key, value) => ({
    type: UI_ERROR,
    key,
    value
});

export const navigateTo = path => ({
    type: UI_NAVIGATE,
    payload: path
});


export const apiRequest = meta => ({
    type: API_REQUEST.START,
    meta
});
