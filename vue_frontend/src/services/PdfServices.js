import { apiClientForBlob } from "./services";


export default {
  getPdf(id) {
    return apiClientForBlob.get(`view-pdf/${id}`, {
      responseType: 'blob', // This is important for handling binary data
    })
  },
  downloadPdf(id) {
    return apiClientForBlob.get(`download-pdf/${id}`, {
      responseType: 'blob', // This is important for handling binary data
    });
  },
};
