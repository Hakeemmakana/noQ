

type TableFormValues = {
  tableNumber: string;
  seatingCapacity:number;
  isAvailable?:boolean;
};

type TableValidationErrors = {
  number?: string;
  capacity?: string;
  status?: string;
};
type returnValidation={
    errors:TableValidationErrors;
    isValid:boolean
}
const tableNumberRegex = /^T/;

export function validateTableForm(values: TableFormValues): returnValidation {
  const errors: TableValidationErrors = {};

  if (!values.tableNumber || !values.tableNumber.trim()) {
    errors.number = "Table number is required";
  } else if (!tableNumberRegex.test(values.tableNumber.trim())) {
    errors.number = "Table number must start with T";
  }

  if (typeof values.seatingCapacity !== "number" || Number.isNaN(values.seatingCapacity)) {
    errors.capacity = "Capacity must be a valid number";
  }

  

 return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}