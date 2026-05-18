/**
 * Project: [NEW PROJECT NAME]
 * File:    dbSync.js
 * Desc:    Manages LocalStorage <-> SQLite synchronization with namespacing.
 **/

// 1. DYNAMIC PREFIX HELPER
// This looks for the prefix you set at the top of main.js
const getPrefix = () => (window.APP_CONFIG && window.APP_CONFIG.prefix) ? window.APP_CONFIG.prefix + "_" : "APP_";

/**
 * STAGE 1: INITIALIZE
 * Loads JSON files from /data/ into LocalStorage based on dataList.txt
 */
async function initAppData() {
    const PREFIX = getPrefix();
    try {
        const response = await fetch('utilities/dataList.txt');
        const text = await response.text();
        const fileNames = text.split(/\r?\n/).filter(name => name.trim() !== "");

        for (const name of fileNames) {
            const storageKey = PREFIX + name;
            // Only fetch if this specific project doesn't have the data yet
            if (!localStorage.getItem(storageKey)) {
                const res = await fetch(`data/${name}.json`);
                if (res.ok) {
                    const data = await res.json();
                    localStorage.setItem(storageKey, JSON.stringify(data));
                    console.log(`Initialized [${PREFIX}]: ${name}`);
                }
            }
        }
        console.log(`✅ LocalStorage synced for prefix: ${PREFIX}`);
    } catch (err) {
        console.error("❌ Init failed:", err);
    }
}

/**
 * STAGE 2: SAVE
 * Sends ONLY this project's LocalStorage data to SQLite via save_to_db.php
 */
async function saveLocalToDb() {
    const PREFIX = getPrefix();
    const storageData = {};

    // Only gather keys that belong to THIS project
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith(PREFIX)) {
            storageData[key] = localStorage.getItem(key);
        }
    });

    try {
        const response = await fetch('save_to_db.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(storageData)
        });

        const result = await response.json();
        console.log("✅ DB Save Response:", result.message);
        return result;
    } catch (err) {
        console.error("❌ Save to DB failed:", err);
    }
}

/**
 * STAGE 3: RESTORE
 * Pulls data from SQLite and overwrites LocalStorage
 */
async function restoreLocalFromDb() {
    try {
        const response = await fetch('read_db.php');
        const dbData = await response.json();

        Object.entries(dbData).forEach(([key, value]) => {
            // Ensure data is stringified for LocalStorage
            const storageValue = (typeof value === 'object') ? JSON.stringify(value) : value;
            localStorage.setItem(key, storageValue);
        });

        console.log("✅ LocalStorage restored from SQLite.");
        location.reload(); 
    } catch (err) {
        console.error("❌ Restore failed:", err);
    }
}

/**
 * HELPER: GETTER
 * Automatically handles the prefixing so you can just use the filename
 */
function getLocalData(key) {
    const PREFIX = getPrefix();
    const data = localStorage.getItem(PREFIX + key);
    try {
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return data; // Return as-is if simple string
    }
}

// Global Exports for non-module usage
window.initAppData = initAppData;
window.saveLocalToDb = saveLocalToDb;
window.restoreLocalFromDb = restoreLocalFromDb;
window.getLocalData = getLocalData;
