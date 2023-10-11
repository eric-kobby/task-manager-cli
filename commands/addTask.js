import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';

import Tasks from '../schema/TaskSchema';

async function inputPrompts() {
  const answers = await inquirer.prompt([
    { name: 'name', message: 'Enter name of the task:', type: 'input' },
    { name: 'detail', message: 'Enter the details of the task:', type: 'input' },
  ]);
  return answers;
}

async function askQuestions() {
  let tasks = [];
  for (; ;) {
    const answers = await inputPrompts();
    tasks.push(answers);
    const confirmed = await inquirer.prompt([{ name: 'confirm', message: 'Do you want to add more tasks?', type: 'confirm' }]);
    if (!confirmed) break;
  }
  return tasks;
}

export default async function addTask() {
  try {
    // calling askQuestions() to get array of todo's
    const userResponse = await askQuestions()

    // connecting to the database
    await connectDB()

    // Displaying a spinner with the following text message using ora 
    let spinner = ora('Creating the tasks...').start()

    // looping over every todo in the userResponse array
    // and saving each todo in the database
    for (let i = 0; i < userResponse.length; i++) {
      const response = userResponse[i]
      await Tasks.create(response)
    }

    // Stopping the spinner and displaying the success message
    spinner.stop()
    console.log(
      chalk.greenBright('Created the tasks!')
    )

    // disconnecting the database
    await disconnectDB()
  } catch (error) {
    // Error Handling
    console.log(chalk.redBright('Something went wrong, Error: '), error)
    process.exit(1)
  }
}
