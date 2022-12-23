`
cube(1):
/\_\
\/_/

cube(2):
 /\_\_\
/\/\_\_\
\/\/_/_/
 \/_/_/

cube(3):
  /\_\_\_\
 /\/\_\_\_\
/\/\/\_\_\_\
\/\/\/_/_/_/
 \/\/_/_/_/
  \/_/_/_/



  Logic for cube with size S

  LT  |  RT
  ---------
  LB  |  RB

  LT = N * <space> + M * <sign> with:
    - 0 <= N < S
    - 0 < M <= S
    - N + M = S
    - sign = /\

  RT = S * <sign> with:
  - sign = _\

  LB = N * <space> + M * <sign> with:
    - 0 <= N < S
    - 0 < M <= S
    - N + M = S
    - sign = \/

  RB = S * <sign> with:
  - sign = _/

`;

function createCube(size: number): string {
  const lines = Array.from(
    { length: size * 2 },
    (_, idx) => `${left(size, idx)}${right(size, idx)}`
  );

  return lines.join("\n");
}

function left(cubeSize: number, idx: number): string {
  const isTop = idx < cubeSize;

  const chars = isTop ? "/\\" : "\\/";

  const spaceCount = isTop ? cubeSize - idx - 1 : idx % cubeSize;
  const charsCount = isTop ? idx + 1 : cubeSize - (idx % cubeSize);

  return `${" ".repeat(spaceCount)}${chars.repeat(charsCount)}`;
}

function right(cubeSize: number, idx: number): string {
  const isTop = idx < cubeSize;

  const chars = isTop ? "_\\" : "_/";

  return chars.repeat(cubeSize);
}
