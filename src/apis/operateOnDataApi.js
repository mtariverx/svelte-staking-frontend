import axios from 'axios';
export const getAllData = async () => {
    try {
       // const response = await axios.get("http://167.71.191.148/api/tutorials/getAllData");
        const response = await axios.get("http://localhost:8080/api/tutorials/getAllData");
        
        return response.data;
    } catch (error) {
        console.log('errrr', error);
    }
}

export const getDataWithId = async (id) => {
    //const result = await axios.post('/api/tutorials/getInformationWithId/'`${id}`);
    try {
       // const response = await axios.get(`/api/tutorials/getInformationWithId/${id}`)
         const response = await axios.get(`/api/tutorials/getInformationWithId/${id}`)
            return response.data;
    } catch (error) {
        console.log('errrr', error);
    }
};


export const postTutorial = async (payload) => {
    try {
       // const response = await axios.post('http://167.71.191.148/api/tutorials/',payload);
         const response = await axios.post('http://localhost:8080/api/tutorials/',payload);
        return response.data;
    } catch (error) {
        console.log('errrr', error);
    }
};

export const postVoter = async (payload) => {
    try {
        //const response = await axios.post('http://167.71.191.148/api/tutorials/setVoter/',payload);
         const response = await axios.post('http://localhost:8080/api/tutorials/setVoter/',payload);
        return response.data;
    } catch (error) {
        console.log('errrr', error);
    }
}

export const updateVoter =async (id, payload) =>{
    try {
       // const response = await axios.put(`http://167.71.191.148/api/tutorials/voter_update/${id}`,payload);
         const response = await axios.put(`http://localhost:8080/api/tutorials/voter_update/${id}`,payload);
        return response.data;
    } catch (error) {
        console.log('errrr', error);
    }
}

export const updateTutorial =async (id, payload) =>{
    try {
        const response = await axios.put(`http://localhost:8080/api/tutorials/tutorial_update/${id}`,payload);
        //const response = await axios.put(`http://167.71.191.148/api/tutorials/tutorial_update/${id}`,payload);
        return response.data;
    } catch (error) {
        console.log('errrr', error);
    }
}