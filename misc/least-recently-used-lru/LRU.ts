type CreateLRUParams<T> = {
  capacity: number; // number of max items LRU can hold
  findIndex: (item: T, sequence: T[]) => number
  filter: (item: T, sequence: T[]) => T[]
}

type LinkedList<T> = unknown // TODO

type LRU<DataType> = {
  capacity: number;
  size: number;
  // sequence: LinkedList<DataType>;
  sequence: DataType[];
  set: (key: string, value: DataType) => void;
  get: (key: string) => DataType | undefined;
}

export function createLRU<PassedDataType>({ capacity, findIndex, filter }: CreateLRUParams<PassedDataType>): LRU<PassedDataType> {
  const lookup = new Map<string, PassedDataType>();
  let sequence: PassedDataType[] = [];

  const prepend = (item: PassedDataType) => {
    const itemIndex = findIndex(item, sequence)

    if (itemIndex === sequence.length - 1) {
      return
    }

    // if you use array, you have to do extra work here
    sequence = filter(item, sequence)

    sequence.push(item)
  }

  const lru: LRU<PassedDataType> = {
    size: 0,
    capacity,
    sequence, // TODO: make this linked list
    set(key: string, value: PassedDataType) {
      lookup.set(key, value)
      sequence.push(value)

      if (this.size + 1 > this.capacity) {
        // delete the least recently used
        // TODO: use Linked List
        const first = lookup.keys().next().value
        lookup.delete(first) // NAIVE: don't do this

        sequence.shift()
      }

      this.size++;
    },
    get(key: string): PassedDataType | undefined {
      const foundValue = lookup.get(key)

      if (!foundValue) {
        return undefined
      }

      // move item at first in sequence
      prepend(foundValue)

      this.sequence = sequence

      return foundValue
    }
  }

  return lru
}