class ArrayStack:
    def __init__(self):
        self.stack = []   # using Python list as the underlying array
    
    def push(self, item):
        self.stack.append(item)
    
    def pop(self):
        if self.is_empty():
            return None
        return self.stack.pop()
    
    def peek(self):
        if self.is_empty():
            return None
        return self.stack[-1]
    
    def is_empty(self):
        return len(self.stack) == 0
    
    def size(self):
        return len(self.stack)
    
    def display(self):
        print("Stack (top → bottom):", list(reversed(self.stack)))


# Sample
s = ArrayStack()
s.push(10)
s.push(20)
print(s.pop())   # -> 20
print(s.peek())  # -> 10