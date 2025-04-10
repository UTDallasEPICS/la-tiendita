"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { oAuthSignIn } from "../auth/nextjs/actions";

// import loginImg from '../assets/login.jpg'
const loginImg =
  "https://img1.wsimg.com/isteam/ip/74ce8bcb-737b-4015-b1cb-8fe1fcf209ad/FB_IMG_1695473900394.jpg/:/cr=t:16.67%25,l:0%25,w:100%25,h:66.67%25/rs=w:960,h:480,cg:true";

export default async function login({
  searchParams,
}: {
  searchParams: Promise<{ oauthError?: string }>;
}) {
  const { oauthError } = await searchParams;
  return (
    <div className="relative w-full h-screen bg-zinc-900/90 ">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginImg}
        alt="/"
      />

      <div className="flex justify-center items-center h-full">
        <form className="max-w-[400px] text-text w-full mx-auto bg-white p-8">
          <h1 className="text-5xl font-bold text-center py-4">La Tiendita</h1>
          <h2 className="text-4xl font-bold text-center py-4 ">Log In</h2>
          {/* <div className="flex justify-between py-8">
            <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
              <AiFillFacebook className="mr-2" /> Facebook
            </p>
            <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
              <FcGoogle className="mr-2" /> Google
            </p>
          </div> */}

          <p className="mb-4 border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center cursor-pointer">
            <FcGoogle className="mr-2" /> Sign In With Google
          </p>

          <p
            className="mb-4 border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center cursor-pointer"
            onClick={async () => await oAuthSignIn("discord")}
          >
            <FaDiscord className="mr-2" /> Sign In With Discord
          </p>

          <p className="mb-4 border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center cursor-pointer">
            <FaMicrosoft className="mr-2" /> Sign In With Microsoft
          </p>

          {oauthError && (
            <p className="mb-4 border shadow-lg hover:shadow-xl font-bold px-6 py-2 relative flex items-center text-red-600">
              {oauthError}
            </p>
          )}

          <p className="flex justify-center items-center mt-2">
            <input className="mr-2 z-50" type="checkbox" />
            Remember Me
          </p>
        </form>
      </div>
    </div>
  );
}
