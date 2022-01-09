require 'minitest/autorun'
require 'timeout'
class CustomerSuccessBalancing
  def initialize(customer_success, customers, away_customer_success)
    @customerSuccess = customer_success
    @customers = customers
    @awayCustomerSuccess = away_customer_success
  end

  def execute
    @activeCustomers = @customers
    removeAwayCustomerSuccess
    sortCustomerSucccessByScore
    matchCustomersToCustomerSuccess
    orderActiveCustomersSuccess
    calculateReturn
  end

  private

  def removeAwayCustomerSuccess
    newArray = []

    @customerSuccess.each do |cs|
      if(!@awayCustomerSuccess.include?(cs[:id]))
        newArray.push({**cs, customerCount: 0})
      end
    end
  
    @activeCustomersSuccess = newArray
  end

  def sortCustomerSucccessByScore
    @activeCustomersSuccess.sort { |a, b| a[:score] <=> b[:score] } 
  end

  def addCustomerCountToCustomerSuccess
    @activeCustomersSuccess = @activeCustomersSuccess.map((cs) => ({ **cs, customerCount: 0}))
  end
  
  def matchCustomersToCustomerSuccess
    @activeCustomers.each do | customer |
      matchCustomerSuccess(customer)
    end
  end

  def matchCustomerSuccess(customer)
    @activeCustomersSuccess.each do | acs |
      next if (acs[:score] < customer[:score])
      acs[:customerCount] += 1
      break
    end
  end

  def orderActiveCustomersSuccess
    @orderedActiveCustomersSuccess = @activeCustomersSuccess.sort { |a, b| b[:customerCount] <=> a[:customerCount] } 
  end

  def ensureNoDups
    return true if(!@orderedActiveCustomersSuccess[1].nil? && @orderedActiveCustomersSuccess[0][:customerCount] === @orderedActiveCustomersSuccess[1][:customerCount])
    false
  end

  def calculateReturn
    return 0 if (ensureNoDups())
    return 0 if (@orderedActiveCustomersSuccess[0][:customerCount] == 0)
    return @orderedActiveCustomersSuccess[0][:id]
  end

  def treatNoBiggerCs
    lastAcs = @activeCustomersSuccess[@activeCustomersSuccess.length-1]
    if(customer.score > lastAcs.score)
      lastAcs.customerCount += 1
      return true
    end
  end
end

class CustomerSuccessBalancingTests < Minitest::Test
  def test_scenario_one
    css = [{ id: 1, score: 60 }, { id: 2, score: 20 }, { id: 3, score: 95 }, { id: 4, score: 75 }]
    customers = [{ id: 1, score: 90 }, { id: 2, score: 20 }, { id: 3, score: 70 }, { id: 4, score: 40 }, { id: 5, score: 60 }, { id: 6, score: 10}]

    balancer = CustomerSuccessBalancing.new(css, customers, [2, 4])
    assert_equal 1, balancer.execute
  end

  def test_scenario_two
    css = array_to_map([11, 21, 31, 3, 4, 5])
    customers = array_to_map( [10, 10, 10, 20, 20, 30, 30, 30, 20, 60])
    balancer = CustomerSuccessBalancing.new(css, customers, [])
    assert_equal 0, balancer.execute
  end

  def test_scenario_three
    customer_success = (1..999).to_a
    customers = Array.new(10000, 998)

    balancer = CustomerSuccessBalancing.new(array_to_map(customer_success), array_to_map(customers), [999])

    result = Timeout.timeout(1.0) { balancer.execute }
    assert_equal 998, result
  end

  def test_scenario_four
    balancer = CustomerSuccessBalancing.new(array_to_map([1, 2, 3, 4, 5, 6]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [])
    assert_equal 0, balancer.execute
  end

  def test_scenario_five
    balancer = CustomerSuccessBalancing.new(array_to_map([100, 2, 3, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [])
    assert_equal 1, balancer.execute
  end

  def test_scenario_six
    balancer = CustomerSuccessBalancing.new(array_to_map([100, 99, 88, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [1, 3, 2])
    assert_equal 0, balancer.execute
  end

  def test_scenario_seven
    balancer = CustomerSuccessBalancing.new(array_to_map([100, 99, 88, 3, 4, 5]), array_to_map([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]), [4, 5, 6])
    assert_equal 3, balancer.execute
  end

  def array_to_map(arr)
    out = []
    arr.each_with_index { |score, index| out.push({ id: index + 1, score: score }) }
    out
  end
end

Minitest.run