
export const updateSnackBar = (text,color="error") => {
    var snackbar = {}
    snackbar.value = true;
    snackbar.color = color;
    snackbar.text = text;
    return snackbar;
}

export const isDateBefore = (date1, date2) => {
    if (!date1 || !date2) return true; // If either date is not set, consider it valid
    return new Date(date1) < new Date(date2);
  };