class Project {
    constructor(id, name, initialTime = 0) {
        this.id = id;
        this.name = name;
        this.seconds = initialTime;
        this.timer = null;
    }

    start(onTick) {
        if (this.timer) return;
        this.timer = setInterval(() => {
            this.seconds++;
            onTick(this.seconds);
        }, 1000);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
    }
}
window.Project = Project;
