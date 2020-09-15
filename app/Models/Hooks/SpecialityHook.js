'use strict';

const SpecialityHook = (exports = module.exports = {});
const Speciality = use('App/Models/Speciality');
SpecialityHook.afterSave = async (modelInstance) => {
  try {
    await Speciality.reCache();
  } catch (error) {}
};
