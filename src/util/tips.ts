const tips = [
  'You can also paste the content of your SVG right in this page!',
  'Use shortcuts like CTRL+O and CTRL+S to quickly open and save files!',
  'Contribute on GitHub to make this project even better!',
  "Use this site even when you're not connected to the internet!",
  'If you want to minify your SVGs via an automated script, use SVGO!',
]

export function getRandomTip() {
  return tips[Math.floor(Math.random() * tips.length)]
}
