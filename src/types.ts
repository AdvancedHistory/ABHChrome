type HistoryEntry = any;

type HistoryState = {
    open: HistoryEntry[],
    entries: HistoryEntry[],
};

type SettingsState = {
    version: string,
    imported: boolean,
};