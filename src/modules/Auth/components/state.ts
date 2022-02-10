
export default class State {
    public payload: any
    /* public _state = {
        carsPage: 1,
        data: {},
        dispatch: {
          payload: '',
        }
      }; */

    get state() {
        return this.payload
    }

    set state(state) {
        this.payload = state
    }
   
  static dispatch: any;
}