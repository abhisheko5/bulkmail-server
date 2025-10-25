import emailQueue from '../queue/emailQueue.js';


const getJobs=async()=>{
const waiting = await emailQueue.getWaiting();   // scheduled but not started
  const active = await emailQueue.getActive();     // currently sending
  const completed = await emailQueue.getCompleted(); // successfully sent
  const failed = await emailQueue.getFailed();     // failed to send

  return { waiting, active, completed, failed };
  
}
export default getJobs;