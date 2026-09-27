// Deployment script.
//
// Reads configuration from `.env` (committed example / placeholders) and
// `.env.local` (git-ignored, your real values). See `.env.example`.
//
//   pnpm deploy

import { execSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync } from 'node:fs'

function loadEnvFile(file) {
  if (!existsSync(file)) return
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*?)\s*$/)
    if (!match || line.trim().startsWith('#')) continue
    const key = match[1]
    const value = match[2].replace(/^["']|["']$/g, '')
    if (process.env[key] === undefined) process.env[key] = value
  }
}

loadEnvFile('.env')
loadEnvFile('.env.local')

function required(name) {
  const value = process.env[name]
  if (!value) {
    console.error(`[deploy] Missing required variable: ${name} (set it in .env.local)`)
    process.exit(1)
  }
  return value
}

const host = required('DEPLOY_HOST')
const user = required('DEPLOY_USER')
const sitePath = required('DEPLOY_PATH')
const owner = process.env.DEPLOY_OWNER || 'www:www'
const mode = process.env.DEPLOY_MODE || '755'
const tmpDir = process.env.DEPLOY_TMP_DIR || '/tmp'
const target = `${user}@${host}`
const archive = 'dist.tar.gz'

function run(command) {
  execSync(command, { stdio: 'inherit' })
}

try {
  run('pnpm build')
  run(`tar -czf ${archive} -C dist .`)
  run(`scp ${archive} ${target}:${tmpDir}/${archive}`)
  run(
    `ssh ${target} "sudo rm -rf ${sitePath}/* ` +
      `&& sudo tar -xzf ${tmpDir}/${archive} -C ${sitePath}/ ` +
      `&& sudo chown -R ${owner} ${sitePath} ` +
      `&& sudo chmod -R ${mode} ${sitePath}"`,
  )
} finally {
  rmSync(archive, { force: true })
}
