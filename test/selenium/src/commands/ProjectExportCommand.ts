import {Argv} from 'yargs'

import * as Path from 'path'

import {Rundeck, PasswordCredentialProvider} from 'ts-rundeck'

import {ProjectExporter} from 'projectExporter'



interface Opts {
    url: string
    project: string
    repo: string
}

class ProjectExportCommand {
    command = "export"
    describe = "Run selenium test suite"

    builder(yargs: Argv) {
        return yargs
            .option("p", {
                alias: "project",
                require: true,
                describe: "Project name",
                type: 'string'
            })
            .option("r", {
                alias: "repo",
                require: true,
                describe: "Repo path",
                type: 'string'
            })
            .option('u', {
                alias: "url",
                default: "http://127.0.0.1:4440",
                type: "string"
            })
    }

    async handler(opts: Opts) {
        const fullRepoPath = Path.resolve(opts.repo)

        const client = new Rundeck(new PasswordCredentialProvider(opts.url, 'admin', 'admin'), opts.url)

        const exporter = new ProjectExporter(opts.repo, opts.project, client)

        console.log(fullRepoPath)

        await exporter.exportProject()
    }
}

module.exports = new ProjectExportCommand()