"use server";

import { saltAndHashPassword } from "@/lib/password-utils";
import { redirect } from "next/navigation";

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    // 임시 더미 데이터 처리 (Prisma 제거로 인한 임시 처리)
    const existingUser = null; // 항상 새로 가입 가능하도록

    if (existingUser) {
      return { status: "error", message: "이미 존재하는 이메일입니다." };
    }

    // 임시로 성공 응답
    return { status: "ok" };
  } catch (err) {
    console.error(err);
    return { status: "error", message: "회원가입에 실패했습니다." };
  }
}