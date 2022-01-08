/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 * ==== FLECHA ==> Having types is great, isn't it? :D
 */

export const customerSuccessBalancing = (
  customerSuccess: customerSuccess[],
  customers: customers[],
  customerSuccessAway: number[]
):number => {
  const removeAwayCustomerSuccess = ():customerSuccess[] => (
    customerSuccess
      .filter((cs) => !customerSuccessAway.includes(cs.id))
      .sort((a,b) => a.score - b.score)
      .map((cs) => ({ ...cs, customerCount: 0}))
  );

  const activeCustomersSuccess:customerSuccess[] = removeAwayCustomerSuccess();
  const activeCustomers: customers[] = customers;

  console.log('Esse são os ids válidos', activeCustomersSuccess.map((acs) => acs.id));
  return 0;
};
