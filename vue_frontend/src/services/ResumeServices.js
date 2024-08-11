import { apiClient } from "./services";

export default {
  updateResume(resume) {
    return apiClient.put(`resumes/${resume.id}`, resume);
  },
  getAllResumes() {
    return apiClient.get("resumes")
  },
  getResumeById(id) {
    return apiClient.get(`resumes/${id}`)
  },
  deleteResume(id) {
    return apiClient.delete(`resumes/${id}`)
  },
  addResume(resume) {
    return apiClient.post("resumes", resume);
  },
  updateResume(resume) {
    return apiClient.put(`resumes/${resume.id}`,resume)
  },
  getResumeByUserId(id) {
    return apiClient.get(`resumes/user/${id}`)

  },
  addComment(req) {
    return apiClient.post("resumeComments",req)
  },
  getResumeComments(id) {
    return apiClient.get(`resumeComments/resume/${id}`)
  }
};
