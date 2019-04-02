const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = function(question) {
    return new Promise(resolve =>
        rl.question(question, answer => resolve(answer))
    );
};

const input = async function() {
    const text = await ask("What do like to do ?");

    console.log(
        `${text}`
    );
    rl.close();
};

input();

