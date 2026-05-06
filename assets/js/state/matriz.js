const KEY = "beluga_disciplines";

export function getDisciplines() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveDisciplines(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function clearDisciplines() {
  localStorage.removeItem(KEY);
}
