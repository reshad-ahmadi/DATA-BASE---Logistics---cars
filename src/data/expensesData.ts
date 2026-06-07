export const expensesData = [
  { id: "EXP-001", category: "Customs Fee", categoryDA: "هزینه گمرک", container: "CONT-84729", amount: 450, date: "2023-10-24", paidTo: "Islam Qala Customs" },
  { id: "EXP-002", category: "Commission Fee", categoryDA: "هزینه کمیشن", container: "CONT-84729", amount: 120, date: "2023-10-24", paidTo: "Agent - Wahid" },
  { id: "EXP-003", category: "Unloading Fee", categoryDA: "هزینه تخلیه", container: "CONT-92831", amount: 200, date: "2023-10-23", paidTo: "Hairatan Port" },
  { id: "EXP-004", category: "Border Fee", categoryDA: "هزینه مرز", container: "CONT-92831", amount: 350, date: "2023-10-23", paidTo: "Hairatan Border" },
  { id: "EXP-005", category: "License Fee", categoryDA: "هزینه جواز", container: "CONT-11029", amount: 180, date: "2023-10-21", paidTo: "Nimroz Office" },
  { id: "EXP-006", category: "Truck Fare", categoryDA: "کرایه موتر", container: "CONT-44820", amount: 800, date: "2023-10-20", paidTo: "Driver - Hamid" },
  { id: "EXP-007", category: "Crane Fee", categoryDA: "هزینه جر", container: "CONT-77192", amount: 150, date: "2023-10-19", paidTo: "Islam Qala Crane" },
  { id: "EXP-008", category: "Forklift", categoryDA: "لیفتراک", container: "CONT-33847", amount: 100, date: "2023-10-18", paidTo: "Rozanak Depot" },
];

export const expenseCategoryColors: Record<string, string> = {
  "Customs Fee": "bg-red-100 text-red-700",
  "Commission Fee": "bg-amber-100 text-amber-700",
  "Unloading Fee": "bg-orange-100 text-orange-700",
  "Border Fee": "bg-purple-100 text-purple-700",
  "License Fee": "bg-indigo-100 text-indigo-700",
  "Truck Fare": "bg-sky-100 text-sky-700",
  "Crane Fee": "bg-teal-100 text-teal-700",
  "Forklift": "bg-lime-100 text-lime-700",
};
