/**
 * Santa Claus has realized that even with the collaboration of all the elves he will not be able to deliver all the gifts in time.
 * That's why he will ask for help from his friends at Autentia.

From Autentia they have indicated that they need a program to know which team of reindeer to send to each country.
There are different types of reindeer and each one of them can carry a weight of gifts. For example:

```ts
const reindeerTypes = [
  { type: 'Nuclear', weightCapacity: 50 },
  { type: 'Electric', weightCapacity: 10 },
  { type: 'Gasoline', weightCapacity: 5 },
  { type: 'Diesel', weightCapacity: 1 }
]
```
In Santa Claus' list of gifts, the weight of each gift and its destination country are expressed.
The weight of the gifts is always a natural number. For example:

```ts
const gifts = [
  { country: 'Spain', weight: 30 },
  { country: 'France', weight: 17 },
  { country: 'Italy', weight: 50 }
]
```
Autentia tells us that, for the team of reindeer to send to each country to be optimal, we should:

Send the maximum number of reindeer possible of greater load capacity
Make the most of the weight that each reindeer can carry.
The reindeer have a rather strange character and do not accept that in the team there are more reindeer
of a type than reindeer of the next type in descending order of load capacity.
For example. To France (17) you would not send seventeen diesel reindeer (17 * 1).
There are reindeer with greater load capacity, but you would not send a nuclear reindeer (50),
since you would be wasting its capacity. An electric reindeer (10) would be sent, one gasoline (5) and two diesel (2 * 1).

To Spain (37) you could not send a team made up of three electric reindeer (3 * 10), one gasoline (5) and two diesel (2 * 1),
since there cannot be more electric reindeer than gasoline. 
Nor two electric reindeer (2 * 10), three gasoline (3 * 5) and two diesel (2 * 1), since there cannot be more gasoline than diesel. 
You would have to send two electric reindeer (2 * 10), two gasoline (2 * 5) and seven diesel (7 * 1).

```ts
const reindeerTypes = [
  { type: 'Nuclear', weightCapacity: 50 },
  { type: 'Electric', weightCapacity: 10 },
  { type: 'Gasoline', weightCapacity: 5 },
  { type: 'Diesel', weightCapacity: 1 }
]

const gifts = [
  { country: 'Spain', weight: 30 },
  { country: 'France', weight: 17 },
  { country: 'Italy', weight: 50 }
]

howManyReindeers(reindeerTypes, gifts)
// [{
//   country: 'Spain',
//   reindeers: [
//     { type: 'Electric', num: 1 },
//     { type: 'Gasoline', num: 3 },
//     { type: 'Diesel', num: 5 }
//   ]
// }, {
//   country: 'France',
//   reindeers: [
//     { type: 'Electric', num: 1 },
//     { type: 'Gasoline', num: 1 },
//     { type: 'Diesel', num: 2 }
//   ]
//  }, {
//   country: 'Italy',
//   reindeers: [
//     { type: 'Electric', num: 3 },
//     { type: 'Gasoline', num: 3 },
//     { type: 'Diesel', num: 5 }
//   ]
// }]
```
To take into account:

- There will always be a reindeer type with a load capacity of 1.
- There will always be at least two types of reindeer available.
- There is no limit to the number of reindeer of the same type to send as long as it complies with the restrictions previously stated.
- Your function should return the reindeers types sorted by weight capacity in descending order.
 */
function howManyReindeers(
  reindeerTypes: ReindeerType[],
  gifts: Gift[]
): Result[] {
  return gifts.map((gift) => ({
    country: gift.country,
    reindeers: divideGifts(gift.weight, reindeerTypes),
  }));
}

interface Reindeer {
  readonly type: string;
}

interface ReindeerType extends Reindeer {
  readonly weightCapacity: number;
}
interface ReindeerSpec extends Reindeer {
  readonly num: number;
}

interface Gift {
  readonly country: string;
  readonly weight: number;
}

interface Result {
  readonly country: string;
  readonly reindeers: ReindeerSpec[];
}

function divideGifts(
  giftWeight: number,
  types: ReindeerType[]
): ReindeerSpec[] {
  // sort types by capacity descending, so we can start with the "big ones"
  const sortedTypes = [...types].sort(
    (x, y) => y.weightCapacity - x.weightCapacity
  );

  // start recursing with an "empty" solution
  return divideGiftsRecursive(giftWeight, sortedTypes, []);
}

/**
 * The actual distribution logic.
 * Returning an empty array equals "Does not work, try again"
 *
 * `types` has to be sorted in descending order!
 */
function divideGiftsRecursive(
  weight: number,
  types: ReindeerType[],
  solution: ReindeerSpec[]
): ReindeerSpec[] {
  // if no types left, we're done
  // otherwise, the previous one needs to take less
  if (weight === 0) {
    return types.length === 0 ? solution : [];
  }

  // type is only relevant if it can handle the remaining weight
  const [first, ...remainingTypes] = types.filter(
    (t) => t.weightCapacity <= weight
  );

  // no more types left
  if (first === undefined) {
    return solution;
  }

  // how much can the current reindeer handle at max?
  const div = Math.floor(weight / first.weightCapacity);

  // how much does the previous one already handle?
  const prevDiv = solution[solution.length - 1]?.num ?? 0;

  // previous one needs to take less
  if (prevDiv > div) {
    return [];
  }

  // current reindeer in the list can take at minimum the same as the previous one
  for (let possDiv = div; possDiv >= prevDiv; possDiv--) {
    // modulo
    const remainingWeight = weight - possDiv * first.weightCapacity;

    // add the current reindeer and its count to the solution
    const updatedSolution =
      possDiv > 0
        ? solution.concat({
            type: first.type,
            num: possDiv,
          })
        : solution;

    // perform the same logic for the rest
    const finalSolution = divideGiftsRecursive(
      remainingWeight,
      remainingTypes,
      updatedSolution
    );

    // if this is true, a solution in the lower recursion was found, return it
    if (finalSolution.length > 0) return finalSolution;

    // else: resursion failed at some deeper level, which means: current reindeer took too much, try it again with less
  }

  // current reindeer can not take anything -> previous one needs to take less
  return [];
}
