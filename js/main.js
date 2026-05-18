/**
 * Project: [PROJECT NAME]
 * File:    main.js
 * Desc:    The "Conductor" script. Manages project config, data hydration,
 *          Settings Modal toggles, and the main UI entry point.
 **/

// 1. PROJECT CONFIGURATION
// ALWAYS change this prefix when starting a new project to isolate LocalStorage
window.APP_CONFIG = {
    prefix: "TEMPLATE_V1" 
};

// 2. GLOBAL DATA STORE
window.DATA = {};

$(document).ready(function() {
    // Clear console for a fresh start 
    console.clear();
    
    // 3. INITIALIZE DATA ENGINE
    // Syncs /data/*.json files into LocalStorage
    initAppData().then(() => {
        
        // 4. HYDRATE GLOBAL DATA OBJECT
        // Uses the auto-generated dataList.txt to find what to load
        fetch('utilities/dataList.txt')
            .then(res => res.text())
            .then(text => {
                const names = text.split(/\r?\n/).filter(n => n.trim() !== "");
                
                names.forEach(name => {
                    // getLocalData automatically handles the APP_CONFIG prefix
                    window.DATA[name] = getLocalData(name);
                });

                console.log("🚀 Data Engine Ready. Starting UI...");
                startProjectUI(); 
            });
    });

    // 5. SETTINGS MODAL LOGIC (The Gear Icon)
    $('#openSettings').on('click', function() {
        $('#settingsModal').css('display', 'flex').hide().fadeIn(200);
    });

    // Close Modal (Click X or click outside the white box)
    $('#closeSettings, .modal-overlay').on('click', function(e) {
        if (e.target === this) {
            $('#settingsModal').fadeOut(200);
        }
    });

    // 6. SYSTEM CONTROLS (Tucked inside the Modal)
    $("#saveButton").on("click", function() {
        saveLocalToDb().then(() => {
            alert("✅ Backup saved to SQLite successfully.");
        });
    });

    $("#restoreButton").on("click", function() {
        if(confirm("⚠️ WARNING: This will overwrite your current screen data with the DB backup. Continue?")) {
            restoreLocalFromDb();
        }
    });
});

/**
 * 7. START PROJECT UI
 * This is the entry point for your specific app logic.
 * You will build your grid, tally, or ship lists inside this function.
 */
function startProjectUI() {
    console.log("✅ Application Started.");
    console.log("Current Data Available:", window.DATA);

    // --- YOUR CODE STARTS HERE ---
    
}

/**
 * 8. UI HELPERS
 * Keep your project-specific drawing functions down here.
 */
