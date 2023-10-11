import Tasks from "../schema/TaskSchema"

export default async function readTask(){
  try {
      // connecting to the database
      await connectDB()

      // starting the spinner
      const spinner = ora('Fetching all tasks...').start()

      // fetching all the tasks from the database 
      const tasks = await Tasks.find({})

      // stopping the spinner
      spinner.stop()

      // check if tasks exist or not
      if(tasks.length === 0){
          console.log(chalk.blueBright('You do not have any tasks yet!'))
      } else {
          tasks.forEach(task => {
              console.log(
                  chalk.cyanBright('Task Code: ') + task.code + '\n' + 
                  chalk.blueBright('Name: ') + task.name + '\n' + 
                  chalk.yellowBright('Description: ') + task.detail + '\n'
              )
          })
      }

      // disconnect from the database
      await disconnectDB()
  } catch (error) {
      // Error Handling
      console.log('Something went wrong, Error: ', error)
      process.exit(1)
  }
}
