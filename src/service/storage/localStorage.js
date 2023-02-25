export function saveDataToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
};

export function loadDataFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};