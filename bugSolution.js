// Solution: Introduce a queue for database operations

let operationQueue = [];
let isProcessing = false;

function addDatabaseOperation(operation) {
  operationQueue.push(operation);
  if (!isProcessing) {
    processQueue();
  }
}

function processQueue() {
  isProcessing = true;
  const operation = operationQueue.shift();
  operation().then(() => {
    if (operationQueue.length > 0) {
      processQueue();
    } else {
      isProcessing = false;
    }
  }).catch(error => {
    console.error("Database operation failed:", error);
    isProcessing = false;
  });
}

// Example usage:

addDatabaseOperation(() => {
  return database.ref('path/to/data').set({ key: 'value1' });
});
addDatabaseOperation(() => {
  return database.ref('path/to/data').update({ key: 'value2' });
});