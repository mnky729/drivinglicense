import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getApplicants = () => {
    return axios.get(`${API_URL}/applicants`).then(response => response.data);
};

export const searchApplicants = (name) => {
    return axios.get(`${API_URL}/applicants/search?name=${name}`).then(response => response.data);
};

export const createApplicant = (applicantData) => {
    return axios.post(`${API_URL}/applicants`, applicantData).then(response => response.data);
};

export const recordPhysicalTest = (testData) => {
    return axios.post(`${API_URL}/physical-test`, testData).then(response => response.data);
};

export const recordTheoreticalTest = (testData) => {
    return axios.post(`${API_URL}/theoretical-test`, testData).then(response => response.data);
};

export const recordPracticalTest = (testData) => {
    return axios.post(`${API_URL}/practical-test`, testData).then(response => response.data);
};

export const getDailyStats = (date) => {
    return axios.get(`${API_URL}/daily-stats?date=${date}`).then(response => response.data);
};