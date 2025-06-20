import { HttpResponse, http } from "msw";
import { z } from "zod";
import { createLoginSchema } from "../features/auth/login/schema/loginSchema";
import { mockUsers } from "./data/mockUsers";
import { setCurrentUser, getCurrentUser, clearCurrentUser } from "./session";
import { mockTFunction } from "./utils/mockTFunction";

const schema = createLoginSchema(mockTFunction);

export const handlers = [
    http.post("/auth/login", async ({ request }) => {
        let data: z.infer<typeof schema>;

        try {
            const body = await request.json();
            data = schema.parse(body);
        } catch (error) {
            return HttpResponse.json(
                { message: "Invalid payload", error },
                { status: 400 }
            );
        }

        const { identifier, password } = data;

        const user = mockUsers.find(
            (u) => u.identifier === identifier && u.password === password
        );

        if (!user) {
            return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        setCurrentUser(user.id);

        return HttpResponse.json(
            {
                access_token: "mocked_token",
                user: {
                    id: user.id,
                    name: user.name,
                    fund: user.fund,
                    wallet: user.wallet,
                },
            },
            { status: 200 }
        );
    }),

    http.get("/me", () => {
        const currentUserId = getCurrentUser();

        if (!currentUserId) {
            return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = mockUsers.find((u) => u.id === currentUserId);

        if (!user) {
            return HttpResponse.json({ message: "User not found" }, { status: 404 });
        }

        return HttpResponse.json({
            id: user.id,
            name: user.name,
            fund: user.fund,
            wallet: user.wallet,
        });
    }),

    http.post("/auth/logout", () => {
        clearCurrentUser();
        return HttpResponse.json({ success: true });
    }),

];
