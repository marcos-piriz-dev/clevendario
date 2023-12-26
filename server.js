import app from './app.js'
import { PORT } from './config.js'
import { connectDB } from './db.js'

async function main() {
  try {
    await connectDB()
    app.listen(PORT, HOST, () => {
      console.log(`App runing on ${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

main()