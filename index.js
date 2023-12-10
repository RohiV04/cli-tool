#!/usr/bin/env node
import chalk from "chalk";
import gradient from "gradient-string";
import figlet from "figlet";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import axios from "axios";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  console.log(chalk.green("Welcome Hacker \n"));

  console.log(`
        ${chalk.bgYellowBright.bold(
          "Im a program that can answer your questions"
        )}
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
        return "Hello";
      },
    },
  ]);

  if (question.toLowerCase() === "exit") {
    await thankYou();
    process.exit(0);
  } else {
    const spinner = createSpinner("Thinking...");
    spinner.start();

    await sleep();
try{
    const { data } = await axios.get(
      `https://sih-server.adaptable.app/chat-completion/${question}`
    );
    spinner.stop();

    console.log(`${chalk.green(data.output)}`);
    }
    catch(err){
      console.log(chalk.red("Sorry I don't know that"));
    }
    await ask(); // recursively call ask to keep asking questions
  }
}

const thankYou = () => {
  console.log(gradient.vice(figlet.textSync("Thank You")));
};

async function main() {
  await welcome();
  await ask();
}

main();
