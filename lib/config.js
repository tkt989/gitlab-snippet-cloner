const prompts = require('prompts')
prompts.override(require('yargs').argv)

/** @type {Array<prompts.PromptObject>} */
const questions = [
  {
    type: 'text',
    name: 'gitlabUrl',
    message: 'Gitlab URL'
  },
  {
    type: 'text',
    name: 'accessToken',
    message: 'access token'
  },
  {
    type: 'text',
    name: 'srcProject',
    message: 'source project'
  },
  {
    type: 'text',
    name: 'dstProject',
    message: 'destination project'
  }
]

class Config {
  async askConfig() {
    await this._prompt(questions)
  }

  /**
   *
   * @param {Array<prompts.PromptObject>} questions
   */
  async _prompt(questions) {
    const response = await prompts(questions)
    questions.forEach(q => {
      this[q.name] = response[q.name]
    })
  }
}

module.exports = Config
