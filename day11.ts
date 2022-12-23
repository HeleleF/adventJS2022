/**
 * Santa Claus is a bit worried because the preparations are taking a long time. He has got a Scrum certification and has decided to use the Scrum methodology to organize the work of his elves.

The elfs tell him the expected duration of the tasks with a string with the format hh:mm:ss and in the same format how long they have been working on it.

But Santa Claus does not get quickly if there is too much or too little left to finish, so he has asked us to make a program that tells us what portion of the task has already been completed.

For example, if the task lasts 03:00:00 and they have been working for 01:00:00 then they have already completed 1/3 of the task. In code:

```ts
getCompleted('01:00:00', '03:00:00') // '1/3'
getCompleted('02:00:00', '04:00:00') // '1/2'
getCompleted('01:00:00', '01:00:00') // '1/1'
getCompleted('00:10:00', '01:00:00') // '1/6'
getCompleted('01:10:10', '03:30:30') // '1/3'
getCompleted('03:30:30', '05:50:50') // '3/5
```

Note:
- The time format is hh:mm:ss.
- The output format is a string a/b where a is the portion of the task that has already been completed and b is the portion of the task that is left to complete.
- The portion is always shown with the smallest fraction possible. (for example, 2/4 will never be shown because it can be represented as 1/2).
- If the task has already been completed, the fraction would be 1/1.
- No elf has been mistreated during the execution of this challenge nor have they had to use Scrum for real.
 */
function getCompleted(part: string, total: string): string {
  const partSeconds = parseTime(part);
  const totalSeconds = parseTime(total);

  const d = gcd(partSeconds, totalSeconds);

  return `${partSeconds / d}/${totalSeconds / d}`;
}

const TIME_REGEX = /^(?<hours>\d{2}):(?<minutes>\d{2}):(?<seconds>\d{2})$/;

function parseTime(stamp: string): number {
  // regex is guaranteed to match
  const { hours, minutes, seconds } = TIME_REGEX.exec(stamp)?.groups ?? {};

  return (
    parseInt(hours, 10) * 60 * 60 +
    parseInt(minutes, 10) * 60 +
    parseInt(seconds, 10)
  );
}

function gcd(a: number, b: number): number {
  if (a === 0) return b;
  if (b === 0) return a;

  let k: number;

  for (k = 0; a % 2 === 0 && b % 2 === 0; k++) {
    a = a / 2;
    b = b / 2;
  }

  while (a !== 0) {
    while (a % 2 === 0) a = a / 2;
    while (b % 2 === 0) b = b / 2;

    if (a < b) {
      [a, b] = [b, a];
    }

    a = a - b;
  }
  return b * 2 ** k;
}
