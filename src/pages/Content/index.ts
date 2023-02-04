import {toggleHalfWindowView} from './modules/styleForHalfWindow';
import {initBlockStamp} from "./modules/block/blockStamp";

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'x' && evt.ctrlKey) {
    toggleHalfWindowView();
  }
});

initBlockStamp();
