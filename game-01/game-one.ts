function findSubsetSum(M: number[], N: number) {
  const seen = new Map<number, number>();

  for (let i = 0; i < M.length; i++) {
    const num = M[i];
    const complement = N - num;

    if (seen.has(complement)) {
      return [num, seen.get(complement)!]
    }

    seen.set(num, i)
  }

  return []
}
