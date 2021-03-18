import { CHANGE_SCREEN } from '../actions';

const handlers = {
  [CHANGE_SCREEN]: (state, payload) => payload,
  DEFAULT: state => state,
};

export default function screenReducer(state, action) {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
}
