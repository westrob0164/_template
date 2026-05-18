/**
 * Project: [PROJECT NAME]
 * File:    main.js
 * Desc:    The "Conductor" script. Manages project config, data hydration,
 *          and isolates structural event triggers.
 **/

// 1. PROJECT CONFIGURATION
// ALWAYS change this prefix when starting a new project to isolate LocalStorage variables
window.APP_CONFIG = {
    prefix: "TEMPLATE_V1" 
};

// 2. GLOBAL DATA STORE
window.DATA = {};

$(document).ready(function() {
    console.clear();
    
    // 3. INITIALIZE DATA ENGINE
    initAppData().then(() => {
        // Hydrate configuration records
        fetch('utilities/dataList.txt')
            .then(res => res.text())
            .then(text => {
                const names = text.split(/\r?\n/).filter(n => n.trim() !== "");
                
                names.forEach(name => {
                    window.DATA[name] = getLocalData(name);
                });

                console.log("🚀 Data Engine Hydrated. Attaching listeners...");
                setupEventListeners();
                
                console.log("Starting Application Interface UI...");
                startProjectUI(); 
            });
    });
});

/**
 * 4. CENTRALIZED EVENT LISTENERS
 * Keeps your root initialization cycle completely isolated from UI bindings
 */
function setupEventListeners() {
    // Settings Modal Toggle Actions
    $('#openSettings').on('click', function() {
        $('#settingsModal').css('display', 'flex').hide().fadeIn(200);
    });

    $('#closeSettings, .modal-overlay').on('click', function(e) {
        if (e.target === this || $(e.target).is('#closeSettings')) {
            $('#settingsModal').fadeOut(200);
        }
    });

    // Core System Backup Actions
    $("#saveButton").on("click", function() {
        saveLocalToDb().then(() => {
            alert("✅ Backup saved to SQLite successfully.");
        }).catch(err => {
            alert("❌ System save error. Review developer logs.");
        });
    });

    $("#restoreButton").on("click", function() {
        if (confirm("⚠️ WARNING: This will overwrite your current screen data with the DB backup. Continue?")) {
            restoreLocalFromDb();
        }
    });
}

/**
 * 5. START PROJECT UI
 * Clean, untainted execution entry point for your application logic
 */
function startProjectUI() {
    console.log("✅ Application Clean Starter Init.");
    console.log("Active Dataset Scope:", window.DATA);

    // --- YOUR CODE STARTS HERE ---
    
}
