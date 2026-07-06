const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  content = content.replace(/className=\"(.*?)\bp-5\b(.*?)\"/g, 'className=\"$1p-6$2\"');
  content = content.replace(/className=\"(.*?)\bgap-5\b(.*?)\"/g, 'className=\"$1gap-6$2\"');
  // Handle template literals
  content = content.replace(/className=\{\`(.*?)\bp-5\b(.*?)\`\}/g, 'className={\`$1p-6$2\`}');
  content = content.replace(/className=\{\`(.*?)\bgap-5\b(.*?)\`\}/g, 'className={\`$1gap-6$2\`}');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated spacing in ' + file);
  }
});
