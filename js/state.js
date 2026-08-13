/* ══════════════════════════════════════════════════════════
   بيان — state.js
   الحالة المشتركة بين الوحدات.

   ⚠️ قاعدة: عدّل خصائص S ولا تُعِد إسنادها (S = {...} ممنوع)،
      لأن الوحدات تستورد المرجع نفسه.
      لهذا صار GATE السابق حقلاً: S.gate
   ══════════════════════════════════════════════════════════ */

export const S = {
  /* البوابة */
  gate: "login",              // login · register · teacher

  /* الهوية */
  user: null,
  prof: null,
  roleInfo: null,

  /* التصفّح */
  subjects: [],
  subj: null,
  lessons: [],
  lesson: null,
  scales: [],

  /* الاختبار الجاري */
  quiz: null,
  passages: {},
  itemId: null,
  i: 0,
  ans: [],
  t0: 0,
  qenter: 0,
  left: 0,
  tick: null,
  result: null
};
