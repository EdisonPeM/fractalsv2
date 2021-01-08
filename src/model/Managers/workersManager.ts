import Worker from '../main.worker';

// Workers
export const threads = 8;
const workers: Array<Worker> = [...Array(threads)].map(
  () => new (Worker as any)()
);

// Helper
export function sendWorkerMessage(data: any) {
  workers.forEach((worker, id) => {
    data.payload.id = id;
    worker.postMessage(data);
  });
}

export function onWorkerMessage(cb: (payload: any) => any) {
  workers.forEach((worker, id) => {
    worker.onmessage = ({ data }) => cb({ ...data, id });
  });
}
