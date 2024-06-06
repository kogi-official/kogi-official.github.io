export {
    GetJsonAsync,
    GetTextAsync
}

async function GetJsonAsync(path) {
    let response = await fetch(path);
    if (!response.ok) {
        throw new Error(`failed to fetch JSON from ${path}`);
    }
    return response.json();
}

async function GetTextAsync(path) {
    let response = await fetch(path);
    if (!response.ok) {
        throw new Error(`failed to fetch text from ${path}`);
    }
    return response.text();
}