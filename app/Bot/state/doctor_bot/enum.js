const state = {
  start: 0,
  '0': 'start',
  specialities: 1,
  '1': 'specialities',
  ask_question: 4,
  '4': 'ask_question',
  doctor_detail: 5,
  '5': 'doctor_detail',
  test_answer: 6,
  '6': 'test_answer',
  call_doctor: 7,
  '7': 'call_doctor'
};
const regex_state = {
  register_doctor: /ثبت نام پزشک/,
  start: /^شروع$|بازگشت به خانه/,
  refer: /دعوت از دوست/,
  specialities: /سوال پزشکی دارم/,
  call_doctor: /تماس با دکتر *.*/,
  charge: /شارژ اعتبار رسا/,
  test_charge: /تست شارژ/,
  my_doctor: /پرسش از پزشک خودم/,
  payment_check: /بررسی وضعیت پرداخت/,
  test_answer: /ارسال جواب آزمایش/,
  finish_file_upload: /اتمام|تلاش مجدد/,
  reset_file_upload: /حذف تمامی فایل ها و ارسال مجدد/,
  register: /[98][9][0-3|9][0-9]{8,8}$/,
  no_answer_quistion: /مشاهده سوال پاسخ داده نشده/
};
module.exports = {
  state,
  regex_state
};
