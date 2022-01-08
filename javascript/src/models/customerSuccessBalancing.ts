/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 * ==== FLECHA ==> Having types is great, isn't it? :D
 */
const ensureRange = (len, min, max) => len > min && len < max;

export const customerSuccessBalancing = (
  customerSuccess: customerSuccess[],
  customers: customers[],
  customerSuccessAway: number[]
) => {
  const removeAwayCustomerSuccess = ():customerSuccess[] => (
    customerSuccess.filter((cs) => customerSuccessAway.includes(cs.id))
  );

  const activeCustomersSuccess:customerSuccess[] = removeAwayCustomerSuccess();
  const activeCustomers: customers[] = customers;

  const ensureNoCustomersSuccessWithSameScore = () => {
    const scoreArray:number[] = activeCustomersSuccess.map((acs) => acs.id);
    const scoreSet = new Set(scoreArray);
    if (scoreArray.length !== scoreSet.size) throw('No CSs with same score are allowed');
  };

  const ensureCustomersSuccessRange = () => {
    if(!ensureRange(activeCustomersSuccess.length, 0, 1000)) throw('Css array out of range');
  };

  const ensureClientsRange = () => {
    if(!ensureRange(activeCustomersSuccess.length, 0, 1000000)) throw('Client array out of range');
  };

  const ensureMaxAwayLimit = () => {
    if(customerSuccessAway.length > customerSuccess.length) throw('Limit of away CSs breached');
  };

  ensureNoCustomersSuccessWithSameScore();
  ensureCustomersSuccessRange();
  ensureClientsRange();
  ensureMaxAwayLimit();

  //* END OF PREMISES *//
};
