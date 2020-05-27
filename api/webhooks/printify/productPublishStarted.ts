import { NowRequest, NowResponse } from '@now/node';
import {setProductToPublished} from '../../_helpers/printify'

interface RequestResourceData {
    shop_id: number
    action: string
}

interface RequestResource {
    id: string
    type: string
    data: RequestResourceData
}

interface Request {
    id: string;
    type: string;
    resource: RequestResource
}

export default async (request: NowRequest, response: NowResponse) => {
    console.log(JSON.stringify(request.body));

    const printifyRequest: Request = request.body

    await setProductToPublished(printifyRequest.resource.id)

    response.status(200).send({
        id: printifyRequest.id,
        handle: `https://premiumcases-design.now.sh/${printifyRequest.id}`,
    });
};
