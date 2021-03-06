Astro.createValidator({
  name: 'choice',
  aliases: ['oneOf', 'oneof'],
  validate: function(fieldName, value, choices) {
    return _.contains(choices, value);
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.field;
      var choices = e.data.options;

      e.data.message = 'The "' + fieldName +
        '" field\'s value has to be one of "' + choices.join('", "') +
        '"';
    }
  }
});
