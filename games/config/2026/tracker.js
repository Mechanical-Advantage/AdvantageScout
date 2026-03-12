import { writable } from 'svelte/store';

export const eventLog = writable([]);

export function track(node, componentName) {
  const handleEvent = (event) => {
    const entry = {
      component: componentName,
      event: event.type,
      timestamp: performance.now().toFixed(2),
      detail: event.target.innerText || event.target.value || 'N/A'
    };

    eventLog.update(logs => [...logs, entry]);
    console.log(`[Logged] ${componentName}: ${event.type}`);
  };

  node.addEventListener('click', handleEvent);
  node.addEventListener('input', handleEvent);

  return {
    destroy() {
      node.removeEventListener('click', handleEvent);
      node.removeEventListener('input', handleEvent);
    }
  };
}