"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 gap-6 px-4">
      {/* 로고 영역 */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">A</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">책무구조시스템</h1>
        <p className="text-gray-400 text-lg">로그인하여 시스템을 이용하세요</p>
      </div>

      {/* 로그인 폼 */}
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">로그인</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                이메일
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="example@company.com"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                비밀번호
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              로그인
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              href="/signup" 
              className="text-orange-400 hover:text-orange-300 text-sm transition-colors"
            >
              계정이 없으신가요? 회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
