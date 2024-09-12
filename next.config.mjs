/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      unoptimized: true, // ปิดการเพิ่มประสิทธิภาพรูปภาพเพื่อดูว่าจะแก้ปัญหาการแสดงรูปภาพได้หรือไม่
    },
  };
  
  export default nextConfig;
  