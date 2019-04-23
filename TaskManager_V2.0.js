const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    add(task, dl) {
        console.log("new task: ", task);
        const newTask = { name: task, deadline: dl, status: "unfinished" };
        this.tasks.push(newTask);
        fs.writeFileSync("tasks.json", JSON.stringify(this.tasks));
    }
    ask(question) {
        return new Promise(resolve =>
            rl.question(question, answer => resolve(answer))
        );
    }

    list() {
        console.log(this.tasks);
    }

    checkTask(task) {
        const json = JSON.parse(fs.readFileSync("tasks.json", "utf8"));
        console.log(task);
        console.log("unfinished: ", json);
        for (const entry in json) {
            if (json[entry].name === task) {
                json[entry].status = "finished";
            }
        }
        console.log("finished: ", json);
        fs.writeFileSync("tasks.json", JSON.stringify(json));
    }

    async init() {

        const initialQ = await this.ask(
            "Do you want to add a task, list all tasks or check a task?\n"
        );
        // console.log(initialQ);
        if (initialQ === "add") {
            const newTask = await this.ask("What task do you want to add?\n");
            const deadline = await this.ask(
                "Do you want to add a deadline to this task \n?"
            );
            this.add(newTask, deadline);
        }
        if (initialQ === "list") {
            this.list();
        }
        if (initialQ === "check") {
            const taskToCheck = await this.ask(
                "Which task do you want to mark as finished?"
            );
            this.checkTask(taskToCheck);
        }
        this.init();
    }
}

const tasks = new TaskManager();
tasks.init();