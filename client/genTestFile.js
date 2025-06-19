fs = require('fs');

const rows = 10000; // Number of rows you want
const header = 'id,name,age,city,score\n';
let content = header;

for (let i = 1; i <= rows; i++) {
    const name = `User${i}`;
    const age = Math.floor(Math.random() * 50) + 18;
    const cities = ['New York', 'Chicago', 'Los Angeles', 'Seattle', 'Miami'];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const score = Math.floor(Math.random() * 100);
    content += `${i},${name},${age},${city},${score}\n`;
}

fs.writeFileSync('large_test.csv', content);
