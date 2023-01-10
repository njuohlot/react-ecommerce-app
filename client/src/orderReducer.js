const orderReducer = (state, action) =>{
    switch(action.type){
        case "CREATE_REQUEST":
            return {
                //returns what state it was originaly
                ...state, loading: true
              
               
            };
            case "CREATE_SUCCESS":
                return {
                    ...state,
                    products: action.payload, loading: false
                };
                case "CREATE_FAIL":
            return {
                //returns what state it was originaly
                ...state,
               
                loading: false, error: action.payload
            };

                default:
                    return state;
    }
}

export default orderReducer