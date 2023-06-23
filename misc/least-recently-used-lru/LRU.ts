type CreateLRUParams<T> = {
  capacity: number; // number of max items LRU can hold
};

class LinkedList<T> {
  public head: Node<T> | null = null;
  public tail: Node<T> | null = null;

  constructor() {
    this.head = null;
    this.tail = this.head;
  }

  append(value: T) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }

      this.tail = newNode;
    }
  }

  prepend(value: T) {
    const newNode = new Node(value);

    newNode.next = this.head;
    this.head = newNode;

    if (this.tail === null) {
      this.tail = newNode;
    }
  }

  get(index: number) {
    let node = this.head;

    for (let i = 0; i < index; i++) {
      if (node) {
        node = node.next;
      }

      if (node === null) {
        return undefined;
      }
    }

    return node?.value ? node.value : undefined;
  }

  length() {
    let count = 0;
    let node = this.head;

    while (node !== null) {
      count++;
      node = node.next;
    }

    return count;
  }

  toString() {
    const nodes = [];
    let node = this.head;

    while (node !== null) {
      nodes.push(node.value);
      node = node.next;
    }

    return nodes.toString();
  }

  remove(value: T) {
    let currentNode = this.head;
    let previousNode: Node<T> | null = null;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        if (previousNode === null) {
          // remove the head node
          this.head = currentNode.next;
        } else {
          // remove the middle or tail node
          previousNode.next = currentNode.next;
        }

        // update the tail node if needed
        if (currentNode === this.tail) {
          this.tail = previousNode;
        }

        return;
      }

      previousNode = currentNode;
      currentNode = currentNode.next;
    }
  }
}

class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

type LRU<DataType> = {
  capacity: number;
  size: number;
  sequence: LinkedList<DataType>;
  set: (key: string, value: DataType) => void;
  get: (key: string) => DataType | undefined;
};

export function createLRU<PassedDataType>({
  capacity,
}: CreateLRUParams<PassedDataType>): LRU<PassedDataType> {
  const lookup = new Map<string, PassedDataType>();
  const sequence = new LinkedList<PassedDataType>();

  const append = (item: PassedDataType) => {
    sequence.remove(item);
    sequence.append(item);
  };

  const lru: LRU<PassedDataType> = {
    size: 0,
    capacity,
    sequence,
    set(key: string, value: PassedDataType) {
      lookup.set(key, value);
      sequence.append(value);

      if (this.size + 1 > this.capacity) {
        // delete the least recently used
        if (sequence.head) {
          sequence.head = sequence.head.next;

          lookup.delete(lookup.keys().next().value);
        }

        this.sequence = sequence;

        // console.log(JSON.stringify(sequence.head, null, 2))
      }

      this.size++;
    },
    get(key: string): PassedDataType | undefined {
      const foundValue = lookup.get(key);

      if (!foundValue) {
        return undefined;
      }

      // move item at first in sequence
      append(foundValue);

      this.sequence = sequence;

      return foundValue;
    },
  };

  return lru;
}
