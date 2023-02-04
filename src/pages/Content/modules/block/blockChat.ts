export const initBlockChat = () => {
// Select the node that will be observed for mutations
  const targetNode = document.querySelector("div.right-column[aria-label='右カラム']");

// Options for the observer (which mutations to observe)
  const config = {attributes: true, childList: true, subtree: true} satisfies MutationObserverInit;

// Callback function to execute when mutations are observed
  const callback: MutationCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.');
      } else if (mutation.type === 'attributes') {
        console.log(`The ${mutation.attributeName} attribute was modified.`);
      }
    }
  };

// Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
  if (targetNode) {
    observer.observe(targetNode, config);
  }
}
