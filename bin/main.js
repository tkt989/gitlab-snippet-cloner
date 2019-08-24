#!/usr/bin/env node
const Config = require('../lib/config')
const Api = require('../lib/api')
const chalk = require('chalk')
const ora = require('ora')

if (process.stdout._handle) process.stdout._handle.setBlocking(true)

async function main() {
  try {
    const c = new Config()
    await c.askConfig()

    const spinner = ora().start()

    const api = new Api(c)
    const srcSnippets = await api.listSnippets(c.srcProject)
    const dstSnippets = await api.listSnippets(c.dstProject)
    srcSnippets.sort((a, b) => {
      return a.created_at < b.created_at ? -1 : 1
    })

    spinner.stop()

    for (let i = 0; i < srcSnippets.length; i++) {
      const snippet = srcSnippets[i]
      const exists = dstSnippets.some(dstSnippet =>
        equalsSnippet(snippet, dstSnippet)
      )

      if (exists) {
        console.info(chalk.bold.blue('Skip: ') + `${snippet.title}`)
        continue
      }

      await api.createSnippet(c.dstProject, snippet)
      console.info(chalk.bold.green('Create: ') + `${snippet.title}`)
    }
  } catch (e) {
    console.error(e.message)
  }
}

function equalsSnippet(a, b) {
  return (
    a.title === b.title &&
    a.description === b.description &&
    a.file_name === b.file_name
  )
}

main()
