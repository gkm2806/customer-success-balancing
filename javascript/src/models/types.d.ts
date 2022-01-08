interface obj {
  score: number,
  id: number,
}

interface customerSuccess extends obj {
  customerCount?: number,
}

type customer = obj