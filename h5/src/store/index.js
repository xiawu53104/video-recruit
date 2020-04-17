import { action, observable } from 'mobx';

class Store {
  @observable name= "qiphon";
  @action doSomething(val){
    this.name = val;
  }
}

export default new Store();
