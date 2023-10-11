import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';
import ora from 'ora';

dotenv.config();

export async function connectDB() {
  try {
    const spinner = ora('Connecting to the database...').start();
    await mongoose.connect(process.env.MONGO_URI);
    spinner.stop();
    console.log(chalk.greenBright('Successfully connected to the database!!!'));
  }
  catch(err){
    console.log(chalk.redBright('Error: '), err);
    process.exit(1);
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log(chalk.greenBright('Disconnected from the database.'))
  }
  catch(err) {
    console.log(chalk.redBright('Error: '), err);
    process.exit(1);
  }
}

connectDB();
disconnectDB();