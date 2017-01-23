 import { List, Map } from 'immutable';

 import { ISTATE, ITODO } from '../interfaces';


 const TODO: ITODO =null;

export default (): ISTATE => {
    return { todos:List<ITODO>()}
}

