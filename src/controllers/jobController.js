import getJobs from '../services/jobService.js'

const getJobsByStatus=async(req,res)=>{

  const jobs=await getJobs();
  console.log(jobs)
  return res.status(200).json({message:"jobs fetched successfully",jobs})
   
}
export default getJobsByStatus;