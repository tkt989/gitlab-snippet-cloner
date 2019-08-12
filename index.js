const prompts = require('prompts')

const f = async () => {
  await prompts({
    type: 'text',
    name: 'test',
    message: 'test'
  })
}

f()
