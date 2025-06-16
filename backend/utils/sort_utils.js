export const titleSort = (entries) => {
    entries.sort((left_entry, right_entry) => {
        if (left_entry.title < right_entry.title) {return -1;}
        if (left_entry.title > right_entry.title) {return 1;}
        return 0;
    })
    return entries
}