import { Option } from "./option";

export type CRUDL<DataModel, Key, Collection extends Iterable<DataModel>> = {
  create(value: DataModel): DataModel;
  read(key: Key): Option<DataModel>;
  update(key: Key, value: DataModel): Option<DataModel>;
  delete(key: Key): boolean;
  list(): Collection;
};
