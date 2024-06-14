import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

const API_URL = process.env.API_URL as string;
const SECRET = process.env.NEXTAUTH_SECRET as string;

const handler = NextAuth({
  secret: SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const credentialDetails = {
            email: credentials?.email,
            password: credentials?.password,
          };

          const res = await axios.post(
            `${API_URL}/auth/login`,
            credentialDetails
          );

          if (res.status === 200) {
            const user = res.data.user;
            // Guardar el token en el localStorage
            if (typeof window !== "undefined") {
              localStorage.setItem("token", user.token);
            }

            return user;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
            throw new Error(JSON.stringify(error.response?.data));
          }
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    // Opcionalmente puedes definir otras páginas personalizadas aquí
  },
  callbacks: {
    async jwt(params) {
      const { token, user } = params;

      if (user) {
        console.log("jwt", token, user);
        token.accessToken = (user as any).token;
        (token as any).id = (user as any).id;
        (token as any).name = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session as any).user.id = (token as any).id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
