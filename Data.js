import { observable } from 'mobx';

class Data {
    @observable hello = "Hello1"

    changeName(){
      return this.hello = "Changed!";
    }
}

var data = new Data;

export default data;
