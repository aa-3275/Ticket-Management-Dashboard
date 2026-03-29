export const fetchTicketsAPI = async (limit = 10, skip = 0) => {
  const res = await fetch(
    `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return res.json();
};
