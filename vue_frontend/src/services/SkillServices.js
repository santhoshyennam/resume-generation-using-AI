import { apiClient } from "./services";

export default {
  updateSkill(skill) {
    return apiClient.put(`skills/${skill.id}`, skill);
  },
  getAllSkills() {
    return apiClient.get("skills")
  },
  getSkillById(id) {
    return apiClient.get(`skills/${id}`)
  },
  deleteSkill(id) {
    return apiClient.delete(`skills/${id}`)
  },
  addSkill(skill) {
    return apiClient.post("skills", skill);
  },
  updateSkill(skill) {
    return apiClient.put(`skills/${skill.id}`,skill)
  }
};
