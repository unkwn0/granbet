// ─── DANE DO PRZELEWU — jedno źródło dla wyświetlania i kopiowania ────
// Numer wpisz bez spacji (26 cyfr). Podział na grupy robi formatujRachunek.
export const daneDoPrzelewu = {
  odbiorca: 'HENRYK SOBCZUK Zakład Kamieniarski GRANBET',
  adres: 'ul. Hrubieszowska 33, Kryłów, 22-530 Mircze',
  bank: 'VeloBank',
  rachunek: '13156011956407153420040001',
};

// Zapis polskiego NRB: 2 cyfry kontrolne, potem grupy po 4.
export const formatujRachunek = (nr: string) =>
  [nr.slice(0, 2), ...(nr.slice(2).match(/.{1,4}/g) ?? [])].join(' ');
