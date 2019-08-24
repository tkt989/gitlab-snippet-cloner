const axios = require('axios')
const resolve = require('url').resolve
const Config = require('../lib/config')

class Api {
  /**
   * @param {Config} config
   * @param {axios.AxiosInstance?} instance
   */
  constructor(config, instance) {
    const url = resolve(config.gitlabUrl, '/api/v4')

    this.instance =
      instance ||
      axios.create({
        baseURL: url
      })
    this.instance.defaults.headers.common['PRIVATE-TOKEN'] = config.accessToken
  }

  async createSnippet(project, snippet) {
    const projectPath = encodeURIComponent(project)

    const params = {
      title: snippet.title,
      file_name: snippet.file_name,
      code: (await this.instance.get(
        `/projects/${snippet.project_id}/snippets/${snippet.id}/raw`
      )).data,
      description: snippet.description,
      visibility: snippet.visibility
    }

    const response = await this.instance.post(
      `/projects/${projectPath}/snippets`,
      params
    )
    return response
  }

  async listSnippets(project) {
    let result = []
    const projectPath = encodeURIComponent(project)

    const fetch = async page => {
      const response = await this.instance.get(
        `/projects/${projectPath}/snippets`,
        {
          params: {
            per_page: 100,
            page: page
          }
        }
      )
      return response.data
    }

    let page = 1
    while (true) {
      const snippets = await fetch(page++)
      if (snippets.length == 0) break
      result = result.concat(snippets)
    }
    return result
  }
}

module.exports = Api
