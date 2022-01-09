/* eslint-disable @typescript-eslint/ban-ts-comment */

const sortObjBy = (array:any[], param:string, asc = true) => {
  return asc ? array.sort((a,b) => a[param] - b[param]) : array.sort((a,b) => b[param] - a[param]);
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
    this.activeCustomers = this.customers;
    this.removeAwayCustomerSuccess();
    this.sortCustomerSucccessByScore();
    this.addCustomerCountToCustomerSuccess();
    this.matchCustomersToCustomerSuccess();
    this.orderActiveCustomersSuccess();

    return this.calculateReturn();
  }

  removeAwayCustomerSuccess = ():customerSuccess[] => {
    return this.activeCustomersSuccess = this.customerSuccess.filter((cs) => !this.customerSuccessAway.includes(cs.id));
  };

  sortCustomerSucccessByScore = ():customerSuccess[] => {
    return this.activeCustomersSuccess = sortObjBy(this.activeCustomersSuccess, 'score');
  };

  addCustomerCountToCustomerSuccess = ():customerSuccess[] => {
    return this.activeCustomersSuccess = this.activeCustomersSuccess.map((cs) => ({ ...cs, customerCount: 0}));
  };
  
  matchCustomersToCustomerSuccess = ():void => {
    for(const customer of this.activeCustomers) {
      // if (this.treatNoBiggerCs(customer)) continue;
      this.matchCustomerSuccess(customer);
    }
  };

  matchCustomerSuccess = (customer):void => {
    for(const acs of this.activeCustomersSuccess) {
      if (acs.score < customer.score) continue;
      acs.customerCount! += 1;
      break;
    }
  };

  orderActiveCustomersSuccess = ():void => {
    this.orderedActiveCustomersSuccess = sortObjBy(this.activeCustomersSuccess, 'customerCount', false);
  };

  ensureNoDups = ():boolean => {
    if(this.orderedActiveCustomersSuccess[0].customerCount === this.orderedActiveCustomersSuccess[1].customerCount) return true;
    return false;
  };

  calculateReturn = ():number => {
    if (this.ensureNoDups()) return 0;
    if (this.orderedActiveCustomersSuccess[0].customerCount == 0) return 0;
    return this.orderedActiveCustomersSuccess[0].id;
  };

  //Not used
  treatNoBiggerCs = (customer) => {
    const lastAcs = this.activeCustomersSuccess[this.activeCustomersSuccess.length-1];
    if(customer.score > lastAcs.score) {
      lastAcs.customerCount! += 1;
      return true;
    }
  };
}
