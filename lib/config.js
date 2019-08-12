const prompts = require('prompts')

/** @type {prompts.PromptObject} */
const gitlabUrl = {
  type: 'text',
  name: 'gitlabUrl',
  message: 'Gitlab URL'
}

/** @type {prompts.PromptObject} */
const accessToken = {
  type: 'text',
  name: 'accessToken',
  message: 'access token'
}

/** @type {prompts.PromptObject} */
const srcProject = {
  type: 'text',
  name: 'srcProject',
  message: 'source project'
}

/** @type {prompts.PromptObject} */
const dstProject = {
  type: 'text',
  name: 'dstProject',
  message: 'destination project'
}

class Config {
  async askConfig() {
    await this._prompt(gitlabUrl)
    await this._prompt(accessToken)
    await this._prompt(srcProject)
    await this._prompt(dstProject)
  }

  /**
   *
   * @param {prompts.PromptObject} question
   */
  async _prompt(question) {
    const response = await prompts(question)
    this[question.name] = response[question.name]
  }
}

module.exports = Config
