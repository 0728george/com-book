async function fetchBooks() {
  const response = await fetch('https://docs.google.com/spreadsheets/d/SHEET_ID/gviz/tq?tqx=out:json');
  const text = await response.text();
  const data = JSON.parse(text.substr(47).slice(0, -2)); // Parse Google Viz JSON
  return data.table.rows.map(row => ({
    title: row.c[0].v,
    genre: row.c[1].v,
    year: row.c[2].v,
    thumbnail: row.c[3].v,
    url: row.c[4].v,
    format: row.c[5].v,
    likes: row.c[6].v,
    ratings: row.c[7].v
  }));
}
function downloadBook(url, title) {
  if (checkRateLimit()) { // Local check + Firebase call
    firebase.functions().httpsCallable('proxyDownload')({url, title});
  } else {
    alert('Limit reached: 10 downloads per hour.');
  }
}
