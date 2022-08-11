export const saveSettings = (settings) => {
    let allSettings = localStorage.getItem('settings');
    if (!allSettings) {
        allSettings = [];
    } else {
        allSettings = JSON.parse(allSettings);
    }

    let foundSettings = allSettings.find((s) => s.userId === settings.userId);
    if (foundSettings) {
        allSettings = allSettings.map((s) => {
            if (s.userId === settings.userId) {
                return settings;
            }
            return s;
        });
    } else {
        allSettings.push(settings);
    }

    localStorage.setItem('settings', JSON.stringify(allSettings));
};