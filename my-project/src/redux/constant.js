export const REST_AUTH_BASE_URL = 'http://localhost:8081/auth';
export const REST_API_BASE_URL = 'http://localhost:8081/api';
export const REST_API_V1_URL = 'http://localhost:8081/api/v1';
export const TOKEN = () => {
    const token = localStorage.getItem('token');
    if(token) return token;
    else throw new Error("Không tìm thấy token !!")
};
export const HEADER = {
    headers: { Authorization: `Bearer ${TOKEN}` },
}