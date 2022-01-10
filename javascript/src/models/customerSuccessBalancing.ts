const sortObjBy = (array:any[], param:string, asc = true) => {
  return asc ? array.sort((a,b) => a[param] - b[param]) : array.sort((a,b) => b[param] - a[param]);
};

export class CustomerSuccessBalancing {
  private activeCustomers: customer[];
  private activeCustomersSuccess:customerSuccess[];
  private customerSuccessMatchArray: number[];
  private maxIndices: number[];
  constructor(
    private customerSuccess: customerSuccess[],
    private customers: customer[],
    private customerSuccessAway: number[]
  ) {}

  public execute (){
    this.activeCustomers = this.customers;
    this.removeAwayCustomerSuccess();
    this.sortCustomerSucccessByScore();
    this.createIndexedArray();
    this.matchCustomersToCustomerSuccess();
    this.getMaxScore();

    return this.calculateReturn();
  }

  removeAwayCustomerSuccess = ():customerSuccess[] => {
    return this.activeCustomersSuccess = this.customerSuccess.filter((cs) => !this.customerSuccessAway.includes(cs.id));
  };

  sortCustomerSucccessByScore = ():customerSuccess[] => {
    return this.activeCustomersSuccess = sortObjBy(this.activeCustomersSuccess, 'score');
  };

  createIndexedArray = ():number[] => {
    return this.customerSuccessMatchArray = new Array(this.activeCustomersSuccess.length);
  };

  addCustomerCountToCustomerSuccess = ():customerSuccess[] => {
    return this.activeCustomersSuccess = this.activeCustomersSuccess.map((cs) => ({ ...cs, customerCount: 0}));
  };
  
  matchCustomersToCustomerSuccess = ():void => {
    for(const customer of this.activeCustomers) {
      this.matchCustomerSuccess(customer);
    }
  };

  matchCustomerSuccess = (customer:obj):void => {
    let index = -1;
    for(const acs of this.activeCustomersSuccess) {
      index++;
      if (acs.score < customer.score) continue;
      this.addMatch(index);
      break;
    }
  };

  addMatch = (index:number) => {
    this.customerSuccessMatchArray[index] ? this.customerSuccessMatchArray[index]++ : this.customerSuccessMatchArray[index] = 1;
  };

  getMaxScore = ():number[] => {
    let max = -Infinity;
    let maxIndices:number[] = [];
    for (let i = 0; i < this.customerSuccessMatchArray.length; i++) {
      if (this.customerSuccessMatchArray[i] === max) {
        maxIndices.push(i);
      } else if (this.customerSuccessMatchArray[i] > max) {
        maxIndices = [i];
        max = this.customerSuccessMatchArray[i];
      }
    }
    return this.maxIndices = maxIndices;
  };

  ensureNoDups = ():boolean => {
    if(this.maxIndices.length > 1) return true;
    return false;
  };

  calculateReturn = ():number => {
    const bestCSIndex = this.maxIndices[0];
    if (this.ensureNoDups()) return 0;
    if(bestCSIndex  == null) return 0;
    if (this.customerSuccessMatchArray[bestCSIndex] == 0) return 0;
    return this.activeCustomersSuccess[bestCSIndex].id;
  };
}
