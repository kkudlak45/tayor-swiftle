const obfuscated = [7204, 8304, 8412, 6596, 7720, 6740, 8876, 8412, 7756, 8596, 7720, 6704, 8304, 8376, 6596, 6812, 7676];

export function getCodeWord(): string {
  return obfuscated.map((num: number) => {
    let deObf = num;
    deObf ^= 0b10101010;
    deObf -= 10;
    deObf /= 100;
    return String.fromCharCode(deObf)
  }).join('');
}