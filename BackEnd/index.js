const app = require("./src/app.js")
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`hello we are on http://localhost:${PORT}`))
