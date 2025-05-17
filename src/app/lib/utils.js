
export const queryString = (params, key, value) => {
    const newParams = new URLSearchParams(params);
    newParams.set(key, value);
    return `?${newParams.toString()}`;
}


export function formatDateToDMY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
