import { camelCase, kebabCase, lowerCase } from 'lodash';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('case-select')
    .addEventListener('change', ($event) => {
      const value = document.getElementById('case-input').value;
      const targetCase = $event.target.value;
      let output = '';

      switch (targetCase) {
        case 'camelCase': {
          output = camelCase(value);
          break;
        }
        case 'kebabCase': {
          output = kebabCase(value);
          break;
        }
        case 'lowerCase': {
          output = lowerCase(value);
          break;
        }
      }

      document.getElementById('case-output').value = output;
    });
});
