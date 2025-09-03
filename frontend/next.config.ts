import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 빌드 시 ESLint 오류를 무시
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 빌드 시 TypeScript 오류를 무시
    ignoreBuildErrors: true,
  },
  // GitHub Pages 배포를 위한 정적 빌드 설정
  output: 'export',
  trailingSlash: true,
  // API 라우트 제외 (정적 빌드에서는 API 라우트 사용 불가)
  distDir: 'out',
  // GitHub Pages의 basePath 설정 (리포지토리 이름이 있는 경우)
  // basePath: '/repository-name',
};

export default nextConfig;
