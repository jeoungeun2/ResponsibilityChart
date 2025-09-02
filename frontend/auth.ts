import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "./lib/password-utils";
import * as jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  useSecureCookies: process.env.NODE_ENV === "production",
  trustHost: true,
  
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
          placeholder: "이메일 입력",
        },
        password: {
          label: "비밀번호",
          type: "password",
        },
      },
      async authorize(credentials) {
        // 1. 모든 값들이 정상적으로 들어왔는가?
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        // 2. 임시 더미 유저 데이터 (Prisma 제거로 인한 임시 처리)
        const user = {
          id: 'temp-user-id',
          email: credentials.email as string,
          hashedPassword: '$2b$10$temp.hash.for.testing',
          name: '임시 사용자',
          image: null,
          emailVerified: null
        };

        if (!user) {
          throw new Error("존재하지 않는 이메일입니다.");
        }

        // 3. 비밀번호 일치 여부 확인
        const passwordMatch = comparePassword(
          credentials.password as string,
          user.hashedPassword as string
        );

        if (!passwordMatch) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        // User 타입에 맞는 객체 반환
        return {
          id: user.id,
          email: user.email || '',
          name: user.name || '',
          image: user.image,
          emailVerified: user.emailVerified
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  jwt: {
    encode: async ({ token, secret }) => {
      return jwt.sign(token as jwt.JwtPayload, secret as string);
    },
    decode: async ({ token, secret }) => {
      return jwt.verify(token as string, secret as string) as JWT;
    },
  },
  
  callbacks: {
    async jwt({ token, user, account }) {
      // 최초 로그인 시 user 정보를 token에 저장
      if (account && user) {
        token.accessToken = jwt.sign(
          { 
            userId: user.id, 
            email: user.email,
            name: user.name 
          },
          process.env.AUTH_SECRET || 'fallback-secret',
          { expiresIn: '7d' }
        );
        token.userId = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    
    async session({ session, token }) {
      // token의 정보를 session에 포함
      if (token) {
        // session.user 객체가 없으면 초기화
        if (!session.user) {
          session.user = {
            id: '',
            email: '',
            name: ''
          };
        }
        
        // accessToken을 세션에 추가
        if (token.accessToken) {
          session.accessToken = token.accessToken as string;
        }
        
        // 사용자 정보를 세션에 추가
        if (token.userId) {
          session.user.id = token.userId as string;
        }
        if (token.email) {
          session.user.email = token.email as string;
        }
        if (token.name) {
          session.user.name = token.name as string;
        }
      }
      return session;
    },
  },
  
  pages: {},
});