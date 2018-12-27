export const colorInfo = type => {
  let colorType = '';
  switch (type) {
    case 'Fontaine':
      return colorType = '#53365e';
    case 'Theory11':
      return colorType = '#b78846';
    case 'Ellusionist':
      return colorType = '#b85b5a';
    default:
      return colorType = 'green';
  }
}