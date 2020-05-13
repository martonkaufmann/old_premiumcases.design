import { NowRequest, NowResponse } from '@now/node';
import dotenv from 'dotenv';
import { bulkInsertNamed, SupportedMutations } from './_seed/fuana';

export default async (request: NowRequest, response: NowResponse) => {
    dotenv.config();

    await Promise.all([
        bulkInsertNamed(SupportedMutations.device, [
            'iPhone 7',
            'iPhone 7 Plus',
            'iPhone 8',
            'iPhone 8 Plus',
            'iPhone X',
            'iPhone XR',
            'iPhone XS',
            'iPhone XS MAX',
            'iPhone 11',
            'iPhone 11 Pro',
            'iPhone 11 Pro Max',
        ]),
        bulkInsertNamed(SupportedMutations.surface, [
            'Glossy',
            'Matte',
            'Base',
        ]),
        bulkInsertNamed(SupportedMutations.case, ['Flexi', 'Snap', 'Tough']),
    ]);

    response.status(200).send({});
};
