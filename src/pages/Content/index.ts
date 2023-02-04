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

// TODO add block button to stamp detail popup
// TODO pressing block button adds stamp to the NG list
// TODO search the way to crawl chats
// TODO delete comments depends on NG list
// TODO create block list in Popup
