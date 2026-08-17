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

    if (content.includes('type UserRoomData =')) {
      console.log(`Skipping ${filePath} - already updated`);
      continue;
    }

    // 1. Add import & UserRoomData type
    const typeDef = `import { useMemo } from 'react';\n\ntype UserRoomData = {\n    id: number;\n    name: string;\n    slug: string;\n    description: string;\n    capacity: string;\n    image: string | null;\n    section2_title: string;\n    section2_description: string;\n    facilities_list: string;\n    secondary_image: string | null;\n    status: string;\n};\n\n`;

    if (!content.includes("import { useMemo } from 'react';")) {
      content = typeDef + content;
    }

    // 2. Change function signature
    content = content.replace(/export default function ([A-Za-z0-9_]+)\(\) \{/, 'export default function $1({ room }: { room?: UserRoomData | null }) {');

    // 3. Add room props extractors inside function
    const extractors = `
    const roomName = room?.name;
    const roomDesc = room?.description;
    const roomCap = room?.capacity;
    const roomImg = room?.image;
    const roomSec2Title = room?.section2_title;
    const roomSec2Desc = room?.section2_description;
    const roomSec2Img = room?.secondary_image || room?.image;

    const parsedFacilities = useMemo(() => {
        if (!room?.facilities_list) return null;
        return room.facilities_list.split(/\\n|,/).map(item => item.trim()).filter(Boolean);
    }, [room?.facilities_list]);
`;

    if (content.includes("const [clockDate, setClockDate] = useState('');")) {
      content = content.replace(/(const \[clockDate, setClockDate\] = useState\(''\);)/, `$1\n${extractors}`);
    } else {
      content = content.replace(/(export default function [A-Za-z0-9_]+\(\{ room \}: \{ room\?: UserRoomData \| null \}\) \{)/, `$1\n${extractors}`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated ${filePath}`);
  }
}

console.log(`Finished! Updated ${updatedCount} files.`);
