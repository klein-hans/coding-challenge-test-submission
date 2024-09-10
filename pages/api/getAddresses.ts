import type { NextApiRequest, NextApiResponse } from 'next';
import generateMockAddresses from '../../src/utils/generateMockAddresses';

// Helper function to check if a string is strictly numeric
const isStrictlyNumeric = (value: string): boolean => {
    return /^\d+$/.test(value);
};

// Helper function to validate a field and respond with an error if invalid
const validateField = (
    value: string | undefined,
    fieldName: string,
    res: NextApiResponse
): boolean => {
    if (!value) {
        res.status(400).send({
            status: 'error',
            // DO NOT MODIFY MSG - used for grading
            errormessage: `${fieldName} field mandatory!`,
        });
        return false;
    }
    if (!isStrictlyNumeric(value)) {
        res.status(400).send({
            status: 'error',
            errormessage: `${fieldName} must be all digits and non negative!`,
        });
        return false;
    }
    if (fieldName === 'Postcode' && value.length < 4) {
        res.status(400).send({
            status: 'error',
            // DO NOT MODIFY MSG - used for grading
            errormessage: 'Postcode must be at least 4 digits!',
        });
        return false;
    }
    return true;
};

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // or specify a specific origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const {
        query: { postcode, streetnumber },
    } = req;

    // Validate postcode and streetnumber
    const isPostcodeValid = validateField(postcode as string, 'Postcode', res);
    if (!isPostcodeValid) return;

    const isStreetnumberValid = validateField(
        streetnumber as string,
        'Street Number',
        res
    );
    if (!isStreetnumberValid) return;

    const mockAddresses = generateMockAddresses(
        postcode as string,
        streetnumber as string
    );

    if (mockAddresses) {
        const timeout = (ms: number) => {
            return new Promise((resolve) => setTimeout(resolve, ms));
        };

        // Delay the response by 500ms - for loading status check
        await timeout(500);
        return res.status(200).json({
            status: 'ok',
            details: mockAddresses,
        });
    }

    return res.status(404).json({
        status: 'error',
        // DO NOT MODIFY MSG - used for grading
        errormessage: 'No results found!',
    });
}
