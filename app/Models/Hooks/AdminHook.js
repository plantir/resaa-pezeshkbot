'use strict';
const Hash = use('Hash');
const AdminHook = (exports = module.exports = {});
AdminHook.beforeSave = async modelInstance => {
  if (modelInstance.dirty.password) {
    modelInstance.password = await Hash.make(modelInstance.password);
  }
};
