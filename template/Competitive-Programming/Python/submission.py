import sys
import math
from collections import defaultdict, deque


input = sys.stdin.read
output = sys.stdout.write


#greatest common divisor
def gcd(a, b):
    return math.gcd(a, b)


#sort (quick)
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)


#lowest common multiple
def lcm(a, b):
    return a * b // gcd(a, b)


#Prime through Sieve of Erastothenes
def sieve_of_eratosthenes(n):
    primes = [True] * (n + 1)
    p = 2
    while p * p <= n:
        if primes[p]:
            for i in range(p * p, n + 1, p):
                primes[i] = False
        p += 1
    return [p for p in range(2, n + 1) if primes[p]]



def main():
    data = input().splitlines()
    for line in data:
        pass


def solve():
    data = input().splitlines()
    t = int(data[0])
    results = []
    for i in range(1, t+1):
        result = f"Case #{i}: {solve_case(data[i])}\n"
        results.append(result)
    output("".join(results))

#BFS
def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
            

#DFS
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    

def solve_case(case):
    # CODE YOUR LOGIC FOR THE QUESTION HERE
    pass

if __name__ == "__main__":
    main()
