/** Models an event with a generic sender and generic arguments */
export interface IEvent<TSender, TArgs> {

    subscribe(fn: (sender: TSender, args: TArgs) => void): void;

    unsubscribe(fn: (sender: TSender, args: TArgs) => void): void;
}