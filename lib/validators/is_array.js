Astro.createValidator({
  name: 'isArray',
  aliases: ['isarray', 'array'],
  validate: function(fieldName, value) {
    return _.isArray(value);
  },
  events: {
    validationerror: function(e) {
      var fieldName = e.data.field;

      e.data.message = 'The "' + fieldName +
        '" field\'s value has to be an array';
    }
  }
});
