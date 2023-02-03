import {printLine} from './modules/print';
import {toggleHalfWindowView} from './modules/styleForHalfWindow';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'x' && evt.ctrlKey) {
    toggleHalfWindowView();
  }
});
