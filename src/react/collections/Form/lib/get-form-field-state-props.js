export default (state, meta) => ({
  error    : meta.touched && state.error,
  success  : meta.touched && state.success,
  warning  : meta.touched && state.warning,
  messages : state.hasMessages && meta.touched ? [state.message] : null,
  disabled : state.isSubmitting
});
