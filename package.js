Package.describe({
  name: 'jagi:astronomy-validators',
  version: '0.9.0',
  summary: 'Validators for Meteor Astronomy',
  git: 'https://github.com/jagi/meteor-astronomy-validators.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('jagi:astronomy@0.9.1');
  api.use('jagi:reactive-map@0.1.0');
  api.use('underscore');
  api.use('ui');

  api.imply('jagi:astronomy');

  // Module.
  api.addFiles('lib/module/global.js', ['client', 'server']);
  api.addFiles('lib/module/utils.js', ['client', 'server']);
  api.addFiles('lib/module/error.js', ['client', 'server']);
  api.addFiles('lib/module/validator.js', ['client', 'server']);
  api.addFiles('lib/module/init_module.js', ['client', 'server']);
  api.addFiles('lib/module/init_class.js', ['client', 'server']);
  api.addFiles('lib/module/init_instance.js', ['client', 'server']);
  api.addFiles('lib/module/module.js', ['client', 'server']);

  // Validators.
  api.addFiles('lib/validators/and.js', ['client', 'server']);
  api.addFiles('lib/validators/or.js', ['client', 'server']);

  api.addFiles('lib/validators/is_string.js', ['client', 'server']);
  api.addFiles('lib/validators/is_number.js', ['client', 'server']);
  api.addFiles('lib/validators/is_array.js', ['client', 'server']);
  api.addFiles('lib/validators/is_object.js', ['client', 'server']);
  api.addFiles('lib/validators/is_date.js', ['client', 'server']);
  api.addFiles('lib/validators/is_null.js', ['client', 'server']);
  api.addFiles('lib/validators/is_not_null.js', ['client', 'server']);
  api.addFiles('lib/validators/is_email.js', ['client', 'server']);

  api.addFiles('lib/validators/min_length.js', ['client', 'server']);
  api.addFiles('lib/validators/max_length.js', ['client', 'server']);
  api.addFiles('lib/validators/greater_than.js', ['client', 'server']);
  api.addFiles('lib/validators/greater_than_or_equal.js', ['client', 'server']);
  api.addFiles('lib/validators/less_than.js', ['client', 'server']);
  api.addFiles('lib/validators/less_than_or_equal.js', ['client', 'server']);
  api.addFiles('lib/validators/has_property.js', ['client', 'server']);

  api.addFiles('lib/validators/equal.js', ['client', 'server']);
  api.addFiles('lib/validators/equal_to.js', ['client', 'server']);
  api.addFiles('lib/validators/regexp.js', ['client', 'server']);
  api.addFiles('lib/validators/choice.js', ['client', 'server']);
  api.addFiles('lib/validators/unique.js', ['client', 'server']);

  api.export(['Validators'], ['client', 'server']);
});
