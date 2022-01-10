/* eslint-disable */
const sortObjBy = (array, param, asc = true) => {
  return asc 
    ? array.sort((a,b) => (a[param]===null)-(b[param]===null) || +(a[param]>b[param])||-(a[param]<b[param]))
    : array.sort((a,b) => (b[param]===null)-(a[param]===null) || +(b[param]>a[param])||-(b[param]<a[param]));
};

function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  let activeCustomers = customers;
  let activeCustomersSuccess, orderedActiveCustomersSuccess;

  const execute = () => {
    removeAwayCustomerSuccess();
    sortCustomerSucccessByScore();
    addCustomerCountToCustomerSuccess();
    matchCustomersToCustomerSuccess();
    orderActiveCustomersSuccess();

    return calculateReturn();
  };

  const removeAwayCustomerSuccess = () => {
    return activeCustomersSuccess = customerSuccess.filter((cs) => !customerSuccessAway.includes(cs.id));
  };

  const sortCustomerSucccessByScore = () => {
    return activeCustomersSuccess = sortObjBy(activeCustomersSuccess, 'score');
  };

  const addCustomerCountToCustomerSuccess = () => {
    return activeCustomersSuccess = activeCustomersSuccess.map((cs) => ({ ...cs, customerCount: 0}));
  };
  
  const matchCustomersToCustomerSuccess = () => {
    for(const customer of activeCustomers) {
      // if (treatNoBiggerCs(customer)) continue;
      matchCustomerSuccess(customer);
    }
  };

  const matchCustomerSuccess = (customer) => {
    for(const acs of activeCustomersSuccess) {
      if (acs.score < customer.score) continue;
      acs.customerCount += 1;
      break;
    }
  };

  const orderActiveCustomersSuccess = () => {
    orderedActiveCustomersSuccess = sortObjBy(activeCustomersSuccess, 'customerCount', false);
  };

  const ensureNoDups = () => {
    if(orderedActiveCustomersSuccess[0].customerCount === orderedActiveCustomersSuccess[1].customerCount) return true;
    return false;
  };

  const calculateReturn = () => {
    if (ensureNoDups()) return 0;
    if (orderedActiveCustomersSuccess[0].customerCount == 0) return 0;
    return orderedActiveCustomersSuccess[0].id;
  };

  return execute();
}

test("Scenario 1", () => {
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
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt){
  return Array.apply(0, Array(count)).map((it, index) => index + startAt)
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1))
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  // MARK: the 999 is deleted in the upper line, getting right value from the ruby version
  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});
