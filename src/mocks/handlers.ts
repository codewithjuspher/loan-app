import { http, HttpResponse } from 'msw';

interface LoginPayload {
    identifier: string;
    password: string;
}

export const handlers = [
    http.post('/auth/login', async ({ request }) => {
        const body = (await request.json()) as LoginPayload;

        if (body.identifier === 'user' && body.password === 'password') {
            const token = 'mocked_jwt_token';

            return HttpResponse.json(
                {
                    access_token: token,
                    user: {
                        id: 1,
                        name: "Juspher Balangyao",
                        fund: false,
                        wallet: false,
                    },
                },
                { status: 200 }
            );

        }

        return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }),

    http.get('/me', () =>
        HttpResponse.json({
            id: 1,
            name: 'Juspher Balangyao',
            fund: false,
            wallet: false,
        })
    ),
];
