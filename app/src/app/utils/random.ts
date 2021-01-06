export function linear(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function special(specialChance: number, max: number, min: number): number | true {

  if (Math.random() > (specialChance - 1 / (max - min))) {
    return linear(max, min);
  }
  return true;
}
