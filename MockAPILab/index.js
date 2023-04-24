import axios from 'axios';



const get = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(console.log).catch(onGlobalError);
};



const getById = (id) => {
    const config = {
        method: 'GET',
        url: endpoint + `/${id}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const add = (payload) => {
    const config = {
        method: 'POST',
        url: endpoint,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const update = (payload, id) => {
    const config = {
        method: 'PATCH',
        url: `${endpoint}/${id}`,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteById = (id) => {
    const config = {
        method: 'DELETE',
        url: `${endpoint}/${id}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};