const fs = require('fs');
const path = require('path');

const dirs = [
  'resources/js/pages/ruangan_bch',
  'resources/js/pages/ruangan_psms',
  'resources/js/pages/ruangan_tsc',
  'resources/js/pages/ruangan_kwpk'
];

let updatedCount = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('room?.secondary_image || room?.image')) {
      content = content.replace(/room\?\.secondary_image \|\| room\?\.image/g, 'room?.secondary_image');
      content = content.replace(/roomSec2Img = room\?\.secondary_image \|\| room\?\.image/g, 'roomSec2Img = room?.secondary_image');
      fs.writeFileSync(filePath, content, 'utf8');
      updatedCount++;
      console.log(`Updated ${filePath}`);
    }
  }
}

console.log(`Finished! Fixed secondary image fallbacks in ${updatedCount} files.`);
