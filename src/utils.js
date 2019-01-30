export function getRandomHslColorScheme(colorCount) {
  const
    hue = Math.floor(Math.random() * 360),
    shift = Math.floor(150 / colorCount),
    values = []
  for (let i = 0; i < colorCount; i++) {
    let color = hue + shift * i
    if (color > 360) color = color - 360
    values.push(
      `hsl( ${color}, 80%, 50%)`,
    )
  }
  console.log(values[3])
  return values
}