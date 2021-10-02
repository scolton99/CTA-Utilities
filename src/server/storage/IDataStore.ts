interface IDataStore {
  get:    (key: string)                  => Promise<string | null>,
  set:    (key: string, value: string)   => Promise<void>,
  expire: (key: string, seconds: number) => Promise<void>
}

export default IDataStore;
