import axios, { AxiosResponse } from 'axios';

const makeRequest = async (query: string): Promise<AxiosResponse> => {
    return axios.post(
        'https://graphql.fauna.com/graphql',
        JSON.stringify({ query }),
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.FAUNADB_TOKEN}`,
            },
        },
    );
};

export { makeRequest };
