export default (state, meta, rest = {}) => ({
  error    : (meta.touched && state.error) || rest.error,
  success  : (meta.touched && state.success) || rest.success,
  warning  : (meta.touched && state.warning) || rest.warning,
  messages : (state.hasMessages && meta.touched ? [state.message] : null)
    || (Array.isArray(rest.messages) ? rest.messages : null),
  disabled: state.isSubmitting || rest.disabled
});
