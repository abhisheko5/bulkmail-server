import getJobs from '../services/jobService.js'

const getJobsByStatus=async(req,res)=>{

  const jobs=await getJobs();

     const counts = {
      waiting: jobs.waiting.length,
      active: jobs.active.length,
      completed: jobs.completed.length,
      failed: jobs.failed.length,
    };
  console.log(jobs)
  return res.status(200).json({message:"jobs fetched successfully",counts})
   
}
export default getJobsByStatus;