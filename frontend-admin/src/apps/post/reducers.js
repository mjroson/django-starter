import { ENTITY_NAME } from './constants';
import { set, lensPath, pipe, add, append, lensProp, evolve, map, filter, not } from 'ramda';

const initialState = {
    count: 0,
    results: [],
    errors: {},
    loading: false,
    reqStatus: {}
};

export default function objects(state = initialState, action) {

    const reqStatusLens = lensPath(['reqStatus', action.reqName]);
    const setStatus = set(reqStatusLens);

    const errosLens = lensPath(['errors', action.reqName]);
    const setErrors = set(errosLens);
    const clearErrors = setErrors(null);

    const setResults = set(lensPath(['results']));
    const setCount = set(lensPath(['count']));

    const setStatusLoaded = setStatus('loaded');
    const setLoadingValue = setStatus('loading');
    const setLoading = pipe(setLoadingValue, clearErrors);

    const setLoadingFalse = set(lensProp('loading'), false)

    console.log(action.type);
    switch (action.type) {
        
        
        case `${ENTITY_NAME}/REQUESTING`:
            return setLoading(state)

        case `${ENTITY_NAME}/REQUEST-ERROR`:
            return pipe(setStatusLoaded, setErrors(action.errors))(state)

        case `${ENTITY_NAME}/LIST`:            
            const { results, count } = action.data;
            return pipe(
                setStatusLoaded,
                clearErrors,
                setResults(results),
                setCount(count)
            )(state)

        case `${ENTITY_NAME}/CREATE`:

            const appendResult = evolve({
                count: add(1),
                results: append(action.data)
            })

            return pipe(
                appendResult,
                setLoadingFalse,
                setStatusLoaded,
                clearErrors
            )(state)

        case `${ENTITY_NAME}/UPDATE`:
            const updateResults = evolve({
                results: map(
                    elem => elem.id === action.data.id ? action.data : elem
                )
            });

            return pipe(
                updateResults,
                setLoadingFalse,
                setStatusLoaded,
                clearErrors
            )(state);

        case `${ENTITY_NAME}/DESTROY`:
            const removeResult = evolve(
                {
                    count: add(-1),
                    results: filter(elem => elem.id !== action.data.id)
                })

            return pipe(
                removeResult,
                setLoadingFalse,
                setStatusLoaded,
                clearErrors
            )(state);

        case `${ENTITY_NAME}/LOADING`:
            return evolve({
                loading: not
            })

        default:
            return state;
    }
}
