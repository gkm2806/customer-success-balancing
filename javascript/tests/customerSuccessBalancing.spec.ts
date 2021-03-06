/* eslint-disable */
import { CustomerSuccessBalancing } from './../src/models/customerSuccessBalancing';


test('Scenario 1', () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway:number[] = [2, 4];

  expect(new CustomerSuccessBalancing(css, customers, csAway).execute()).toEqual(1);
});

function buildSizeEntities(size:number, score:number) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    //@ts-ignore
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr:number[]):obj[] {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count:number, startAt:number){
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

test('Scenario 2', () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  //                             11  11  11  21  21  31  31  31  21  31
  // O css 31 tem 4 customers e ganha sozinho, embora o 11 e o 21 empatem em segundo, não vejo pq o teste esperar um empate
  const csAway:number[] = [];

  expect(new CustomerSuccessBalancing(css, customers, csAway).execute()).toEqual(0);
});

test('Scenario 3', () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway:number[] = [999];

  // MARK: the 999 is deleted in the upper line, getting right value from the ruby version
  expect(new CustomerSuccessBalancing(css, customers, csAway).execute()).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test('Scenario 4', () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway:number[] = [];

  expect(new CustomerSuccessBalancing(css, customers, csAway).execute()).toEqual(0);
});

test('Scenario 5', () => {
  const css = mapEntities([100, 2, 3, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway:number[] = [];

  expect(new CustomerSuccessBalancing(css, customers, csAway).execute()).toEqual(1);
});

test('Scenario 6', () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway:number[] = [1, 3, 2];

  expect(new CustomerSuccessBalancing(css, customers, csAway).execute()).toEqual(0);
});

test('Scenario 7', () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway:number[] = [4, 5, 6];

  expect(new CustomerSuccessBalancing(css, customers, csAway).execute()).toEqual(3);
});
