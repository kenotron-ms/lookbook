// File tree structure
export const fileTree = [
  {
    name: '.vscode',
    type: 'dir',
    expanded: false,
    children: [
      { name: 'settings.json', type: 'file' },
      { name: 'extensions.json', type: 'file' },
    ],
  },
  {
    name: 'node_modules',
    type: 'dir',
    expanded: false,
    children: [],
  },
  {
    name: 'src',
    type: 'dir',
    expanded: true,
    children: [
      {
        name: 'components',
        type: 'dir',
        expanded: true,
        children: [
          { name: 'Button.tsx', type: 'file', open: true, modified: true },
          { name: 'Input.tsx', type: 'file' },
          { name: 'Modal.tsx', type: 'file' },
        ],
      },
      {
        name: 'pages',
        type: 'dir',
        expanded: false,
        children: [
          { name: 'Home.tsx', type: 'file' },
          { name: 'Dashboard.tsx', type: 'file' },
        ],
      },
      { name: 'App.tsx', type: 'file', open: true, active: true },
      { name: 'main.tsx', type: 'file' },
      { name: 'index.css', type: 'file' },
    ],
  },
  { name: 'package.json', type: 'file' },
  { name: 'tsconfig.json', type: 'file' },
  { name: 'vite.config.ts', type: 'file', open: true },
  { name: 'README.md', type: 'file' },
]

export const openTabs = [
  { name: 'App.tsx', active: true, modified: false },
  { name: 'Button.tsx', active: false, modified: true },
  { name: 'vite.config.ts', active: false, modified: false },
]

export const appTsxContent = [
  { tokens: [{ text: 'import', color: '#c586c0' }, { text: ' React, ', color: '#9cdcfe' }, { text: '{ useState, useEffect }', color: '#9cdcfe' }, { text: ' from ', color: '#c586c0' }, { text: "'react'", color: '#ce9178' }] },
  { tokens: [{ text: 'import', color: '#c586c0' }, { text: ' { BrowserRouter, Routes, Route } ', color: '#9cdcfe' }, { text: 'from ', color: '#c586c0' }, { text: "'react-router-dom'", color: '#ce9178' }] },
  { tokens: [{ text: 'import', color: '#c586c0' }, { text: ' { Button } ', color: '#9cdcfe' }, { text: 'from ', color: '#c586c0' }, { text: "'./components/Button'", color: '#ce9178' }] },
  { tokens: [{ text: 'import', color: '#c586c0' }, { text: ' { Dashboard } ', color: '#9cdcfe' }, { text: 'from ', color: '#c586c0' }, { text: "'./pages/Dashboard'", color: '#ce9178' }] },
  { tokens: [{ text: "import './index.css'", color: '#ce9178' }] },
  { tokens: [] },
  { tokens: [{ text: '// ParaNet UI — Main application entry point', color: '#6a9955' }] },
  { tokens: [{ text: 'interface ', color: '#569cd6' }, { text: 'AppConfig ', color: '#4ec9b0' }, { text: '{', color: '#cccccc' }] },
  { tokens: [{ text: '  theme', color: '#9cdcfe' }, { text: ': ', color: '#cccccc' }, { text: "'light' | 'dark'", color: '#ce9178' }, { text: ';', color: '#cccccc' }] },
  { tokens: [{ text: '  version', color: '#9cdcfe' }, { text: ': ', color: '#cccccc' }, { text: 'string', color: '#569cd6' }, { text: ';', color: '#cccccc' }] },
  { tokens: [{ text: '  features', color: '#9cdcfe' }, { text: ': ', color: '#cccccc' }, { text: 'string', color: '#569cd6' }, { text: '[];', color: '#cccccc' }] },
  { tokens: [{ text: '}', color: '#cccccc' }] },
  { tokens: [] },
  { tokens: [{ text: 'const ', color: '#569cd6' }, { text: 'defaultConfig', color: '#9cdcfe' }, { text: ': ', color: '#cccccc' }, { text: 'AppConfig ', color: '#4ec9b0' }, { text: '= {', color: '#cccccc' }] },
  // line 15 — cursor here
  { tokens: [{ text: '  theme', color: '#9cdcfe' }, { text: ': ', color: '#cccccc' }, { text: "'dark'", color: '#ce9178' }, { text: ',', color: '#cccccc' }], cursor: true },
  { tokens: [{ text: '  version', color: '#9cdcfe' }, { text: ': ', color: '#cccccc' }, { text: "'1.0.0'", color: '#ce9178' }, { text: ',', color: '#cccccc' }] },
  { tokens: [{ text: '  features', color: '#9cdcfe' }, { text: ': [', color: '#cccccc' }, { text: "'dashboard'", color: '#ce9178' }, { text: ', ', color: '#cccccc' }, { text: "'analytics'", color: '#ce9178' }, { text: ']', color: '#cccccc' }] },
  { tokens: [{ text: '}', color: '#cccccc' }] },
  { tokens: [] },
  { tokens: [{ text: 'export default function ', color: '#569cd6' }, { text: 'App', color: '#dcdcaa' }, { text: '() {', color: '#cccccc' }] },
  { tokens: [{ text: '  const ', color: '#569cd6' }, { text: '[config, setConfig]', color: '#9cdcfe' }, { text: ' = ', color: '#cccccc' }, { text: 'useState', color: '#dcdcaa' }, { text: '<', color: '#cccccc' }, { text: 'AppConfig', color: '#4ec9b0' }, { text: '>(defaultConfig)', color: '#cccccc' }] },
  { tokens: [{ text: '  const ', color: '#569cd6' }, { text: '[loading, setLoading]', color: '#9cdcfe' }, { text: ' = ', color: '#cccccc' }, { text: 'useState', color: '#dcdcaa' }, { text: '<', color: '#cccccc' }, { text: 'boolean', color: '#569cd6' }, { text: '>(', color: '#cccccc' }, { text: 'true', color: '#569cd6' }, { text: ')', color: '#cccccc' }] },
  { tokens: [] },
  { tokens: [{ text: '  useEffect', color: '#dcdcaa' }, { text: '(() => {', color: '#cccccc' }] },
  { tokens: [{ text: '    // Initialize application', color: '#6a9955' }] },
  { tokens: [{ text: '    ', color: '#cccccc' }, { text: 'setLoading', color: '#dcdcaa' }, { text: '(', color: '#cccccc' }, { text: 'false', color: '#569cd6' }, { text: ')', color: '#cccccc' }] },
  { tokens: [{ text: '  }, [])', color: '#cccccc' }] },
  { tokens: [] },
  { tokens: [{ text: '  if ', color: '#c586c0' }, { text: '(loading) ', color: '#cccccc' }, { text: 'return ', color: '#c586c0' }, { text: '<', color: '#808080' }, { text: 'div', color: '#4ec9b0' }, { text: '>', color: '#808080' }, { text: 'Loading...', color: '#cccccc' }, { text: '</', color: '#808080' }, { text: 'div', color: '#4ec9b0' }, { text: '>', color: '#808080' }] },
  { tokens: [] },
  { tokens: [{ text: '  return ', color: '#c586c0' }, { text: '(', color: '#cccccc' }] },
  { tokens: [{ text: '    <', color: '#808080' }, { text: 'BrowserRouter', color: '#4ec9b0' }, { text: '>', color: '#808080' }] },
  { tokens: [{ text: '      <', color: '#808080' }, { text: 'div', color: '#4ec9b0' }, { text: ' className=', color: '#9cdcfe' }, { text: '"app"', color: '#ce9178' }, { text: '>', color: '#808080' }] },
  { tokens: [{ text: '        <', color: '#808080' }, { text: 'Routes', color: '#4ec9b0' }, { text: '>', color: '#808080' }] },
  { tokens: [{ text: '          <', color: '#808080' }, { text: 'Route ', color: '#4ec9b0' }, { text: 'path=', color: '#9cdcfe' }, { text: '"/"', color: '#ce9178' }, { text: ' element=', color: '#9cdcfe' }, { text: '{<', color: '#cccccc' }, { text: 'Dashboard', color: '#4ec9b0' }, { text: ' />}', color: '#cccccc' }, { text: ' />', color: '#808080' }] },
  { tokens: [{ text: '        </', color: '#808080' }, { text: 'Routes', color: '#4ec9b0' }, { text: '>', color: '#808080' }] },
  { tokens: [{ text: '      </', color: '#808080' }, { text: 'div', color: '#4ec9b0' }, { text: '>', color: '#808080' }] },
  { tokens: [{ text: '    </', color: '#808080' }, { text: 'BrowserRouter', color: '#4ec9b0' }, { text: '>', color: '#808080' }] },
  { tokens: [{ text: '  )', color: '#cccccc' }] },
  { tokens: [{ text: '}', color: '#cccccc' }] },
]

// Search results mock data
export const searchResults = [
  {
    file: 'src/App.tsx',
    matches: [
      { line: 3, text: "import { Button } from './components/Button'", highlight: 'Button' },
      { line: 20, text: "export default function App() {", highlight: 'App' },
    ],
  },
  {
    file: 'src/components/Button.tsx',
    matches: [
      { line: 1, text: "import React from 'react'", highlight: 'React' },
      { line: 5, text: "export function Button({ children, onClick, variant = 'primary' }) {", highlight: 'Button' },
    ],
  },
  {
    file: 'src/pages/Dashboard.tsx',
    matches: [
      { line: 8, text: "import { Button } from '../components/Button'", highlight: 'Button' },
    ],
  },
  {
    file: 'vite.config.ts',
    matches: [
      { line: 1, text: "import { defineConfig } from 'vite'", highlight: 'defineConfig' },
    ],
  },
]

// Extensions mock data
export const featuredExtensions = [
  {
    id: 'prettier',
    name: 'Prettier - Code formatter',
    publisher: 'Prettier',
    description: 'Code formatter using prettier',
    installs: '47.2M',
    rating: 4.5,
    icon: '🎨',
    installed: true,
  },
  {
    id: 'eslint',
    name: 'ESLint',
    publisher: 'Microsoft',
    description: 'Integrates ESLint JavaScript into VS Code.',
    installs: '38.1M',
    rating: 4.3,
    icon: '🔍',
    installed: false,
  },
  {
    id: 'gitlens',
    name: 'GitLens — Git supercharged',
    publisher: 'GitKraken',
    description: 'Supercharge Git within VS Code',
    installs: '28.6M',
    rating: 4.7,
    icon: '🔀',
    installed: false,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS IntelliSense',
    publisher: 'Tailwind Labs',
    description: 'Intelligent Tailwind CSS tooling',
    installs: '19.4M',
    rating: 4.8,
    icon: '💨',
    installed: true,
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    publisher: 'GitHub',
    description: 'Your AI pair programmer',
    installs: '15.2M',
    rating: 4.6,
    icon: '🤖',
    installed: false,
  },
  {
    id: 'themes',
    name: 'One Dark Pro',
    publisher: 'binaryify',
    description: 'Atom\'s iconic One Dark theme',
    installs: '12.8M',
    rating: 4.9,
    icon: '🌑',
    installed: false,
  },
]
