import sys
import math

input = input("INPUT: ")
count = 0

hash_init = hash(input)
print("hash init: ", hash_init)

container = hash_init

def hash_finder(container, mod = 2):
    #print("CONTAINER = ", container)
    #print("MOD = ", mod)

    mod_input = container % mod
    #print("MOD_INPUT = ", mod_input)

    if mod_input == 0:
        container = container / mod
        mod = 2
    else:
        mod = mod + 1

    if abs(container) >= math.sqrt(abs(hash_init)):
        if is_prime(abs(container)):
            print("FINAL: ", mod, container)
        else:
            return hash_finder(container, mod)
    else:
        print("FINAL: ", mod, container)

def is_prime(n):
  if n == 2 or n == 3: 
    return True
  if n < 2 or n%2 == 0: 
    return False
  if n < 9: 
    return True
  if n%3 == 0: 
    return False
  r = int(n**0.5)
  # since all primes > 3 are of the form 6n ± 1
  # start with f=5 (which is prime)
  # and test f, f+2 for being prime
  # then loop by 6. 
  f = 5
  while f <= r:
    if n % f == 0: 
        return False
    if n % (f+2) == 0: 
        return False
    f += 6
  return True  

hash_finder(hash_init)