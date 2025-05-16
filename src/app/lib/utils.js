
export const queryString = (params, key, value) => {
    const newParams = new URLSearchParams(params);
    newParams.set(key, value);
    return `?${newParams.toString()}`;
}