export function getStatColor(value) {
    if (value > 100) return "bg-success";
    if (value > 60) return "bg-warning";
    return "bg-danger";
  }
  