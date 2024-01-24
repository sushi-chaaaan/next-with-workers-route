// @ts-check

import { ESLint } from "eslint"
import path from "path"

/** @type {(files: string[]) => Promise<string[]>} */
const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file)
    }),
  )
  const filteredFiles = files.filter((_, i) => !isIgnored[i])
  return filteredFiles
}

/** @type {(files: string[]) => string[]} */
const convertToAbsolutePath = (files) =>
  files.map((file) => path.relative(process.cwd(), file))

/** @type {(files: string[]) => string} */
const buildEslintCommand = (files) =>
  `next lint --file ${convertToAbsolutePath(files).join(" --file ")}`

/** @type {(files: string[]) => string} */
const buildPrettierCommand = (files) =>
  `prettier ${convertToAbsolutePath(files).join(" ")} --check`

export default {
  "**/*.{jsx,tsx}": async (/** @type {string[]} */ files) => {
    const filesToLint = await removeIgnoredFiles(files)
    if (filesToLint.length === 0) {
      return []
    }
    return [
      buildEslintCommand(filesToLint),
      buildPrettierCommand(filesToLint),
      "npm run markuplint:check",
    ]
  },
  "**/*.{js,cjs,mjs,ts,cts,mts}": async (/** @type {string[]} */ files) => {
    const filesToLint = await removeIgnoredFiles(files)
    if (filesToLint.length === 0) {
      return []
    }
    return [buildEslintCommand(filesToLint), buildPrettierCommand(filesToLint)]
  },
  "./**/*.{css,scss}": (/** @type {string[]} */ files) => [
    buildPrettierCommand(files),
    "npm run stylelint:check",
  ],
}
