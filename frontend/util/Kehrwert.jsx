
class Kehrwert {
  
  kehrwert(nenner) {
    if (nenner === 0) {   // === -> 1. Typ-Prüfung -> 2. Inhaltsprüfung
        throw new Error("Div/0 ist nicht erlaubt!!!");
    }
    return 1.0 / nenner;
}

}

export default Kehrwert;