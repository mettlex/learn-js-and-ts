type CreateLRUParams = {
  capacity: number; // number of max items LRU can hold
}

type LinkedList<T> = unknown // TODO

type LRU<DataType> = {
  capacity: number;
  size: number;
  data: LinkedList<DataType>;
  set: (key: string, value: DataType) => void;
  get: (key: string) => DataType | undefined;
}

export function createLRU<PassedDataType>({ capacity }: CreateLRUParams): LRU<PassedDataType> {
  const lookup = new Map<string, PassedDataType>();

  const lru: LRU<PassedDataType> = {
    size: 0,
    capacity,
    data: lookup, // TODO: make this linked list
    set(key: string, value: PassedDataType) {
      lookup.set(key, value)

      if (this.size + 1 > this.capacity) {
        // delete the least recently used
        // TODO: use Linked List
        const first = lookup.keys().next().value
        lookup.delete(first) // NAIVE: don't do this
      }

      this.size++;
    },
    get(key: string): PassedDataType | undefined {
      return lookup.get(key)
    }
  }

  return lru
}