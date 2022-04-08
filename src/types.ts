type HistoryEntry = {
    title: string;
    url: string;
    time: number;
};

// A user-defined category for filtering history entries
type Category = {
    name: string,
    patterns: string[],
}

type HistoryState = {
    entries: HistoryEntry[],
};

type SettingsState = {
    version: string,
    imported: boolean,
};

type CategoryState = {
    categories: Category[],
};

