import { NowRequest, NowResponse } from '@now/node';

export default async (request: NowRequest, response: NowResponse) => {
    console.log(request.body);

    response.status(200).send({});
};
