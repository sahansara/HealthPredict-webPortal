import authApi from '../authApi';
/**
 * Fetch total patient count
 */
export async function getPatientCount() {
    try {
       
        const res = await authApi.get('/patients/count');
        return res.data;
    } catch (err) {
        // rethrow so components can handle errors
        throw err;
    }
}

/**
 * Fetch total doctor count
 */
export async function getDoctorCount() {
    try {
        const res = await authApi.get('/doctors/count');
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function getDashboardStats() {
    try {
        const [patients, doctors] = await Promise.all([getPatientCount(), getDoctorCount()]);
        return { patients, doctors };
    } catch (err) {
        throw err;
    }
}

export default authApi;