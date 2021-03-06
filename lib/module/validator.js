Astro.createValidator = function(validatorDefinition) {
  // Check if the validator definition is an object.
  if (!_.isObject(validatorDefinition)) {
    throw new Error('Provide a validator definition');
  }

  // Check if the validator name is provided.
  if (!_.has(validatorDefinition, 'name')) {
    throw new Error('Provide a validator name');
  }

  // Check if the validator name is a string.
  if (!_.isString(validatorDefinition.name)) {
    throw new Error('The validator name has to be a string');
  }

  // Check if the validator with the given name already exists.
  if (_.has(Validators, validatorDefinition.name)) {
    throw new Error('Validator with the name `' + validatorDefinition.name +
      '` is already defined');
  }

  // Check if the validation function is provided.
  if (!_.has(validatorDefinition, 'validate')) {
    throw new Error('Provide the `validate` function');
  }

  // Check if the `validate` attribute is function.
  if (!_.isFunction(validatorDefinition.validate)) {
    throw new Error('The `validate` attribute has to be a function');
  }

  // Validator definition is just a description of validator. For each validator
  // we have to create function that makes use of it.
  Validators[validatorDefinition.name] = function(options, userMessage) {
    // When using validator in schema, developer will pass some options to
    // validator. We collect here these options and return function that have
    // access to them. Developer can also pass custom message (second argument)
    // which will be thrown instead of one defined in the validator definition.

    return function(fieldName, fieldValue) {
      var self = this;
      // This function is executed when validation actually takes place.

      // We build array of params in order: fieldValue, options, fieldName.
      // Such array of params will be passed to the `validate` and `message`
      // methods provided in the validator definition.
      var args = [fieldName, fieldValue, options];

      // Run validation on given field.
      if (!validatorDefinition.validate.apply(self, args)) {
        // Prepare the event data.
        var event = new Astro.Event('validationerror', {
          validator: validatorDefinition,
          value: fieldValue,
          field: fieldName,
          options: options,
          message: null,
        });
        event.target = self;

        // Prepare variable for storing the final error message.
        var errorMessage;

        if (_.isString(userMessage)) {

          // If a user defined the validation error message and it's a string
          // then just use it as the error message.
          errorMessage = userMessage;

        } else if (_.isFunction(userMessage)) {

          // If a user defined validation error is a function then run it in the
          // context of the document being validated and with validation data as
          // a parameter.
          errorMessage = userMessage.call(self, event);

        } else {

          // If user haven't defined any custom validation message then check
          // whether there are any "validationerror" events that could generate
          // error message.
          self.constructor.emitEvent(event);
          errorMessage = event.data.message;

          // If none of the "validateerror" event handlers returned proper error
          // message then we have to take a default error message from the
          // validator.
          if (!_.isString(errorMessage)) {
            // We have here three options. The default validator error message
            // can be just a string, a function generating error or there can be
            // no validation error for given validator.
            if (
              _.has(validatorDefinition, 'events') &&
              _.has(validatorDefinition.events, 'validationerror')
            ) {
              var onError = validatorDefinition.events.validationerror;
              if (_.isString(onError)) {
                errorMessage = onError;
              } else if (
                _.isFunction(onError)
              ) {
                onError.call(self, event);
                errorMessage = event.data.message;
              }
            }
          }

          // Generate default error message.
          if (!_.isString(errorMessage)) {
            errorMessage = 'The "' + fieldName + '" is invalid';
          }
        }

        // Right now, we can be sure that the error message was generated so
        // just throw it.
        throw new ValidationError(errorMessage);
      }

      // If there was no validation error then return "true".
      return true;
    };
  };

  // Add aliases.
  if (_.isArray(validatorDefinition.aliases)) {
    _.each(validatorDefinition.aliases, function(alias) {
      Validators[alias] = Validators[validatorDefinition.name];
    });
  }

  // We also return created validator if someone would like not to use long
  // default namespace which is e.g. `Validators.isString`.
  return Validators[validatorDefinition.name];
};
