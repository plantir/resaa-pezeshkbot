'use strict';

const DoctorHook = (exports = module.exports = {});
const Speciality = use('App/Models/Speciality');
DoctorHook.afterSave = async (modelInstance) => {
  try {
    await Speciality.reCache();
  } catch (error) {
    console.log(error);
  }
};
