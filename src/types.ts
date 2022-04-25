type HistoryEntry = {
    title: string;
    url: string;
    time: number;
    categories?:string[];
};

// A user-defined category for filtering history entries
type Category = {
    name: string,
    patterns: string[],
}
// eslint-disable-next-line
type HistoryState = {
    entries: HistoryEntry[],
};

// eslint-disable-next-line
type SettingsState = {
    version: string,
    imported: boolean,
};

// eslint-disable-next-line
type CategoryState = {
    categories: Category[],
};
