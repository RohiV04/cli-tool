#!/usr/bin/env node
import chalk from "chalk";
import clear from "clear";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import inquirer from "inquirer";
import "axios";
import { createSpinner } from "nanospinner";
import axios from "axios";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Welcome Hacker \n");

  await sleep();
  rainbowTitle.stop();

  console.log(`
        ${chalk.bgBlue("I am a process on your computer.")} 
        you can ask me  ${chalk.bgRed("any thing")}
        I will try to answer you.
        type ${chalk.bgGreen("exit")} to exit
    `);
}

async function ask() {
  const { question } = await inquirer.prompt([
    {
      name: "question",
      type: "input",
      message: "What do you want to know?",
      default() {
        return "How are you?";
      },
    },
  ]);
  console.log(question);
  if (question === "exit") {
    thankYou();
  }
  const spinner = createSpinner("I'm thinking...");

  spinner.start();

  await sleep();
  const { data } = await axios.get(
    `https://sih-server.adaptable.app/chat-completion/${question}`
  );
  spinner.stop();

  console.log(`${chalk.green(data.output)}`);

  await ask(); // recursively call ask to keep asking questions
}

const thankYou = () => {
  console.log(gradient.vice(figlet.textSync("Thank You")));
};

async function main() {
  await welcome();
  await ask();
}
function winner() {
  console.clear();
  figlet(`Congrats , !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");

    console.log(
      chalk.green(
        `Programming isn't about what you know; it's about making the command line look cool`
      )
    );
    process.exit(0);
  });
}

main();
// thankYou();
// winner();
