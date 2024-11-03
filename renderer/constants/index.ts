export const TypeOfDefinition = [
  {
    key: "ID card",
    name: "رقم التعريف",
  },
  {
    key: "Passport",
    name: "رقم جواز السفر",
  },
];

export const blood = ["+O", "-O", "+A", "-A", "+B", "-B", "+AB", "-AB"];

type InfoCard = {
  key: string;
  title: string;
  description: string;
};

export const InfoCards: InfoCard[] = [
  {
    key: "computer",
    title: "دورات الحاسبة الألي",
    description: "تهدف هذه الدورات إلى زيادة فهمك لمهارات التكنولوجيا.",
  },
  {
    key: "firstAid",
    title: "دورات الاسعافات الأولية",
    description: "تعلم المهارات الأساسية لإنقاذ الأرواح والمساعدة.",
  },
  {
    key: "military",
    title: "دورات العسكرية",
    description: "تطوير التكتيكات والانضباط والعمل الجماعي للدفاع.",
  },
];
