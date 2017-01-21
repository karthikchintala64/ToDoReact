import { List, Map } from 'immutable';

export default {
    todos: List.of(
        Map.of(
            { 
                name: 'Test item', 
                completed: false 
            }
        )
    )
}

