'use strict';

const DoctorHook = (exports = module.exports = {});
/** @type {typeof import('@adonisjs/redis/src/Redis')} */
const Speciality = use('App/Models/Speciality');
DoctorHook.afterCreate = async (modelInstance) => {
  try {
    await Speciality.reCache();
  } catch (error) {}
};
