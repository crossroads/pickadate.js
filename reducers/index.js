const STATE  = require('constants/state')
const jsUtil = require('utils/js')



/**
 * A mapping of reducers to the state key they reduce upon,
 * mapping to reducers by action type.
 * @private
 * @type {Object<Object(Function)>}
 */
const KEY_TYPE_REDUCERS = STATE.KEYS.reduce(
  (KEY_TYPE_REDUCERS, key) => {
    try {
      const fileName = jsUtil.caseDash(key)
      KEY_TYPE_REDUCERS[key] = require(`reducers/${fileName}`)
    }
    catch (err) {
      /* istanbul ignore next: used as a debugging aid */
      throw new Error(`Unable to find reducers for the state key "${key}"`)
    }
    return KEY_TYPE_REDUCERS
  },
  {}
)



/**
 * Reduces a state by an action.
 * @param  {Object} state
 * @param  {Object} action
 *         {ACTION.TYPE} action.type
 *         {Object} [action.payload]
 * @return {Object}
 */
function reduce(state, { type, payload }) {

  // Start off with the state not being changed
  let hasChanged = false

  // Create the next state using the current state
  const nextState = { ...state }

  // Go through all the state keys
  STATE.KEYS.forEach(key => {

    // Grab the reducer for the state key and action type
    const reducer = KEY_TYPE_REDUCERS[key][type]

    // If there's no reducer, do nothing
    if (!reducer) {
      return
    }

    // Grab the previous state for the key and default `null` values
    // to `undefined` so default params can kick in
    const previousStateForKey = state[key] == null ? undefined : state[key]

    // Reduce the state with the action payload to get the next state
    const nextStateForKey = reducer(previousStateForKey, payload)

    // Update the key in the next state
    nextState[key] = nextStateForKey

    // If the state changed once or has now changed, mark it as such
    hasChanged = hasChanged || nextStateForKey !== previousStateForKey

  })

  // If the state hasn't changed, return the original state
  return hasChanged ? nextState : state

}



module.exports = {
  reduce,
}