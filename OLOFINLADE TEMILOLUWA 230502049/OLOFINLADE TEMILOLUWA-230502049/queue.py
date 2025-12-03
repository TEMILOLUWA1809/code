
# Node class
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


# LinkedList class
class LinkedList:
    def __init__(self):
        self.head = None

    # Insert at beginning
    def insert_at_beginning(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    # Insert at end
    def insert_at_end(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            return
        
        temp = self.head
        while temp.next:
            temp = temp.next
        temp.next = new_node

    # Delete a node by key (value)
    def delete_node(self, key):
        temp = self.head

        # If head needs to be deleted
        if temp and temp.data == key:
            self.head = temp.next
            temp = None
            return

        # Search for the node to delete
        prev = None
        while temp and temp.data != key:
            prev = temp
            temp = temp.next

        # If key is not found
        if temp is None:
            return

        # Unlink the node
        prev.next = temp.next
        temp = None

    # Display list elements
    def display_list(self):
        temp = self.head
        while temp:
            print(temp.data, end=" -> ")
            temp = temp.next
        print("None")

# Testing the Linked List
ll = LinkedList()

# Insert 5 values
ll.insert_at_end(20)
ll.insert_at_end(40)
ll.insert_at_end(60)
ll.insert_at_end(80)
ll.insert_at_end(100)


print("Linked List after insertion:")
ll.display_list()

# Delete one value
ll.delete_node(40)

print("Linked List after deleting 40:")
ll.display_list()

