/* eslint-disable @typescript-eslint/ban-ts-comment */

export const customerSuccessBalancing = (
  customerSuccess: customerSuccess[],
  customers: customer[],
  customerSuccessAway: number[]
):number => {
  const removeAwayCustomerSuccess = ():customerSuccess[] => (
    customerSuccess
      .filter((cs) => !customerSuccessAway.includes(cs.id))
      .sort((a,b) => a.score - b.score)
      .map((cs) => ({ ...cs, customerCount: 0}))
  );
  const activeCustomersSuccess:customerSuccess[] = removeAwayCustomerSuccess();
  const activeCustomers: customer[] = customers;
  
  const matchCustomersToCustomerSuccess = () => {
    for(const customer of activeCustomers) {
      // treatNoBiggerCs();
      matchCustomerSuccess(customer);
    }
  };

  const matchCustomerSuccess = (customer) => {
    for(const acs of activeCustomersSuccess) {
      if (acs.score < customer.score) continue;
      acs.customerCount! += 1;
      break;
    }
  };

  const treatNoBiggerCs = () => {
    // const lastAcs = activeCustomersSuccess[activeCustomersSuccess.length-1];
    // if(customer.score > lastAcs.score) {
    //   lastAcs.customerCount! += 1;
    //   continue;
    // }
  };
    
  const orderActiveCustomersSuccess = () => 
    activeCustomersSuccess.sort((a,b) => b.customerCount! - a.customerCount!);

  matchCustomersToCustomerSuccess();
  const orderedActiveCustomersSuccess = orderActiveCustomersSuccess();
  // if(activeCustomersSuccess[0].customerCount === activeCustomersSuccess[1].customerCount) return 0;
  const acssSet = new Set(orderedActiveCustomersSuccess);
  if(acssSet.size !== orderedActiveCustomersSuccess.length) return 0;
  if (orderedActiveCustomersSuccess[0].customerCount == 0) return 0;
  return orderedActiveCustomersSuccess[0].id;
};



export class CustomerSuccessBalancing {
  private activeCustomers: customer[];
  private activeCustomersSuccess:customerSuccess[];
  private orderedActiveCustomersSuccess: customerSuccess[];

  constructor(
    private customerSuccess: customerSuccess[],
    private customers: customer[],
    private customerSuccessAway: number[]
  ) {}

  public execute (){
    this.activeCustomersSuccess = this.removeAwayCustomerSuccess();
    this.activeCustomers = this.customers;

    this.matchCustomersToCustomerSuccess();
    this.orderActiveCustomersSuccess();
    // if(activeCustomersSuccess[0].customerCount === activeCustomersSuccess[1].customerCount) return 0;
    const acssSet = new Set(this.orderedActiveCustomersSuccess);
    if(acssSet.size !== this.orderedActiveCustomersSuccess.length) return 0;
    if (this.orderedActiveCustomersSuccess[0].customerCount == 0) return 0;
    return this.orderedActiveCustomersSuccess[0].id;
  }

  removeAwayCustomerSuccess = ():customerSuccess[] => (
    this.customerSuccess
      .filter((cs) => !this.customerSuccessAway.includes(cs.id))
      .sort((a,b) => a.score - b.score)
      .map((cs) => ({ ...cs, customerCount: 0}))
  );
  
  matchCustomersToCustomerSuccess = () => {
    for(const customer of this.activeCustomers) {
      // treatNoBiggerCs();
      this.matchCustomerSuccess(customer);
    }
  };

  matchCustomerSuccess = (customer) => {
    for(const acs of this.activeCustomersSuccess) {
      if (acs.score < customer.score) continue;
      acs.customerCount! += 1;
      break;
    }
  };

  treatNoBiggerCs = () => {
    // const lastAcs = activeCustomersSuccess[activeCustomersSuccess.length-1];
    // if(customer.score > lastAcs.score) {
    //   lastAcs.customerCount! += 1;
    //   continue;
    // }
  };
    
  orderActiveCustomersSuccess = () => 
    this.activeCustomersSuccess.sort((a,b) => b.customerCount! - a.customerCount!);
}
