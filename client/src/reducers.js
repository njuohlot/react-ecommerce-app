const reducers = (state, action) =>{
    switch(action.type){
        case "FETCH_REQUEST":
            return {
                //returns what state it was originaly
                ...state, loading: true
              
               
            };
            case "FETCH_SUCCESS":
                return {
                    ...state,
                    products: action.payload, loading: false
                };
                case "FETCH_FAIL":
            return {
                //returns what state it was originaly
                ...state,
               
                loading: false, error: action.payload
            };
            

                default:
                    return state;
    }
}

export default reducers