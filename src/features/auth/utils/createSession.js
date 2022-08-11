export const createSession = (userId) => {
    // localStorage.setItem('session', JSON.stringify({ user, settings }));
    localStorage.setItem('session', userId);
    return;
};
