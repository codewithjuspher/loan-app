const STORAGE_KEY = "mock_user_id";

export const setCurrentUser = (id: number) => {
	localStorage.setItem(STORAGE_KEY, id.toString());
};

export const getCurrentUser = (): number | null => {
	const id = localStorage.getItem(STORAGE_KEY);
	return id ? parseInt(id, 10) : null;
};

export const clearCurrentUser = () => {
	localStorage.removeItem(STORAGE_KEY);
};
