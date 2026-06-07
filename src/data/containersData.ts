export const containersListData = [
  { id: "CONT-84729", containerNo: "MSKU-3847291", blNo: "BL-98271034", origin: "China", destination: "Islam Qala", status: "In Transit", loadDate: "2023-10-24", purchasePrice: 3200, sellingPrice: 4100, customer: "Ahmad Sarafi" },
  { id: "CONT-92831", containerNo: "CMAU-9283104", blNo: "BL-11029384", origin: "Dubai", destination: "Hairatan", status: "Cleared", loadDate: "2023-10-23", purchasePrice: 4100, sellingPrice: 5200, customer: "Haji Noor" },
  { id: "CONT-11029", containerNo: "TCLU-1102938", blNo: "BL-44820173", origin: "India", destination: "Zaranj", status: "Pending", loadDate: "2023-10-21", purchasePrice: 2800, sellingPrice: 3600, customer: "Karim Logistics" },
  { id: "CONT-44820", containerNo: "MSKU-4482019", blNo: "BL-77192038", origin: "China", destination: "Islam Qala", status: "In Transit", loadDate: "2023-10-20", purchasePrice: 3500, sellingPrice: 4400, customer: "Farid Exchange" },
  { id: "CONT-77192", containerNo: "CMAU-7719203", blNo: "BL-84729102", origin: "Dubai", destination: "Islam Qala", status: "Cleared", loadDate: "2023-10-19", purchasePrice: 5000, sellingPrice: 6100, customer: "Ahmad Sarafi" },
  { id: "CONT-33847", containerNo: "TCLU-3384710", blNo: "BL-33847102", origin: "China", destination: "Rozanak", status: "At Border", loadDate: "2023-10-18", purchasePrice: 2900, sellingPrice: 3700, customer: "Haji Noor" },
  { id: "CONT-55019", containerNo: "MSKU-5501982", blNo: "BL-55019283", origin: "India", destination: "Farah Mahirood", status: "Customs", loadDate: "2023-10-17", purchasePrice: 3100, sellingPrice: 4000, customer: "Karim Logistics" },
  { id: "CONT-99201", containerNo: "CMAU-9920138", blNo: "BL-99201384", origin: "Dubai", destination: "Hairatan", status: "Delivered", loadDate: "2023-10-15", purchasePrice: 4500, sellingPrice: 5500, customer: "Farid Exchange" },
];

export const statusColors: Record<string, string> = {
  Loaded: "bg-yellow-100 text-yellow-700",
  "In Transit": "bg-blue-100 text-blue-700",
  Cleared: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  "At Border": "bg-purple-100 text-purple-700",
  Customs: "bg-orange-100 text-orange-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Unloaded: "bg-slate-100 text-slate-700",
};
