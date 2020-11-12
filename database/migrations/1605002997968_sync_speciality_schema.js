'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
let new_specialties = [
  {
    id: 1,
    title: 'بیهوشی',
  },
  {
    id: 22,
    title: 'پزشکی هسته‌ای',
  },
  {
    id: 24,
    title: 'طب کار',
  },
  {
    id: 31,
    title: 'آسیب‌شناسی (پاتولوژی)',
  },
  {
    id: 36,
    title: 'رادیولوژی',
  },
  {
    id: 38,
    title: 'طب ورزش',
  },
  {
    id: 52,
    title: 'ارتز و پروتز',
  },
  {
    id: 53,
    title: 'ژنتیک پزشکی',
  },
  {
    id: 54,
    title: 'طب سنتی',
  },
  {
    id: 60,
    title: 'فیزیوتراپیست',
  },
  {
    id: 62,
    title: 'بینایی سنجی',
  },
  {
    id: 63,
    title: 'پزشکی اجتماعی',
  },
  {
    id: 65,
    title: 'پرتو درمانی',
  },
];
class SyncSpecialitySchema extends Schema {
  async up() {
    await Database.from('specialities').insert(new_specialties);
  }

  async down() {
    await Database.from('specialities')
      .whereIn(
        'id',
        new_specialties.map((item) => item.id)
      )
      .delete();
  }
}

module.exports = SyncSpecialitySchema;
